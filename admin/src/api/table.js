import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getOrderList(params) {
  return request({
    url: '/api/admin/getorderlist',
    method: 'get',
    params
  })
}

export function cancelOrder(data) {
  return request({
    url: '/api/admin/cancelorder',
    method: 'post',
    data
  })
}

export function getDiscount() {
  return request({
    url: '/api/admin/getdiscount',
    method: 'get'
  })
}

export function modifyDiscount(data) {
  return request({
    url: '/api/admin/modifydiscount',
    method: 'post',
    data
  })
}
