<style>
  .el-row {
    margin-bottom: 10px;
  }

  .el-col:last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
    margin-bottom: 5px;
  }

  .bg-purple {
    background: #fff;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 200px;
    padding: 15px;
  }


</style>
<template>
  <div class="index">
    <Condition></Condition>

    <div class="result block-width">

      <el-row :gutter="20">
        <!-- 风速/风向 -->
        <transition name="el-fade-in-linear">

          <el-col :span="9">
            <div class="grid-content bg-purple">
              <span class="title-lg">风速/风向</span>
            </div>
          </el-col>

        </transition>

        <!-- 地表温度/总辐射 -->
        <transition name="el-fade-in-linear">
          <el-col :span="9" :offset="6">
            <div class="grid-content bg-purple">
              <span class="title-lg">地表温度/辐射</span>

            </div>
          </el-col>
        </transition>
      </el-row>
      <el-row :gutter="20">
        <!-- 空气温度 -->
        <transition name="el-fade-in-linear">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">气温</span>

            </div>
          </el-col>
        </transition>
        <!-- 气压 -->
        <transition name="el-fade-in-linear">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">气压</span>

            </div>
          </el-col>
        </transition>
        <!-- 雨量/湿度 -->
        <transition name="el-fade-in-linear">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">雨量/湿度</span>

            </div>
          </el-col>
        </transition>
      </el-row>

    </div>

  </div>
</template>
<script>
  import Condition from '../components/index/condition'

  export default {
    data() {
      return {}
    },
    components: {
      Condition
    },
    methods: {}
  }
</script>
