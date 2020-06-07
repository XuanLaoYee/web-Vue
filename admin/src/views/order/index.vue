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
      data: [],
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
      var data = { id: row.order }
      console.log(row);
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
            this.data = [];
            for(let i=0;i<res.data.length;i++){
                let order = res.data[i];
                this.data.push({
                    id: i,
                    order: order.order_id,
                    name: order.product_name,
                    buyerName: order.buyerName,
                    sellerName: order.sellerName,
                    time: order.order_time,
                    zip: 200333
                })
            }
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
