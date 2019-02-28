<style>
    .navbar{
        max-width: calc( 100% - 180px);
        width:85%;
        height: 60px;
        position: fixed;
        top: 0;
        right: 0;
        margin: auto;
        background-color: #fff;
    }
    .nav-search{
        width: 135px;
        margin: 15px; 
        background-color: #f9f9f9;
        transition: width .7s;
    }
    .nav-search,.nav-search input{
        /* height: 30px; */
        border-radius: 30px!important;
    }
    .navSearchFocus{
        width: 250px;
    }
    .nav-menu{
        width: 600px;
    }
    .el-menu.el-menu--horizontal{
        border:none; 
    }
    .nav-user,.nav-user>*{
        display: inline;
    }
    .nav-user>img{
        border-radius: 4px;
    }
    .el-menu--popup{
        min-width: 120px;
        padding: 5px 10px;
    }
    .link-color{
        color: #409EFF!important;
    }
</style>
<template>
    <div class="navbar">
         <el-input
            size="small"
            class="nav-search fl"
            :class="isNavSearchFocus ? 'navSearchFocus': ''"
            placeholder="search..."
            suffix-icon="el-icon-search"
            @focus="navSearchFocus"
            @blur="navSearchBlur"
            v-model="searchContent">
        </el-input>
        <el-menu :default-active="$route.path" class="fr nav-menu" mode="horizontal">
            <el-menu-item class="link-color" index="/index">首页</el-menu-item>
            
            <el-tooltip class="item" effect="dark" content="新增/删除 管理员" placement="bottom-start">
                <el-menu-item index="2" class="link-color">
                    管理员设置
                </el-menu-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="修改异常参数界限" placement="bottom-start">            
                <el-menu-item index="3" class="link-color">参数校验</el-menu-item>
            </el-tooltip>
            <el-menu-item index="6" class="link-color">关于系统</el-menu-item>    
            <el-submenu index="4">
                <template slot="title">
                    <div class="nav-user">
                        <img src="../../assets/images/head-pic.jpg" alt="">
                        <span>Lokep</span>
                    </div>    
                </template>
                <el-menu-item index="2-1" class="link-color"><i class="fa fa-user icon-margin"></i>个人中心</el-menu-item>
                <el-menu-item index="2-2" class="link-color"><i class="fa fa-sign-out icon-margin"></i>退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchContent:'',
            isNavSearchFocus:false
        }
    },
    methods:{
        navSearchFocus(){
            this.isNavSearchFocus = true
        },
        navSearchBlur(){
            this.isNavSearchFocus = false
        }
    }
}
</script>
