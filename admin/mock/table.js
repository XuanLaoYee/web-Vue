import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

const orderData = Mock.mock({
  'items|30': [{
    'id|+1': 1,
    order: '@integer(300, 5000)',
    name: 'name',
    buyerName: 'name',
    sellerName: 'name',
    time: '@datetime'

  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/api/admin/cancelorder',
    type: 'post',
    response: config => {
      const { id } = config.body
      var code
      var msg = '订单取消失败'
      if (id === 5) {
        code = 100
      } else {
        code = 20000
        msg = 'success'
      }
      return {
        code: code,
        data: {},
        msg: msg
      }
    }
  },
  {
    url: '/api/admin/getorderlist',
    type: 'get',
    response: config => {
      const items = orderData.items
      return {
        code: 20000,
        data: items,
        msg: 'success'
      }
    }
  },
  {
    url: '/api/admin/getdiscount',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: { discount: 9 },
        msg: 'success'
      }
    }
  },
  {
    url: '/api/admin/modifydiscount',
    type: 'post',
    response: config => {
      const { discount } = config.body
      return {
        code: 20000,
        data: { discount: discount },
        msg: 'success'
      }
    }
  }
]
