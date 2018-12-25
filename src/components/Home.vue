<template>
<div class="home">
  <el-container>
  <el-header>
    <div class="left"></div>
    <div class="middle"></div>
    <div class="right"></div>
  </el-header>
  <el-container>
    <el-aside width="200px"></el-aside>
    <el-main></el-main>
  </el-container>
</el-container>

</div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.home{
  height:100%;
  .el-container{
    height:100%;
    .el-header{
      background-color: #B3C1CD;

    }
    .el-aside{
      background-color: #545C64;
    }
    .el-main{
      background-color: #D4DFE4;
    }

  }
}
</style>
