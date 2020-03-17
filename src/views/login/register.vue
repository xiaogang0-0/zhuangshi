// 企业注册
<template>
  <div class="login-container">
    <!-- 公用表头 -->
    <loginHeader/>
    <div class="content">
        <div class="wrap">
          <div class="wrap-bg"></div>
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

            <div class="title-container">
              <h3 class="title">仅限住宅装饰企业注册</h3>
            </div>
            <p class="pd60">企业全称</p>
            <el-form-item prop="customerName">
              <el-input
                ref="customerName"
                v-model.trim="loginForm.customerName"
                type="text"
                placeholder="输入您公司全称"
                name="customerName"
                tabindex="2"
              />
            </el-form-item>

            <p class="pd60">设置密码</p>
            <el-form-item prop="password1">
              <el-input
                :key="passwordType"
                ref="password1"
                v-model.trim="loginForm.password1"
                :type="passwordType"
                placeholder="输入新密码"
                name="password1"
                tabindex="2"
                autocomplete="on"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <p class="pd60">确认密码</p>
            <el-form-item prop="password">
              <el-input
                :key="passwordType"
                ref="password"
                v-model.trim="loginForm.password"
                :type="passwordType"
                placeholder="输入密码"
                name="password"
                tabindex="2"
                autocomplete="on"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
            
            <p class="pd60">手机号</p>
            <el-form-item prop="mobile">
               <el-input
                ref="mobile"
                v-model.number="loginForm.mobile"
                placeholder="请输入手机号"
                name="mobile"
                type="text"
                tabindex="1"
              />
            </el-form-item>

            <p class="pd60">验证码</p>
            <el-form-item prop="verifyCode" class="verificationCode">
             <el-input
                ref="verifyCode"
                v-model.trim="loginForm.verifyCode"
                placeholder="请输入验证码"
                name="verifyCode"
                type="text"
              />
              
              <span 
                v-show="!isActive"
                class="cblue cursor"
                @click="handleTime">获取验证码</span>
              <span 
                v-show="isActive"
                class="cblue">{{num ? num + 's': ''}}</span>
            </el-form-item>

            <el-button :loading="loading" type="primary" 
              style="
                display:block;
                margin:50px 60px 50px;
                width:72%;background:#2E74D1; 
                border-color:#2E74D1;" 
                @click.native.prevent="handleLogin">注 册</el-button>

           
          </el-form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import componentsRouter from '@/router/modules/components.js'
import routerIndex from '@/router/index.js'
import { setToken } from '@/utils/auth'
import * as Api from '@/api/login'
import { Settings } from '../../layout/components'
import LoginHeader from '@/components/loginHeader'



export default {
  name: 'register',
  components: {
    LoginHeader,
  },
  data() {

    const validateUsername = (rule, value, callback) => {
      if (!value.length ){
        callback(new Error('企业全称不能为空'))
      } else {
        callback()
      }
    }

    const validatePhoneNumber = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        callback(new Error('手机号码有误，请重填'))
      } else {
        callback()
      }
    }

    const validatePassword1 = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
      if (value.length < 8 || !reg.test(value) ){
        callback(new Error('使用大小写英文字母与数字组合，不低于8位数'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/;
      if (this.loginForm.password1 != this.loginForm.password ){
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    
    return {
      // 是否进行了点击操作
      isActive:false,
      num:59,
      loginForm: {
        // 注册时(register), 登录时(login), 找回密码时(update-password), 修改资料时(update-customer)
        sendType:'register',
        // 企业id
        customerId:'',
        // 企业名称
        customerName:'',
        // 第一次输入的密码
        password1:'',
        // 密码, 已清空
        password:'',
        // 手机号
        mobile:'',
        // 验证码
        verifyCode:'',
      },
      loginRules: {
        customerName: [{ required: true, trigger: 'blur', validator: validateUsername}],
        password1: [{ required: true, trigger: 'blur', validator: validatePassword1 }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword}],
        mobile: [{ required: true, trigger: 'blur', validator: validatePhoneNumber}],
        // verifyCode: [{ required: true, trigger: 'blur', message: '验证码不能为空'}]
      },
      loading: false,
      passwordType: 'password',
    }
  },
  watch: {},
  created() {
  },
  computed: {
    ...mapGetters([
      'permission_routes',
    ]),
  },
  mounted() {
    if (this.loginForm.customerName == '') {
      this.$refs.customerName.focus()
    } else if (this.loginForm.password1 === '') {
      this.$refs.password1.focus()
    }else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }else if (this.loginForm.mobile === '') {
      this.$refs.mobile.focus()
    }else if (this.loginForm.verifyCode === '') {
      this.$refs.verifyCode.focus()
    }
  },
  methods: {
    // 倒计时
    handleTime(){
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.isActive = true;
          // 获取验证码
          this.handeleGetVerifyCode();
          let timer = setInterval(()=>{
            if(this.num < 1){
              this.isActive = false;
              this.num =59
              clearInterval(timer)
            }
            this.num--
          },1000)
        } else {
          // console.log('请输入账号密码')
          return false
        }
      })
    },

    // 获取验证码
    handeleGetVerifyCode(){
      let param = {
        sendType:this.loginForm.sendType,
        mobile:this.loginForm.mobile
      };
      // 平台用户带参数
      let param1 ={customerName:''}
      // if(this.userType == 1){
      //   param1.customerName = this.loginForm.customerName
      // }
      Api.getSendVerifyCode(param,param1).then(res => {
        if(res.code == 200) {
          this.$message({
            message: '验证码已发送至'+ this.loginForm.mobile +'上请注意查收',
            type: 'success'
          });
        }
      }).catch( error => {
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
    // 注 册
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if(!this.loginForm.verifyCode){
            return this.$message({
              message: '验证码不能为空!',
              type: 'warning'
            });
          }
          this.loading = true
          var param = Object.assign({},this.loginForm) 
          delete param.password1
          delete param.sendType
          // delete param.verifyCode
          
          Api.registerSub(param).then(res => {
            this.loading = false;
            if(res.code == 200) {
              sessionStorage.setItem('siw_registerInfor',JSON.stringify(res.data))
              // 跳转完善页面
              this.$router.push({
                name:'perfectInformation',
              })
            }

          }).catch( error => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="scss">

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
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      // padding: 12px 5px 12px 15px;
      color: #000;
      
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
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
.cursor{cursor:pointer; display: inline-block;}

.verificationCode .el-input{
  width: 190px;
}
.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-head {
    // width: 1200px;
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
    // width: 1200px;
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
    // background-image: linear-gradient(to top, #2E74D1, #2E74D1);
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
  // .login-form {
  //   position: relative;
  //   width: 428px;
  //   max-width: 100%;
  //   float: right;
  //   margin-right:4px;
  //   overflow: hidden;
  //   background: #fff;
  //   box-shadow: 0 0 8px  rgba(0,0,0,0.3);
  // }
  // .tips {
  //   font-size: 14px;
  //   color: #fff;
  //   margin-bottom: 10px;
  //   span {
  //     &:first-of-type {
  //       margin-right: 16px;
  //     }
  //   }
  // }

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
      // font-size: 26px;
      // color: $light_gray;
      // margin: 0px auto 40px auto;
      // text-align: center;
      // font-weight: bold;

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
