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

  .bg-purple, .bg-purple-light, .bg-purple-dark {
    background: #fff;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 200px;
    padding: 15px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .progress {
    margin: 0 auto;
    width: 126px;
  }

  .col-active {
    border: 1px solid;
    background-color: rgba(77, 161, 255, 1);
  }

  .show-data b {
    width: 1.5em;
    color: #000;
    display: inline-block;
    text-align: center;
  }

  .data-condition {
    background-color: #fff;
  }
</style>
<template>
  <div class="data">
    <div class="padding-vertical block-width data-condition">
      <span class="title-sm">选择时间参数：</span>
      <el-date-picker
        size="small"
        v-model="date"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy/MM/dd"
        default-value="2007/06/21"
      >
      </el-date-picker>
      <el-time-select
        size="small"
        v-model="time"
        :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '23:00'
                }"
        placeholder="选择时间"
      >
      </el-time-select>
      <el-button size="small" type="primary" @click="search">查询</el-button>
    </div>
    <div v-if="hasResult" class="result block-width">
      <el-row :gutter="20">
        <!-- 风速/风向 -->
        <transition name="el-fade-in-linear">
          <el-col :span="9">
            <div class="grid-content bg-purple">
              <span class="title-lg">风速/风向</span>
              <el-popover
                placement="bottom"
                width="200"
                trigger="hover">
              <!-- content="瞬时风速：8 " -->
              <span solot="content" class="show-data title-sm">
                                    瞬时风速：<b>{{windInfo.InstantaneousSpeed}}</b>  瞬时风向：<b>{{windInfo.InstantaneousDirection}}</b>
                                    <br>
                                    极大风速：<b>{{windInfo.largeSpeed}}</b> 极大风向：<b>{{windInfo.largeDirection}}</b>
                                    <br>
                                    最大风速：<b>{{windInfo.maxSpeed}}</b>  最大风向：<b>{{windInfo.maxDirection}}</b>
                                </span>
              <Wind slot="reference" :windInfo="windInfo"></Wind>
              </el-popover>
              <el-row>
                <el-col :span="12">
                  <span class="title-sm show margin-bottom">极大时间:{{windInfo.largeWindTime}}</span>
                  <el-progress :percentage="66.66" color="#F56C6C" :show-text=false></el-progress>
                </el-col>
                <el-col :span="12">
                  <span class="title-sm show margin-bottom">最大时间:{{windInfo.maxWindTime}}</span>
                  <el-progress :percentage="50" color="#93d587" :show-text=false></el-progress>
                </el-col>
              </el-row>
            </div>
          </el-col>

        </transition>

        <!-- 地表温度/总辐射 -->
        <transition name="el-fade-in-linear">
          <el-col :span="9" :offset="6">
            <div class="grid-content bg-purple">
              <span class="title-lg">地表温度/辐射</span>
              <Temperature :earthInfo="earthInfo"></Temperature>
              <el-row>
                <span class="title-sm show margin-bottom">总辐射:{{earthInfo.allRadiation}}</span>
                <el-progress :percentage="84" color="#CDDB49" :show-text=false></el-progress>
              </el-row>
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

              <el-tooltip class="item" effect="dark" :content="'空气温度:' + airInfo.airHumidity" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">空气温度</span>
                  <el-progress :percentage="51" color="#ffcd31" :show-text=false></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最高出现时间:' + airInfo.maxTemperatureShowTime" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最高出现时间</span>
                  <el-progress :percentage="63.18" color="#93d587" :show-text=false></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最高气温:' + airInfo.maxTemperature" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最高气温</span>
                  <el-progress :percentage="53" color="#8e71c7" :show-text=false></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最低出现时间:' + airInfo.minTemperatureShowTime" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最低出现时间</span>
                  <el-progress :percentage="62.1" color="#CDDB49" :show-text=false></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最低气温:' + airInfo.minTemperature" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最低气温</span>
                  <el-progress :percentage="0" color="#F56C6C" :show-text=false></el-progress>
                </el-row>
              </el-tooltip>
            </div>
          </el-col>
        </transition>
        <!-- 气压 -->
        <transition name="el-fade-in-linear">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">气压</span>
              <el-tooltip class="item" effect="dark" :content="'本站气压:' + pressureInfo.stationPressure" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">本站气压</span>
                  <el-progress :percentage="60.07" color="#ffcd31" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最高出现时间:' + pressureInfo.maxPressureShowTime" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最高出现时间</span>
                  <el-progress :percentage="61.44" color="#93d587" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最高气压:' + pressureInfo.maxPressure" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最高气压</span>
                  <el-progress :percentage="6.015" color="#8e71c7" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最低出现时间:' + pressureInfo.minPressureShowTime" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最低出现时间</span>
                  <el-progress :percentage="64.38" color="#CDDB49" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'最低气压:' + pressureInfo.minPressure" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">最低气压</span>
                  <el-progress :percentage="6.006" color="#F56C6C" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>
            </div>
          </el-col>
        </transition>
        <!-- 雨量/湿度 -->
        <transition name="el-fade-in-linear">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <span class="title-lg">雨量/湿度</span>
              <el-tooltip class="item" effect="dark" :content="'1min雨量:' + rainInfo['1minRainFall']" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">1min雨量</span>
                  <el-progress :percentage="0" color="#ffcd31" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" :content="'1h雨量:' + rainInfo['1hourRainFall']" placement="top-start">
                <el-row>
                  <span class="title-sm show margin-bottom">1h雨量</span>
                  <el-progress :percentage="30" color="#93d587" :show-text="false"></el-progress>
                </el-row>
              </el-tooltip>

              <el-row>
                <el-tooltip class="item" effect="dark" :content="'相对湿度:' + rainInfo['relativeHumidity']" placement="top-start">
                  <el-col :span="12">
                    <span class="title-sm show margin-bottom">相对湿度</span>
                    <div class="progress">
                      <el-progress type="circle" :percentage="65" color="#F56C6C"></el-progress>
                    </div>
                  </el-col>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" :content="'最小湿度:' + rainInfo['minHumidity']" placement="top-start">
                  <el-col :span="12">
                    <span class="title-sm show margin-bottom">最小湿度</span>
                    <div class="progress">
                      <el-progress type="circle" :percentage="60" color="#CDDB49"></el-progress>
                    </div>
                  </el-col>
                </el-tooltip>
              </el-row>
              <el-row>
                <el-tooltip class="item" effect="dark" :content="'最低时间:' + rainInfo['minHumidityShowTime']" placement="top-start">
                  <el-col :span="12">
                    <span class="title-sm show margin-bottom">最低时间</span>
                    <el-progress :percentage="64.38" :show-text="false"></el-progress>
                  </el-col>
                </el-tooltip>
              </el-row>
            </div>
          </el-col>
        </transition>
      </el-row>

    </div>
    <div v-else style="text-align: center;margin-top: 30px;">请先选择查询日期</div>
  </div>
