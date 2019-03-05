<style>
    .nav-search{
        width: 135px;
        background-color: #f9f9f9;
        transition: width .7s;
    }
    
    .navSearchFocus{
        width: 250px;
    }
</style>
<template>
    <div class="administor">
        <div class="block-width fff">
            <el-input
                size="small"
                class="nav-search"
                :class="isNavSearchFocus ? 'navSearchFocus': ''"
                placeholder="search..."
                suffix-icon="el-icon-search"
                @focus="navSearchFocus"
                @blur="navSearchBlur"
                v-model="searchContent">
            </el-input>
            <el-button type="primary" size="small">搜索</el-button>
            <el-tooltip content="添加新管理员" placement="left">
                <el-button type="primary" size="small" class="fr" icon="el-icon-plus" circle @click="dialogFormVisible = true"></el-button>
            </el-tooltip>
        </div>
        <div class="block-width fff">
            <el-table :data="tableData" border style="width: 100%" stripe :highlight-current-row=true>
                <el-table-column fixed prop="date" label="日期">
                </el-table-column>

                <el-table-column prop="name" label="姓名">
                </el-table-column>

                <el-table-column prop="phone" label="电话">
                </el-table-column>

                <el-table-column prop="email" label="邮箱" width='160'>
                </el-table-column>

                <el-table-column prop="ID" label="身份证号" width='180'>
                </el-table-column>

                <el-table-column prop="password" label="密码">
                </el-table-column>
                
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="managerStatur">停用</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small" v-else>重启</el-button>
                        <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
                        <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加管理员 -->
        <!-- Form -->

        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
            <el-form :model="formData" label-width="120px" size="small" inline status-icon>
                
                <el-form-item label="姓名">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formData.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" >
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" >
                    <el-input v-model="formData.ID"></el-input>
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" >
                    <el-input v-model="formData.confirmPassword"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-input v-model="formData.date"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data(){
        return{
            searchContent:'',
            isNavSearchFocus:false,
            managerStatur:false,
            dialogFormVisible:false,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                phone:'15557106128',
                email:'iamlokep@163.com',
                ID:'330681********3292',
                password:'******'
            }],
            formData:{
                date: '2016-05-02',
                name: '王小虎',
                phone:'15557106128',
                email:'iamlokep@163.com',
                ID:'330681********3292',
                password:'******',
                confirmPassword:''
            }
        }
    },
    methods:{
        navSearchFocus(){
            this.isNavSearchFocus = true
        },
        navSearchBlur(){
            this.isNavSearchFocus = false
        },
        handleClick(row) {
            console.log(row);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        }
    }
}
</script>
