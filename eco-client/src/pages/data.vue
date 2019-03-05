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

  .bg-purple,.bg-purple-light,.bg-purple-dark  {
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
  .progress{
      margin: 0 auto;
      width: 126px;
  }
  .col-active{
      border:1px solid ;
      background-color: rgba(77,161,255,1);
  }
  .show-data b{
      width: 1.5em;
      color: #000;
      display: inline-block;
      text-align: center;
  }
  .data-condition{
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
                :picker-options="pickerOptions">
            </el-date-picker>
            <el-time-select
                size="small"
                v-model="time"
                :picker-options="{
                    start: '00:0',
                    step: '01:00',
                    end: '23:00'
                }"
                placeholder="选择时间">
            </el-time-select>
        </div>
        <div class="result block-width">
            <el-row :gutter="20">
                <!-- 风速/风向 -->
                <transition name="el-fade-in-linear">
                    <!-- <el-col :span="9">
                        <div class="grid-content bg-purple">
                            <span class="title-lg">风速/风向</span>
                            <el-row>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">瞬时风速</span>
                                    <el-progress :percentage="50" color="#ffcd31"></el-progress>
                                </el-col>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">瞬时风向</span>
                                    <el-progress :percentage="50" color="#ffcd31"></el-progress>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">2min风速</span>
                                    <el-progress :percentage="50"></el-progress>
                                </el-col>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">2min风向</span>
                                    <el-progress :percentage="50" color="#"></el-progress>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">10min风速</span>
                                    <el-progress :percentage="50" color="#F56C6C"></el-progress>
                                </el-col>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">10min风向</span>
                                    <el-progress :percentage="50" color="#F56C6C"></el-progress>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">极大风速</span>
                                    <el-progress :percentage="50" color="#93d587"></el-progress>
                                </el-col>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">极大风向</span>
                                    <el-progress :percentage="50" color="#8e71c7"></el-progress>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">最大风速</span>
                                    <el-progress :percentage="50" color="#93d587"></el-progress>
                                </el-col>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">最大风向</span>
                                    <el-progress :percentage="50" color="#8e71c7"></el-progress>
                                </el-col>
                            </el-row>
                            <el-row>
                                <span class="title-sm show margin-bottom">对应时间</span>
                                <el-progress :percentage="50" color="#CDDB49"></el-progress>
                            </el-row>
                        </div>
                    </el-col> -->
                    
                    
                    <el-col :span="9">
                        <div class="grid-content bg-purple">
                            <span class="title-lg">风速/风向</span>
                            <el-popover
                                placement="bottom"
                                width="200"
                                trigger="hover"
                                >
                                <!-- content="瞬时风速：8 " -->
                                <span solot="content" class="show-data title-sm">
                                    瞬时风速：<b>8</b>  瞬时风向：<b>200</b>
                                    <br>
                                    极大风速：<b>19</b> 瞬时风向：<b>245</b>
                                    <br>
                                    最大风速：<b>10</b> 瞬时风向：<b>242</b>
                                </span>
                                <Wind  slot="reference"></Wind>
                            </el-popover>
                            <el-row>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">极大时间:6666</span>
                                    <el-progress :percentage="66.66" color="#F56C6C"  :show-text=false></el-progress>
                                </el-col>
                                <el-col :span="12">
                                    <span class="title-sm show margin-bottom">最大时间:61764</span>
                                    <el-progress :percentage="50" color="#93d587" :show-text=false></el-progress>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    
                </transition>
                
                <!-- 地表温度/总辐射 -->
                <transition name="el-fade-in-linear">
                    <el-col :span="9"  :offset="6">
                        <div class="grid-content bg-purple">
                            <span class="title-lg">地表温度/辐射</span>
                            <!-- <el-row>
                                <span class="title-sm show margin-bottom">地表地温</span>
                                <el-progress :percentage="50"></el-progress>
                            </el-row>
                            <el-row>
                                <span class="title-sm show margin-bottom">5cm地温</span>
                                <el-progress :percentage="50" color="#ffcd31"></el-progress>
                            </el-row>
                            <el-row>
                                <span class="title-sm show margin-bottom">10cm地温</span>
                                <el-progress :percentage="50" color="#93d587"></el-progress>
                            </el-row>
                            <el-row>
                                <span class="title-sm show margin-bottom">15cm地温</span>
                                <el-progress :percentage="50" color="#8e71c7"></el-progress>
                            </el-row>
                            <el-row>
                                <span class="title-sm show margin-bottom">20cm地温</span>
                                <el-progress :percentage="50" color="#CDDB49"></el-progress>
                            </el-row>
                            <el-row>
                                <span class="title-sm show margin-bottom">总辐射</span>
                                <el-progress :percentage="50" color="#F56C6C"></el-progress>
                            </el-row> -->
                            <Temperature></Temperature>
                            <el-row>
                                <span class="title-sm show margin-bottom">总辐射:-83</span>
                                <el-progress :percentage="83" color="#CDDB49" :show-text=false></el-progress>
                            </el-row>
                        </div>
                    </el-col>
                </transition>
            </el-row>
            <el-row :gutter="20">
                <!-- 空气温度 -->
                <transition name="el-fade-in-linear">
                    <el-col :span="8" >
                        <div class="grid-content bg-purple">
                            <span class="title-lg">气温</span>
                             
                            <el-tooltip class="item" effect="dark" content="空气温度:102℃" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">空气温度</span>
                                    <el-progress :percentage="51" color="#ffcd31" :show-text=false></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最高出现时间:63180" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">最高出现时间</span>
                                    <el-progress :percentage="63.18" color="#93d587" :show-text=false></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最高气温:106" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">最高气温</span>
                                    <el-progress :percentage="53" color="#8e71c7" :show-text=false></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最低出现时间:62100" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">最低出现时间</span>
                                    <el-progress :percentage="62.1" color="#CDDB49" :show-text=false></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最低气温:-8" placement="top-start">
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
                            <el-tooltip class="item" effect="dark" content="本站气压:6007" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">本站气压</span>
                                    <el-progress :percentage="60.07" color="#ffcd31" :show-text="false"></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最高出现时间:61440" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">最高出现时间</span>
                                    <el-progress :percentage="61.44" color="#93d587" :show-text="false"></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最高气压:6015" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">最高气压</span>
                                    <el-progress :percentage="6.015" color="#8e71c7" :show-text="false"></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最低出现时间:64380" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">最低出现时间</span>
                                    <el-progress :percentage="64.38" color="#CDDB49" :show-text="false"></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="最低气压:6006" placement="top-start">
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
                            <el-tooltip class="item" effect="dark" content="1min雨量:0" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">1min雨量</span>
                                    <el-progress :percentage="0" color="#ffcd31" :show-text="false"></el-progress>
                                </el-row>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="1h雨量:15" placement="top-start">
                                <el-row>
                                    <span class="title-sm show margin-bottom">1h雨量</span>
                                    <el-progress :percentage="30" color="#93d587" :show-text="false"></el-progress>
                                </el-row>
                            </el-tooltip>
                            
                            <el-row>
                                <el-tooltip class="item" effect="dark" content="相对湿度:65" placement="top-start">
                                    <el-col :span="12">
                                        <span class="title-sm show margin-bottom">相对湿度</span>
                                        <div class="progress">
                                            <el-progress type="circle" :percentage="65" color="#F56C6C"></el-progress>
                                        </div>
                                    </el-col>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="最小湿度:60" placement="top-start">
                                    <el-col :span="12">
                                        <span class="title-sm show margin-bottom">最小湿度</span>
                                        <div class="progress">
                                            <el-progress type="circle" :percentage="60" color="#CDDB49"></el-progress>
                                        </div>
                                    </el-col>
                                </el-tooltip>
                            </el-row>
                            <el-row>
                                <el-tooltip class="item" effect="dark" content="对应时间:4306" placement="top-start">
                                    <el-col :span="12">
                                        <span class="title-sm show margin-bottom">对应时间</span>
                                        <el-progress :percentage="43" color="#8e71c7" :show-text="false"></el-progress>
                                    </el-col>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="最低时间:64380" placement="top-start">
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
    </div>
</template>
<script>
import Wind from '../components/index/wind'
import Temperature from '../components/index/temperature'
export default {
    data(){
        return{
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
            date:'',
            time:'',
        }
    },
    components:{
        Wind,
        Temperature
    }
}
</script>
