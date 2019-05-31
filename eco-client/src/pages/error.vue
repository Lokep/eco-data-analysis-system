<template>
  <div class="error">
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
    <el-table :data="errorList" border empty-text="暂无数据，请选择日期">
      <el-table-column align="center" header-align="center" prop="type" label="类型"/>
      <el-table-column align="center" header-align="center" prop="datetime" label="正常范围">
        <template slot-scope="scope">
          <span>{{scope.row.min }} ~ {{ scope.row.max}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" prop="currentValue" label="当前数值"/>
      <el-table-column align="center" header-align="center" prop="datetime" label="状态">
        <template slot-scope="scope">
          <span class="red" :class="{'green': scope.row.currentValue > scope.row.min && scope.row.currentValue < scope.row.max}">
            {{scope.row.currentValue > scope.row.min && scope.row.currentValue < scope.row.max ? '正常' : '异常'}}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "error",
    data() {
      return {
        errorList: [],
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
        datetime: "",
      }
    },
    methods: {
      search() {
        this.errorList = [];
        this.date && this.time && (this.datetime = this.date + ' ' + this.time);
        this.getWindData(this.datetime);
        this.getEarthData(this.datetime);
        this.getAirData(this.datetime);
        this.getPressureData(this.datetime);
        this.getRainData(this.datetime)
      },
      getWindData(datetime) {
        this.$axios.get('/error/wind', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.errorList.push(res.data.data)
          }
        })
      },
      getEarthData(datetime) {
        this.$axios.get('/error/earth', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.errorList.push(res.data.data)
          }
        })
      },
      getAirData(datetime) {
        this.$axios.get('/error/temperature', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.errorList.push(res.data.data)
          }
        })
      },
      getPressureData(datetime) {
        this.$axios.get('/error/pressure', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.errorList.push(res.data.data)
          }
        })
      },
      getRainData(datetime) {
        this.$axios.get('/error/rain', {
          params: {
            datetime: datetime
          }
        }).then(res => {
          if (res.data.code === '200') {
            this.errorList.push(res.data.data)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .error {
    padding: 30px;
  }
  .red {
    color: red;
  }

  .green {
    color: lightgreen;
  }
</style>