<template>
  <div class="main">
    <a-form-model
      ref="ruleForm"
      :rules="rules"
      :model="form"
    >
      <a-form-model-item label="账号" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" prop="account">
        <a-input
          size="large"
          type="text"
          placeholder="请输入账号"
          v-model="form.account"
        >
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>

      <a-form-model-item label="密码" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" prop="password">
        <a-input-password
          size="large"
          placeholder="请输入密码"
          v-model="form.password"
        >
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-model-item>

      <a-form-model-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
          @click="handleLogin"
        >登录</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  components: {
  },
  data () {
    return {
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }],
      },
      form: { account: '', password: '' },
      state: {
        time: 60,
        loginBtn: false,
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    ...mapActions(['Login', 'Logout']),

    handleLogin () {

      // this.$router.push({ path: '/' })

      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.requestLogin()
        } 
      })
    },

    requestLogin () {
      var params = this.form

      this.state.loginBtn = false
      this.Login(params)
        .then((res) => {
          this.$router.push({ path: '/' })
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            this.$notification.success({
              message: '欢迎',
              description: `${timeFix()}，欢迎回来`
            })
          }, 1000)
          this.isLoginError = false
        })
        .catch(err => {

        })
        .finally(() => {
          this.state.loginBtn = false
        })
    }

  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
    margin-left: 8.5vw;
  }
  .table {
    margin-left: 5vw;
  }
  .getCaptcha {
    display: block;
    width: 100%;
    height: 20px;
  }

  .forge-password {
    margin-left: 4px;
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 30px;
    width: 80%;
    margin-left: 4.5vw;

  }

  .user-login-other {
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    // .register {
    //   float: right;
    // }
  }
}
</style>
