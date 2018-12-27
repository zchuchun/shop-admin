<template>
<div class="home">
  <el-container>
  <el-header>
    <div class="left"></div>
    <div class="middle">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="right">
      <span>欢迎光临</span>
      <a href="javascript:;" @click="loginout">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
    <el-menu
      default-active="/home"
      class="el-menu-vertical-demo"
      background-color="#545C64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
          <el-menu-item index="/users"> <i class="el-icon-menu"></i><span>用户列表</span></el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
          <el-menu-item index="2-1"> <i class="el-icon-menu"></i><span>角色列表</span></el-menu-item>
          <el-menu-item index="2-2"> <i class="el-icon-menu"></i><span>权限列表</span></el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</div>
</template>

<script>
export default {
  methods: {
    loginout() {
      this.$confirm('您确定要退出本系统吗？', '温馨提示', {
        type: 'warning'
      })
        .then(res => {
          localStorage.removeItem('token')
          this.$router.push('/login')
          this.$message.success('退出系统成功')
        })
        .catch(() => {
          this.$message.info('取消退出')
        })
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-header {
      background-color: #b3c1cd;
      display: flex;
      .left {
        width: 180px;
        background: url('~@/assets/images/logo.png') no-repeat center center;
        background-size: contain;
      }
      .right {
        width: 180px;
        text-align: right;
        line-height: 60px;
        font-weight: bold;
        a {
          color: #ff8c00;
          text-decoration: none;
        }
      }
      .middle {
        flex: 1;
        h1 {
          color: #fff;
          font-size: 30px;
          text-align: center;
          line-height: 60px;
        }
      }
    }
    .el-aside {
      background-color: #545c64;
      .el-submenu {
        width: 200px;
      }
    }
    .el-main {
      background-color: #d4dfe4;
    }
  }
}
</style>
