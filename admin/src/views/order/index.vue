<template>
  <div class="app-container">
    <d2-crud
      :columns="columns"
      :data="data"
      :options="options"
      :row-handle="rowHandle"
      @row-remove="handleRowRemove"
    />
  </div>
</template>

<script>
import { getOrderList, cancelOrder } from '@/api/table'
export default {
  data() {
    return {
      columns: [
        {
          title: '订单号',
          key: 'order'
        },
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: '买家名',
          key: 'buyerName'
        },
        {
          title: '卖家名',
          key: 'sellerName'
        },
        {
          title: '时间',
          key: 'time'
          // width: '300'
        }
        // ,
        // {
        //   title: '邮编',
        //   key: 'zip'
        // }
      ],
      data: [
        {
          id: 1,
          order: '2016-05-03',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 2,
          order: '2016-05-02',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 3,
          order: '2016-05-04',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 4,
          order: '2016-05-01',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 5,
          order: '2016-05-08',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 6,
          order: '2016-05-06',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 7,
          order: '2016-05-07',
          name: '王小虎',
          buyerName: '上海',
          sellerName: '普陀区',
          time: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      options: {
        // maxHeight: '250'
      },
      rowHandle: {
        remove: {
          text: '取消订单',
          fixed: 'right',
          size: 'mini',
          confirm: false
        }
      }
    }
  },
  created() {
    this.fetchlist()
  },
  methods: {
    handleRowRemove({ index, row }, done) {
      var data = { id: row.id }
      cancelOrder(data).then(
        response => {
          if (response.code === 20000) {
            this.$message({
              message: '取消订单成功',
              type: 'success'
            })
            done()
          }
        }
      ).catch(() => {
        // this.$message({
        //   message: '取消订单失败',
        //   type: 'error'
        // })
      })
    },
    fetchlist() {
      getOrderList().then(res => {
        if (res.code === 20000) {
          this.data = res.data
        } else {
          this.$message({
            message: '获取order失败',
            type: 'error'
          })
        }
      }).catch(
        // this.$message({
        //   message: '获取order失败',
        //   type: 'error'
        // })
      )
    }
  }
}
</script>
