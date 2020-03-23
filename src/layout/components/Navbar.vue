<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <!-- <h2 class="fl title">上海住宅装饰一网通 &nbsp;&nbsp;
      <span v-if="userType == 0">企业管理平台</span>
      <span v-else>后台管理</span>
    </h2> -->
    <div class="right-menu">

      <span class="userName el-breadcrumb app-breadcrumb breadcrumb-container">{{ userName ? userName : '' }}</span>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="usImg" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item >
            <span style="display:block;" @click="handleOpen">修改密码</span>
          </el-dropdown-item> -->

          <!-- <el-dropdown-item divided> -->
          <el-dropdown-item style="padding: 0px;">
            <span style="display:block; padding: 0 17px;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="centerDialogVisible"
      width="430px"
      center
    >
      <div class="password">
        <span>旧 &nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span>
        <el-input v-model="oldPassword" minlength="6" placeholder="请输入旧密码" @blur="changeInput" />
      </div>
      <div class="password">
        <span>新 &nbsp;&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码：</span>
        <el-input v-model="password" minlength="6" placeholder="请输入新密码" show-password @blur="changeInput" />
      </div>
      <div class="password">
        <span>确认新密码：</span>
        <el-input v-model="confirmPassword" minlength="6" placeholder="请再次输入新密码" show-password @blur="changeInput" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
// import { changePassword,landingExit } from '@/api/login'
import * as Api from '@/api/login'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import usImg from '@/assets/userImg.png'
import { removeToken } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    // ErrorLog,
    // Screenfull,
    // SizeSelect,
    Search
  },
  data() {
    return {
      centerDialogVisible: false,
      usImg: usImg,
      oldPassword: '',
      password: '',
      confirmPassword: '',
      userName: '',
      userType: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    const data = localStorage.getItem('Siw_userInfo')
    if (data) {
      // console.log(JSON.parse(data),'22222')
      this.userType = JSON.parse(data).userType
      if (this.userType == 1) {
        this.userName = JSON.parse(data).realName
      } else {
        this.userName = JSON.parse(data).customerName
      }
    }
    // this.userName = JSON.parse(localStorage.getItem('Siw_userInfo')) ? JSON.parse(localStorage.getItem('Siw_userInfo')).username : '';
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    // async logout() {
    //   await this.$store.dispatch('user/logout')
    //   this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    // }

    // 退出登陆
    logout() {
      removeToken()
      localStorage.removeItem('Siw_userInfo')
      localStorage.removeItem('Siw-menuList')

      if (this.userType == 0) {
        setTimeout(() => {
          this.$router.push({ path: '/login' })
        }, 200)
        // this.$router.push({
        //   name:'login'
        // })
      }

      if (this.userType == 1) {
        setTimeout(() => {
          this.$router.push({ path: '/home' })
        }, 200)
        // this.$router.push({
        //   name:'home'
        // })
        // this.$router.push({path: '/home' })
      }

      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      return

      // sessionStorage.removeItem('Siw-menuList')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)

      Api.landingExit('').then(res => {
        // console.log(res)
        if (res.code == 200) {
        //   console.log(res.data.msg);
          removeToken()
          localStorage.removeItem('Siw_userInfo')
          localStorage.removeItem('Siw-menuList')
          // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
          this.$router.push({ path: '/login' })
        }
      }).catch(err => {
        // console.log(err);
        removeToken()
        localStorage.removeItem('Siw_userInfo')
        localStorage.removeItem('Siw-menuList')
        // sessionStorage.removeItem('Siw-menuList')
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$router.push({ path: '/login' })
      })
    },

    changeInput() {
      // console.log(this.oldPassword.length);
    },
    // 打开弹窗
    handleOpen() {
      this.centerDialogVisible = true
      // console.log(this.centerDialogVisible)
    },
    // 关闭弹窗
    close() {
      this.centerDialogVisible = false
    },

    submit() {
      if (this.oldPassword.length < 6 || this.password.length < 6 || this.confirmPassword.length < 6) {
        this.centerDialogVisible = true
        this.$message({
          message: '密码大于六位',
          type: 'warning'
        })
      } else {
        // console.log('调接口');
        var param = {
          'oldPassword': this.oldPassword,
          'password': this.password
        }
        if (this.password == this.confirmPassword) {
          Api.changePassword(param).then(res => {
            if (res.code == 200) {
              this.$message({
                message: '密码修改成功',
                type: 'success'
              })
              // console.log(456);
            } else {
              // console.log(123);

              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
            // console.log(res);
          }).catch(err => {
            // console.log(err);

          })
          this.centerDialogVisible = false
        } else {
          this.$message({
            message: '密码不正确  请检查',
            type: 'warning'
          })
        }
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 50px;
  width: 50vw;
  font-weight: 800;
  color: #409eff;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
}
.userName{
  // margin-right: 30px;
  line-height: 50px;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .el-input{
    width: 70%;
    float: left;
    margin-left: 20px;
  }
  .password{
    display: flex;
    margin-bottom: 20px;
    span{
      display: inline-block;
      line-height: 40px;
    }
  }
  .dialog-footer {
    .el-button {margin: 0 15px}
  }
}
</style>
