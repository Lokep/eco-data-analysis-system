<style>
    .login{
        width: 895px;
        overflow: hidden;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 4px;
    }
    .login,.login-bg,.login-box,.login-swiper{
        height: 485px;
    }
    .login-bg,.login-box{
        float: left;
    }
    
    .login-bg,.login-swiper{
        width: 300px;
    }
    .login-swiper img{
        width: 100%;
        height: 100%;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .login-form{
        width: 455px;
        padding: 0 70px;
        height: 300px;
        margin: 80px 0;
    }
    .login-form .title-lg{
        text-align: center;
    }
    .login-btn{
        margin: 0 auto;
        display: block;
        width: 120px;
    }
</style>
<template>
    <div class="login shadow">
        <div class="login-bg">
            <el-carousel class="login-swiper" @change = "changeIndex" height="485px" indicator-position="none" loop>
                <el-carousel-item v-for="(item,i) in swipers" :key="item.src" :index="i">
                    <img :src="item.src" :alt="i">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="login-box">
            <el-form ref="loginForm" class="login-form fff" label-position="right" status-icon label-width="100px" :model="loginForm" >
                <h4 class="title-lg padding-vertical">登录</h4>                
                <el-form-item label="账号" prop="account" :rules="[
                        { required: true, message: '请输入您的手机号', trigger: 'blur' },
                        { pattern:/(^1[34578]\d{9}$)/i, message: '请正确填写您的手机号', trigger: ['blur'] }
                    ]" placeholder="请输入手机号">
                    <el-input v-model="loginForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                
                <el-button type="primary" class="show login-btn pointer padding-horizontal" @click="login">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            labelPosition: 'right',
            loginForm: {
                account: '',
                password: ''
            },
            swipers:[{
                // index:0,
                src:'../../static/season-1.png'
            },{
                // index:1,
                src:'../../static/season-2.png'
            },{
                // index:2,
                src:'../../static/season-3.jpg'
            },{
                // index:3,
                src:'../../static/season-4.jpg'
            }],
            index:0
        }
    },
    methods:{
        changeIndex(i){
            this.index = i

            
        },
        login() {
            this.$axios.post('/admin/login', {
                phone: this.loginForm.account,
                password: this.loginForm.password
            }).then(res => {
                if(res.data.code === '200') {
                    this.$message.success(res.data.message);
                    let userinfo = this.loginForm;
                    userinfo.date = Date.now();
                    localStorage.setItem('userinfo', JSON.stringify(userinfo));
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push({
                        path: redirect
                    })
                }
            })
        }
    }
}
</script>