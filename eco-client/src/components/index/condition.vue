<style>
  .condition {
    background-color: #fff;
    border-radius: 10px;
    min-height: 150px;
  }

  .condition-choices {
    width: 75%;
  }

  span {
    display: inline-block;
  }
</style>
<template>
  <div class="condition block-width">
    <!--<div class="padding-vertical">-->
      <!--<span class="title-sm">异常类别：</span>-->
      <!--<el-select v-model="value" placeholder="请选择" size="small">-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-button type="primary" plain size="small">查看</el-button>-->
    <!--</div>-->
    <div class="padding-vertical">
      <span class="title-sm">选择开始时间：</span>
      <el-date-picker
        size="small"
        v-model="startDate"
        align="right"
        type="date"
        placeholder="选择开始日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy/MM/dd"
        default-value="2007/06/21"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-time-select
        size="small"
        v-model="startTime"
        :picker-options="{
                    start: '00:0',
                    step: '01:00',
                    end: '23:00'
                }"
        placeholder="选择开始时间">
      </el-time-select>
    </div>
    <div class="padding-vertical">
      <span class="title-sm">选择结束时间：</span>
      <el-date-picker
        size="small"
        v-model="endDate"
        align="right"
        type="date"
        placeholder="选择结束日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy/MM/dd"
        default-value="2007/06/21"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-time-select
        size="small"
        v-model="endTime"
        :picker-options="{
                    start: '00:0',
                    step: '01:00',
                    end: '23:00'
                }"
        placeholder="选择结束时间">
      </el-time-select>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <div class="padding-vertical">
      <span class="title-sm">选择审核参数：</span>
      <el-radio-group class="condition-choices inline" v-model="examineParams" size="small" @change="changeExamineParams">
        <el-radio v-for="(k,i) in options" :key="k.label" :index="i"
                     :label="k.label">{{k.value}}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
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
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        options: [{
          value: '风速/风向',
          label: 'wind'
        }, {
          value: '地表温度/辐射',
          label: 'earth'
        }, {
          value: '气温',
          label: 'temperature'
        }, {
          value: '气压',
          label: 'pressure'
        }, {
          value: '雨量/湿度',
          label: 'rain'
        }],
        value: '',
        examineParams: '',
        checked5: false,
        startDateTime: "",
        endDateTime: "",
        dataInfo: {}
      }
    },
    mounted() {
    },
    methods: {
      changeExamineParams() {
        this.$emit('getExamineParams', this.examineParams, this.dataInfo)
      },
      search() {
        this.startDate && this.startTime && (this.startDateTime = this.startDate + ' ' + this.startTime);
        this.endDate && this.endTime && (this.endDateTime = this.endDate + ' ' + this.endTime);
        this.getWindData(this.startDateTime, this.endDateTime);
        this.getEarthData(this.startDateTime, this.endDateTime);
        this.getAirData(this.startDateTime, this.endDateTime);
        this.getPressureData(this.startDateTime, this.endDateTime);
        this.getRainData(this.startDateTime, this.endDateTime);
      },
      getWindData(startDateTime, endDateTime) {
        this.$axios.get('/wind', {
          params: {
            startDateTime, endDateTime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.dataInfo.windData = res.data.data
          } else {
          }
        })
      },
      getEarthData(startDateTime, endDateTime) {
        this.$axios.get('/earth', {
          params: {
            startDateTime, endDateTime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.dataInfo.earthData = res.data.data
          }
        })
      },
      getAirData(startDateTime, endDateTime) {
        this.$axios.get('/temperature', {
          params: {
            startDateTime, endDateTime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.dataInfo.airData = res.data.data
          }
        })
      },
      getPressureData(startDateTime, endDateTime) {
        this.$axios.get('/pressure', {
          params: {
            startDateTime, endDateTime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.dataInfo.pressureData = res.data.data
          }
        })
      },
      getRainData(startDateTime, endDateTime) {
        this.$axios.get('/rain', {
          params: {
            startDateTime, endDateTime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.dataInfo.rainData = res.data.data
          }
        })
      }
    }
  }
</script>