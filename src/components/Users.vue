<template>
<div class="user">
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 搜索 -->
<div style="margin-top: 15px;">
  <el-input placeholder="请输入关键字" v-model="query" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
  </el-input>
  <el-button type="success" plain size="medium">用户添加</el-button>
</div>
<!-- 表格 -->
 <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
       <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
       <el-table-column prop="mg_state" label="状态" width="180">
         <template slot-scope = 'scope'>
           <el-switch
           @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
         </template>
      </el-table-column>
      <el-table-column prop="handle" label="操作">
        <template slot-scope = 'scope'>
           <el-button type="primary" icon="el-icon-edit" circle size="small" plain></el-button>
           <el-button type="danger" icon="el-icon-delete" @click="del(scope.row.id)" circle plain size="small"></el-button>
           <el-button type="success" icon="el-icon-check" plain size="small">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background>
    </el-pagination>

</div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
      query: '',
      currentPage: 1,
      pageSize: 2,
      total: 0,
      state: false,
      baseUrl: 'http://localhost:8888/api/private/v1/'
    }
  },
  created() {
    this.render()
  },
  methods: {
    render() {
      this.ajax({
        method: 'get',
        url: this.baseUrl + 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.meta.status === 200) {
          this.userlist = res.data.data.users
          this.total = res.data.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.render()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.render()
    },
    changeState(user) {
      this.ajax({
        method: 'put',
        url: this.baseUrl + `users/${user.id}/state/${user.mg_state}`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.meta.status === 200) {
          this.$message.success('修改成功')
          this.render()
        }
      })
    },
    search() {
      this.currentPage = 1
      this.render()
    },
    del(id) {
      this.ajax({
        method: 'delete',
        url: this.baseUrl + 'users/' + id,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res.data)
        this.render()
      })
    }
  }
}

</script>

<style lang="less" scoped>
 .user{
   .el-breadcrumb{
     margin-top:10px;
   }
   .el-input{
     width:400px;
   }
   .el-table{
     margin-top:10px;
   }
   .el-pagination{
     margin-top:15px;
   }
 }
</style>