</template>
<script>
  import Wind from '../components/index/wind'
  import Temperature from '../components/index/temperature'

  export default {
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        date: '',
        time: '',
        windInfo: {
          "2minDirection": "",
          "2minSpeed": "",
          "10minDirection": "",
          "10minSpeed": ""
        },
        earthInfo: {},
        airInfo: {},
        pressureInfo: {},
        rainInfo: {},
        datetime: "",
        hasResult: false
      }
    },
    methods: {
      search() {
        this.date && this.time && (this.datetime = this.date + ' ' + this.time);
        this.getWindData(this.datetime);
        this.getEarthData(this.datetime);
        this.getAirData(this.datetime);
        this.getPressureData(this.datetime);
        this.getRainData(this.datetime)
      },
      getWindData(datetime) {
        this.$axios.get('/compare/wind', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.windInfo = res.data.data
            this.hasResult = true;
          } else {
            this.hasResult = false;
          }
        })
      },
      getEarthData(datetime) {
        this.$axios.get('/compare/earth', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.earthInfo = res.data.data
          }
        })
      },
      getAirData(datetime) {
        this.$axios.get('/compare/temperature', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.airInfo = res.data.data
          }
        })
      },
      getPressureData(datetime) {
        this.$axios.get('/compare/pressure', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.pressureInfo = res.data.data
          }
        })
      },
      getRainData(datetime) {
        this.$axios.get('/compare/rain', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.rainInfo = res.data.data
          }
        })
      }
    },
    components: {
      Wind,
      Temperature
    }
  }
</script>
