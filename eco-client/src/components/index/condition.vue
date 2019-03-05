<style>
    .condition{
        background-color: #fff;
        border-radius: 10px;
        min-height: 150px;
    }
    .condition-choices{
        width: 75%;
    }
</style>
<template>
    <div class="condition block-width">
        <div class="padding-vertical">
            <span class="title-sm">异常类别：</span>
            <el-select v-model="value" placeholder="请选择" size="small">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" plain size="small">查看</el-button>
        </div>
        <div class="padding-vertical">
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
        <div class="padding-vertical">
            <span class="title-sm">选择审核参数：</span>
            <el-checkbox-group class="condition-choices inline" v-model="checkboxGroup5" size="small">
                <el-checkbox class="margin-bottom" v-for="(k,i) in options" :key="k.label" :index="i" :label="k.label" ></el-checkbox>
            </el-checkbox-group>
        </div>
        <el-button type="primary" size="small">导出Excel</el-button>
    </div>
</template>
<script>
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
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            checkboxGroup5: [],
            checked5: false
        }
    }
}
</script>