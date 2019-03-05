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
        z-index: 1;
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
    
    .last-nav .el-submenu__title{
        border: none!important;
    }
</style>
<template>
    <div class="navbar">
         
        <el-menu :default-active="$route.path" class="fr nav-menu" mode="horizontal" >
            <el-menu-item class="link-color" index="/">
                <router-link to='/'>首页</router-link>
            </el-menu-item>
            
            <el-tooltip class="item" effect="dark" content="新增/删除 管理员" placement="bottom-start">
                <el-menu-item index="/administor" class="link-color">
                    <router-link to='/administor'>管理员设置</router-link>
                </el-menu-item>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="修改异常参数界限" placement="bottom-start">            
                <el-menu-item index="/check" class="link-color">
                    <router-link to="/check">参数校验</router-link>
                </el-menu-item>
            </el-tooltip>
            <el-menu-item index="/showSystem" class="link-color" :plain="true" @click="showSystem">
                关于系统
            </el-menu-item>    
            <el-submenu index="/personl" class="last-nav">
                <template slot="title">
                    <div class="nav-user">
                        <img src="../../assets/images/head-pic.jpg" alt="">
                        <span>Lokep</span>
                    </div>    
                </template>
                <el-menu-item index="/personal" class="link-color">
                    <router-link to="/personal" class="linkColor"><i class="fa fa-user icon-margin link-color"></i>个人中心</router-link>
                </el-menu-item>
                <el-menu-item index="/quit" class="link-color"><i class="fa fa-sign-out icon-margin link-color"></i>退出</el-menu-item>
            </el-submenu>
        </el-menu>


        <!-- <el-button :plain="true" @click="attention">成功</el-button> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            dialogAttention:false
        }
    },
    methods:{
        
        showSystem(){
            this.$message({
                message: 'this system is only used for Wu`s college graduation project',
                type: 'success'
            });
        }
    }
}
</script>
