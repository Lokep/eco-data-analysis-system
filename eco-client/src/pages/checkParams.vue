<template>
  <div class="check-params">
    <el-form size="small" :model="paramsForm" label-width="200px" label-position="right">
      <el-form-item label="风速正常范围" prop="">
        <el-input class="inputtxt" placeholder="请输入最小值" v-model.trim.number="paramsForm.minWind" />
        <el-input class="inputtxt" placeholder="请输入最大值" v-model.trim.number="paramsForm.maxWind" />
      </el-form-item>
      <el-form-item label="地表温度正常范围" prop="">
        <el-input class="inputtxt" placeholder="请输入最小值" v-model.trim.number="paramsForm.minEarthTemp" />
        <el-input class="inputtxt" placeholder="请输入最大值" v-model.trim.number="paramsForm.maxEarthTemp" />
      </el-form-item>
      <el-form-item label="气温正常范围" prop="">
        <el-input class="inputtxt" placeholder="请输入最小值" v-model.trim.number="paramsForm.minTemperature" />
        <el-input class="inputtxt" placeholder="请输入最大值" v-model.trim.number="paramsForm.maxTemperature" />
      </el-form-item>
      <el-form-item label="气压正常范围" prop="">
        <el-input class="inputtxt" placeholder="请输入最小值" v-model.trim.number="paramsForm.minPressure" />
        <el-input class="inputtxt" placeholder="请输入最大值" v-model.trim.number="paramsForm.maxPressure" />
      </el-form-item>
      <el-form-item label="湿度正常范围" prop="">
        <el-input class="inputtxt" placeholder="请输入最小值" v-model.trim.number="paramsForm.minHumidity" />
        <el-input class="inputtxt" placeholder="请输入最大值" v-model.trim.number="paramsForm.maxHumidity" />
      </el-form-item>
      <el-form-item>
        <el-button class="inputtxt" type="primary" @click="submitParams">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "checkParams",
    data() {
      return {
        paramsForm: {},
        isUpdate: false
      }
    },
    mounted(){
      this.getParams()
    },
    methods: {
      getParams() {
        this.$axios.get('/check')
          .then(res => {
            if(res.data.code === '200') {
              this.paramsForm = res.data.data;
              this.isUpdate = true
            } else {
              this.isUpdate = false
            }
          })
      },
      submitParams() {
        if(this.isUpdate) {
          this.$axios.put('/check', this.paramsForm)
            .then(res => {
              if(res.data.code === '200') {
                this.$message.success(res.data.message)
              } else {
                this.$message.info(res.data.message)
              }
            })
        } else {
          this.$axios.post('/check', this.paramsForm)
            .then(res => {
              if(res.data.code === '200') {
                this.$message.success(res.data.message)
              } else {
                this.$message.info(res.data.message)
              }
            })
        }
      }
    }
  }
</script>

<style scoped>
  .check-params {
    padding: 30px;
  }

  .inputtxt {
    width: 200px;
    margin-right: 10px;
  }
</style>