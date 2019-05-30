<template>
  <div class="error">
    <el-table :data="errorList" border>
      <el-table-column align="center" header-align="center" prop="datetime" label="时间" />
      <el-table-column align="center" header-align="center" prop="datetime" label="正常范围" />
      <el-table-column align="center" header-align="center" prop="datetime" label="当前数值" />
      <el-table-column align="center" header-align="center" prop="datetime" label="状态" />
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "error",
    data() {
      return {
        errorList: []
      }
    }
  }
</script>

<style scoped>
  .error {
    padding: 30px;
  }
</style>