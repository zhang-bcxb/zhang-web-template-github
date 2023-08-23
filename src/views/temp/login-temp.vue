<template>
  <div class="container">
    <div class="container__left">
      <div class="image__content">
        <button class="btn cancel" @click.stop="toRegister">Go Register</button>
      </div>
    </div>
    <div class="container__right">
      <div class="content">
        <span></span>
        <div class="header">
          <h1>登录</h1>
        </div>

        <span>用户名</span>
        <div>
          <input type="text" v-model="user.username" placeholder="Username" autocomplete="off"/>
        </div>
        <span>密码</span>
        <div>
          <input type="password" v-model="user.password" placeholder="Password" autocomplete="off"/>
        </div>
        <span>角色</span>
        <div class="gender" @click="changeRole">
          <template v-if="user.roleName == 'admin'">
            <span>OK</span>
            <span>admin</span>
            <span></span>
            <span>user</span>
          </template>
          <template v-if="user.roleName == 'user'">
            <span></span>
            <span>admin</span>
            <span>OK</span>
            <span>user</span>
          </template>
        </div>

        <span></span>
        <div class="btns">
          <button class="btn cancel" @click.stop="cancel">取消</button>
          <button class="btn confirm" @click.stop="confirm">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/user.js'
import {setToken} from '@/utils/setToken.js'

export default {
  data() {
    return {
      user: {
        username: "admin",
        password: "admin",
        roleName: "admin"
      }
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/register')
    },
    changeRole() {
      this.user.roleName = this.user.roleName == "admin" ? "user" : "admin"
    },
    // 清空数据
    cancel() {
      this.user = {
        username: "",
        password: "",
      }
    },
    confirm() {
      // console.log(this.user)
      // 发起请求
      login(this.user).then(res => {
        console.log(res)
        let resData = res.data.data
        console.log(resData)
        if (res.data.code === "200") {
          setToken('username', resData.username)
          setToken('token', resData.token)
          setToken('rolename', resData.rolename)
          this.$message({message: res.data.msg, type: 'success'})
          if (resData.rolename === "admin") {
            this.$router.push('/admin')
          } else {
            this.$router.push('/user')
          }
        } else {
          this.$message({message: res.data.msg, type: 'error'})
        }
      })
    }
  }
};

</script>

<style lang="scss" scoped>

.container {
  font-family: "Roboto", sans-serif;
  display: flex;
  min-height: 100vh;
}

.container__left {
  flex: 1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.image__content {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #f3f4f6;
}

.image__subtitle {
  text-align: center;
}

.container__right {
  flex: 1.25;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 100%;
  max-width: 550px;
  padding: 1rem;
  display: grid;
  grid-template-columns: 150px auto;
  gap: 1rem;
  color: #322b57;
}

.header {
  margin-bottom: 1rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 900;
    color: #0da1a1;
  }

  p {
    letter-spacing: 2px;
  }
}

.content {
  span {
    display: grid;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
  }

  .gender {
    display: flex;
    gap: 1rem;
  }

  .gender span:nth-child(odd) {
    height: 40px;
    width: 40px;
    display: grid;
    place-content: center;
    border-radius: 100%;
    color: #f3f4f6;
    font-size: 1.25rem;
    font-weight: 400;
    cursor: pointer;
  }

  .gender span:nth-child(1) {
    background-color: #0da1a1;
  }

  .gender span:nth-child(3) {
    background-color: #322b57;
  }

}

input {
  width: 100%;
  padding: 1rem;
  background-color: #f3f3f3;
  outline: none;
  border: none;
  border-radius: 5px;
}

.btns {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #f3f4f6;
  cursor: pointer;
}

.cancel {
  background-color: #322b57;
}

.confirm {
  background-color: #0da1a1;
}
</style>
