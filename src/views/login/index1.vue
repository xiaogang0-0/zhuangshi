// 后台登录
<template>
  <div class="login-container logginWrapCss">
    <!-- 公用表头 -->
    <loginHeader />
    <div class="content">
      <div class="wrap">
        <div class="wrap-bg" />
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

          <div class="title-container">
            <h3 class="title">登录系统</h3>
          </div>

          <p class="pd60">用户名</p>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model.trim="loginForm.username"
              placeholder="请输入用户名"
              name="username"
              type="text"
              tabindex="1"
            />
          </el-form-item>

          <p class="pd60">登录密码</p>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <!-- <p class="pd60">验证码</p>
            <el-form-item prop="verifyCode" class="verificationCode">
             <el-input
                ref="verificationCode"
                v-model="loginForm.verifyCode"
                placeholder="请输入验证码"
                name="verificationCode"
                type="text"
              />
              <span class="cblue cursor">获取验证码</span>
            </el-form-item> -->

          <p class="pd60"> <el-button type="text" @click="handleForgetPassword">忘记密码</el-button></p>
          <el-button
            :loading="loading"
            type="primary"
            style="
                display:block;
                margin:10px 60px 50px;
                width:72%;background:#2E74D1;
                border-color:#2E74D1;"
            @click.native.prevent="handleLogin"
          >登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import componentsRouter from '@/router/modules/components.js'
// import constantRoutes from '@/router/index.js'
import routerIndex from '@/router/index.js'
import { setToken } from '@/utils/auth'
import * as Api from '@/api/login'
import LoginHeader from '@/components/loginHeader'
// 权限目录
import menuList from '@/api/menuList.json'

export default {
  name: 'Login',
  components: {
    LoginHeader
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/
      if (value.length < 8 || !reg.test(value)) {
        callback(new Error('使用大小写英文字母与数字组合，不低于8位数'))
      } else {
        callback()
      }
    }
    const validatePhoneNumber = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 1是系统用户, 0是企业用户
      userType: '1',
      loginForm: {
        // admin
        username: '',
        customerName: '',
        // K1111111
        password: ''
        // verifyCode:''
      },

      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validatePhoneNumber }],
        // customerName: [{ required: true, trigger: 'change', message: '请选择登录的企业'}],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        // verifyCode: [{ required: true, trigger: 'blur', message: '请输入验证码'}],
      },
      loading: false,
      passwordType: 'password'
    }
  },
  watch: {},
  created() {
  },
  computed: {
    ...mapGetters([
      'permission_routes'
    ])
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const param = Object.assign({}, this.loginForm)
          Api.loginInit(param).then(res => {
            this.loading = false
            if (res.code == 200) {
              // 本地存储token
              setToken(res.data.accessToken)
              localStorage.removeItem('Siw_userInfo')

              localStorage.setItem('Siw_userInfo', JSON.stringify(res.data))
              // ++++++++模拟后端权限+++++++
              if (res.data.userType == 1) {
                // 后台登录
                localStorage.setItem('Siw-menuList', JSON.stringify(menuList.home))
              } else {
                // 客户端
                localStorage.setItem('Siw-menuList', JSON.stringify(menuList.login))
              }
              // this.$router.push({path: '/'})
              window.location.reload()
              // ++++++++模拟后端权限over+++++++
            }
          }).catch(error => {
            localStorage.removeItem('Siw_userInfo')
            localStorage.removeItem('Siw-menuList')
            this.loading = false
          })
        } else {
          // console.log('请输入账号密码')
          return false
        }
      })
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    // 忘记密码
    handleForgetPassword() {
      this.$router.push({
        name: 'forgetPassword',
        query: { userType: this.userType }
      })
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    // height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: #000;
      // height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .customerName {
      .el-select,
      .el-input{
        width: 100%;
      }
    }

  .el-form-item {
    border: 1px solid #ccc;
    background: #fff;
    margin: 0 60px;
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>

$bg:#2E74D1;
$dark_gray:#889aa4;
$light_gray:#eee;
.pd60 {padding: 0 60px; color: #669999; font-size:16px;line-height: 32px;padding-top:10px;margin:0;}
.pdt0 {padding-top: 0;}
.cblue{ color: #1890ff;}
.cursor{cursor:pointer;}
.verificationCode .el-input{
  width: 190px;
}
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;

  .login-head {
    margin: 0 auto;
    width: 100%;
    background: #fff;
    .head-wrap {
      width: 1200px;
      height: 135px;
      margin: 0 auto;
      padding: 37px 0 0 11px;
      img {
        width:203px;
        height:68px;
      }
    }
  }
  .wrap {
    min-width: 1200px;
    max-width: 1350px;
    margin: 0 auto;
    overflow: hidden;
    padding: 11vh 0 0 0;
}
  .content {

    margin: 0 auto;
    height: 100vh;
    background-color: #2E74D1;
    overflow: hidden;

  }

  .wrap-bg {
    width: 742px;
    height: 508px;
    float: left;
    margin-top: -10px;
    background-image: url('../../assets/login/login-bg1.png');
    background-size: 100% 100%;
  }

  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    float: right;
    margin-right:45px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 8px  rgba(0,0,0,0.3);
  }
  .svg-container[data-v-37dfd6fc]{display: none;}

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    .title {
       height: 64px;
      line-height: 64px;
      margin: 0;
      font-size: 24px;
      color: #2E74D1;
      background: #fff;
      font-weight: 700;
      box-shadow: 0 -8px 8px rgba(204,204,204,0.4) inset;
      overflow: hidden;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
