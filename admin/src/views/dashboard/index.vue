<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您：{{ name }}</div>
    <el-divider><i class="el-icon-mobile-phone" /></el-divider>

    <el-card shadow="hover">
      <el-row>
        <el-col :span="2">
          <div style="margin-top: 12px">
            当前折扣：{{ discount }}
          </div>
        </el-col>
        <el-col :span="8">
          <el-form ref="form" :inline="true" :model="form" label-width="120px" style="margin-top: 2px">
            <el-form-item label="折扣：">
              <el-input v-model="form.discount" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">修改</el-button>
              <!--        <el-button @click="onCancel">Cancel</el-button>-->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDiscount, modifyDiscount } from '@/api/table'

export default {
  name: 'Dashboard',
  data() {
    return {
      discount: 2,
      form: {
        discount: 5
      }
    }
  },
  created() {
    this.fetchDiscount()
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    onSubmit() {
      var data = { discount: this.form.discount }
      modifyDiscount(data).then(res => {
        if (res.code === 20000) {
          this.fetchDiscount()
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
      this.fetchDiscount()
    },
    fetchDiscount() {
      getDiscount().then(res => {
        if (res.code === 20000) {
          this.discount = res.data.discount
        }
      }).catch(() => {
        this.$message({
          message: '获取折扣失败',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
