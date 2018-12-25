<template>
  <div class="login">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" status-icon>
      <img src="~@/assets/images/22.jpg" alt="">
  <el-form-item label="用户名"  prop="username">
    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change' }
        ]

      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then((res) => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 1000
            })
            localStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}

</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #2D434C;
  .el-form{
    width:400px;
    background-color: #fff;
    margin:200px auto;
    border-radius: 20px;
    padding:75px 25px 15px;
    position: relative;

   img {
     position: absolute;
     left:50%;
     border:10px solid #fff;
     transform:translateX(-50%);
     top:-70px;;
     width:120px;
     height:120px;
     border-radius:50%;

    }

    .el-button:nth-child(2){
      margin-left:100px;
    }
  }
    }

</style>
