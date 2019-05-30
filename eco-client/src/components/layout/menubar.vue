<style>
    .menubar{
        min-width: 180px;
        width: 15%;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
    }
    .menu-content{
        padding: 0 20px;
    }
    .logo{
        height: 150px;
    }
</style>
<template>

    <div class="menubar shadow">
        <div class="menu-content">
            <!-- <img src="" alt="ECO"> -->
            <div class="logo">

            </div>
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
                <el-collapse-item name="1">
                    <template slot="title">
                        <i class="fa fa-bell icon-margin"></i>
                        <router-link to='/' tag="span">实时报警</router-link>
                    </template>
                    <div>异常数据实时报警</div>
                    <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <i class="icon-margin fa fa-database"></i>
                        
                        <router-link to='/data' tag="span">数据对比</router-link>
                    </template>
                    <div>站点参数对比分析</div>
                    <!-- <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div> -->
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <i class="icon-margin fa fa-tags"></i>
                        <router-link to='/error' tag="span">查看异常</router-link>
                    </template>
                    <div>异常数据查看</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
  
</template>
<script>
export default {
    data(){
        return{
            activeNames: ['1']
        }
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
}
</script>
