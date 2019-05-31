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
                placeholder="请输入姓名"
                suffix-icon="el-icon-search"
                @focus="navSearchFocus"
                @blur="navSearchBlur"
                v-model="searchContent">
            </el-input>
            <el-button type="primary" size="small" @click="search">搜索</el-button>
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

                <el-table-column prop="userID" label="身份证号" width='180'>
                </el-table-column>

                <el-table-column prop="password" label="密码">
                </el-table-column>
                
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.state === 1">停用</el-button>
                        <el-button @click="handleClick(scope.row)" type="text" size="small" v-else>重启</el-button>
                        <el-button type="text" size="small" @click="updateInfo(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteRow(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 添加管理员 -->
        <!-- Form -->

        <el-dialog :title="!isUpdate ? '添加管理员' : '修改信息'" :visible.sync="dialogFormVisible">
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
                    <el-input v-model="formData.userID"></el-input>
                </el-form-item>
                <el-form-item label="密码" >
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-input v-model="formData.date"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
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
            tableData: [],
            formData:{},
            isUpdate: false
        }
    },
    mounted() {
        this.getAdminList()
    },
    methods:{
        getAdminList() {
            this.$axios.get('/admin')
              .then(res => {
                  if(res.data.code === '200') {
                      this.tableData = res.data.data
                  }
              })
        },
        navSearchFocus(){
            this.isNavSearchFocus = true
        },
        navSearchBlur(){
            this.isNavSearchFocus = false
        },
        search() {
            this.$axios.get('/admin', {
                params: {
                    name: this.searchContent
                }
            }).then(res => {
                if(res.data.code === '200') {
                    this.$message.success(res.data.message)
                    this.tableData = res.data.data
                } else {
                    this.$message.info(res.data.message)
                }
            })
        },
        handleClick(row) {
            this.$axios.put('/admin/frozen', {
                state: row.state,
                id: row.id
            }).then(res => {
                if(res.data.code === '200') {
                    this.$message.success(res.data.message);
                    this.getAdminList();
                } else {
                    this.$message.info(res.data.message)
                }
            })
        },
        deleteRow(index, rows) {
            this.$confirm('确定删除这个管理员吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.$axios.delete('/admin', {params: {id: rows.id}})
                  .then(res => {
                      if(res.data.code === '200') {
                          this.$message.success(res.data.message);
                          this.tableData.splice(index, 1)
                      } else {
                          this.$message.info(res.data.message);
                      }
                  })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        cancel() {
            this.isUpdate = this.dialogFormVisible = false;
            this.formData = {};
        },
        submitForm() {
            if(!this.isUpdate) {
                this.$axios.post('/admin', this.formData)
                  .then(res => {
                      if(res.data.code === '200') {
                          this.$message.success(res.data.message);
                          this.cancel();
                          this.getAdminList();
                      }
                  });
            } else {
                this.$axios.put('/admin', this.formData)
                  .then(res => {
                      if(res.data.code === '200') {
                          this.$message.success(res.data.message);
                          this.cancel();
                          this.getAdminList()
                      } else {
                          this.$message.success(res.data.message);
                      }
                  });
            }
        },
        updateInfo(row) {
            this.formData = row;
            this.isUpdate = this.dialogFormVisible = true;
        }
    }
}
</script>
