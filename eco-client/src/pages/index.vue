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
    width: 800px;
    border-radius: 4px;
    min-height: 400px;
    padding: 15px;
  }


</style>
<template>
  <div class="index">
    <Condition @getExamineParams="getParams"></Condition>

    <div class="result block-width">

      <el-row :gutter="20">
        <!-- 风速/风向 -->
        <transition name="el-fade-in-linear" v-if="examineParams === 'wind'">

          <el-col :span="9">
            <div class="grid-content bg-purple">
              <span class="title-lg">风速/时间</span>
              <Wind :windData="dataInfo.windData"></Wind>
            </div>
          </el-col>
        </transition>

        <!-- 地表温度/总辐射 -->
        <transition name="el-fade-in-linear" v-else-if="examineParams === 'earth'">
          <el-col :span="9">
            <div class="grid-content bg-purple">
              <span class="title-lg">地表温度/辐射</span>
              <Earth :earthData="dataInfo.earthData"></Earth>
            </div>
          </el-col>
        </transition>
        <!-- 空气温度 -->
        <transition name="el-fade-in-linear" v-else-if="examineParams === 'temperature'">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">气温</span>
              <Temperature :airData="dataInfo.airData"></Temperature>
            </div>
          </el-col>
        </transition>
        <!-- 气压 -->
        <transition name="el-fade-in-linear" v-else-if="examineParams === 'pressure'">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">气压</span>
              <Pressure :pressureData="dataInfo.pressureData"></Pressure>
            </div>
          </el-col>
        </transition>
        <!-- 雨量/湿度 -->
        <transition name="el-fade-in-linear" v-else-if="examineParams === 'rain'">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">雨量/湿度</span>
              <Rain :rainData="dataInfo.rainData"></Rain>
            </div>
          </el-col>
        </transition>
      </el-row>

    </div>

  </div>
</template>
<script>
  import Condition from '../components/index/condition'
  import Wind from './index/wind';
  import Earth from './index/earth';
  import Temperature from './index/temperature';
  import Pressure from './index/pressure';
  import Rain from './index/rain';
  export default {
    data() {
      return {
        examineParams: "",
        dataInfo: {}
      }
    },
    components: {
      Condition, Wind, Earth, Temperature, Pressure, Rain
    },
    methods: {
      getParams(examineParams, dataInfo) {
        this.examineParams = examineParams;
        this.dataInfo = {...dataInfo};
      }
    }
  }
</script>
