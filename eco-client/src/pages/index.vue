<style>
    .condition{
        width: 75%;
        padding: 15px 20px;
        background-color: #fff;
        border-radius: 10px;
        min-height: 150px;
        margin: 20px auto;
    }
    .condition-title{
        color:#909399;
        font-size: 14px;
        display: inline;
    }
</style>
<template>
    <div class="index">
        <div class="condition">
            <div>
                <span class="condition-title">异常类别：</span>
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
            <div>
                <span class="condition-title">选择审核参数：</span>
                <el-checkbox-group v-model="checkboxGroup5" size="small">
                    <el-checkbox label="备选项1" border></el-checkbox>
                    <el-checkbox label="备选项2" border></el-checkbox>
                    <el-checkbox label="备选项3" border></el-checkbox>
                    <el-checkbox label="备选项4" border></el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
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
