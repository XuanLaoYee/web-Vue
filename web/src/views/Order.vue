<template>
    <div class="order">
        <!-- 我的订单头部 -->
        <div class="order-header">
            <div class="order-header-content">
                <p>
                    <i class="el-icon-s-order" style="font-size: 30px;color: #61AAEE;"></i>
                    我的订单
                </p>
            </div>
        </div>
        <!-- 我的订单头部END -->

        <!-- 我的订单主要内容 -->
        <div class="order-content" v-if="orders.length>0">
            <div class="content" v-for="(item,index) in orders" :key="index">
                <ul>
                    <!-- 我的订单表头 -->
                    <li class="order-info">
                        <div class="order-id">订单编号: {{item[0].order_id}}</div>
                        <div class="order-time">订单时间: {{item[0].order_time | dateFormat}}</div>
                    </li>
                    <li class="header">
                        <div class="pro-img"></div>
                        <div class="pro-name">商品名称</div>
                        <div class="pro-price">单价</div>
                        <div class="pro-num">数量</div>
                        <div class="pro-total">小计</div>
                        <div class="pro-statue">订单状态</div>
                        <div class="pro-op" v-if="isSeller()">确认订单</div>
                    </li>
                    <!-- 我的订单表头END -->

                    <!-- 订单列表 -->
                    <li class="product-list" v-for="(product,i) in item" :key="i">
                        <div class="pro-img">
                            <router-link :to="{ path: '/goods/details', query: {productID:product.product_id} }">
                                <img :src="$target + product.product_picture"/>
                            </router-link>
                        </div>
                        <div class="pro-name">
                            <router-link
                                    :to="{ path: '/goods/details', query: {productID:product.product_id} }"
                            >{{product.product_name}}
                            </router-link>
                        </div>
                        <div class="pro-price">{{product.product_price}}元</div>
                        <div class="pro-num">{{product.product_num}}</div>
                        <div class="pro-total pro-total-in">{{product.product_price*product.product_num}}元</div>
                        <div class="pro-statue">{{showOrderStatue(product.isSure)}}</div><!--TODO-->
                        <div class="pro-op" v-if="isSeller()">
                            <el-button v-if="product.isSure" disabled="true" size="small">已确认</el-button>
                            <el-button v-if="!product.isSure"  size="small" @click="Sure(product.order_id)">确认</el-button>
                        </div>
                    </li>
                </ul>
                <div class="order-bar">
                    <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{total[index].totalNum}}</span> 件商品
            </span>
                    </div>
                    <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{total[index].totalPrice}}元</span>
            </span>
                    </div>
                    <!-- 订单列表END -->
                </div>
            </div>
            <div style="margin-top:-40px;"></div>
        </div>
        <!-- 我的订单主要内容END -->

        <!-- 订单为空的时候显示的内容 -->
        <div v-else class="order-empty">
            <div class="empty">
                <h2>您的订单还是空的！</h2>
                <p>快去购物吧！</p>
            </div>
        </div>
        <!-- 订单为空的时候显示的内容END -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                orders: [], // 订单列表
                total: [] // 每个订单的商品数量及总价列表
            };
        },
        activated() {
            // 获取订单数据
            this.$axios
                .post("/api/user/order/getOrder", {
                    user_id: this.$store.getters.getUser.user_id,
                    user_kind: localStorage.getItem('user_kind')
                })
                .then(res => {
                    if (res.data.code === "001") {
                        this.orders = res.data.orders;
                    } else {
                        this.notifyError(res.data.msg);
                    }
                })
                .catch(err => {
                    return Promise.reject(err);
                });
        },
        watch: {
            // 通过订单信息，计算出每个订单的商品数量及总价
            orders: function (val) {
                let total = [];
                for (let i = 0; i < val.length; i++) {
                    const element = val[i];

                    let totalNum = 0;
                    let totalPrice = 0;
                    for (let j = 0; j < element.length; j++) {
                        const temp = element[j];
                        totalNum += temp.product_num;
                        totalPrice += temp.product_price * temp.product_num;
                    }
                    total.push({totalNum, totalPrice});
                }
                this.total = total;
            }
        },
        methods: {
            showOrderStatue(val){
                if(val === 1){
                    return '已确认'
                }
                return '尚未确认'
            },
            isSeller() {
                let user_kind_temp = localStorage.getItem("user_kind");
                if (user_kind_temp === 'seller') {
                    return true
                }
                return false
            },
            Sure(val){
                this.$axios
                    .post("/api/user/order/sureOrder",{
                        order_id:val
                    })
                    .then(res =>{
                        if(res.data.code === '001'){
                            this.notifySucceed(res.data.msg);
                            this.$router.go(0);
                        }else if(res.data.code === '002'){
                            this.notifyError(res.data.msg);
                        }
                    })
            //     console.log(val)
            }
        }
    }
</script>
<style scoped>
    .order {
        background-color: #f5f5f5;
        padding-bottom: 20px;
    }

    .order .order-header {
        height: 64px;
        border-bottom: 2px solid #61AAEE;
        background-color: #fff;
        margin-bottom: 20px;
    }

    .order .order-header .order-header-content {
        width: 1225px;
        margin: 0 auto;
    }

    .order .order-header p {
        font-size: 28px;
        line-height: 58px;
        float: left;
        font-weight: normal;
        color: #424242;
    }

    .order .content {
        width: 1225px;
        margin: 0 auto;
        background-color: #fff;
        margin-bottom: 50px;
    }

    .order .content ul {
        background-color: #fff;
        color: #424242;
        line-height: 85px;
    }
    .order .content ul .order-info {
        height: 60px;
        line-height: 60px;
        padding: 0 26px;
        color: #424242;
        border-bottom: 1px solid #61AAEE;
    }

    .order .content ul .order-info .order-id {
        float: left;
        color: #61AAEE;
    }

    .order .content ul .order-info .order-time {
        float: right;
    }

    .order .content ul .header {
        height: 85px;
        padding-right: 26px;
        color: #424242;
    }
    .order .content ul .product-list {
        height: 85px;
        padding: 15px 26px 15px 0;
        border-top: 1px solid #e0e0e0;
    }

    .order .content ul .pro-img {
        float: left;
        height: 85px;
        width: 120px;
        padding-left: 10px;
    }

    .order .content ul .pro-img img {
        height: 80px;
        width: 80px;
    }

    .order .content ul .pro-statue{
        float: left;
        padding-right: 40px;
        width: 70px;
    }
    .order .content ul .pro-name {
        float: left;
        width: 350px;
    }

    .order .content ul .pro-name a {
        color: #424242;
    }

    .order .content ul .pro-name a:hover {
        color: #61AAEE;
    }

    .order .content ul .pro-price {
        float: left;
        width: 160px;
        padding-right: 18px;
        text-align: center;
    }

    .order .content ul .pro-num {
        float: left;
        width: 170px;
        text-align: center;
    }

    .order .content ul .pro-total {
        float: left;
        width: 130px;
        padding-right: 60px;
        text-align: right;
    }

    .order .content ul .pro-total-in {
        color: #61AAEE;
    }

    .order .order-bar {
        width: 1185px;
        padding: 0 20px;
        border-top: 1px solid #61AAEE;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
    }

    .order .order-bar .order-bar-left {
        float: left;
    }

    .order .order-bar .order-bar-left .order-total {
        color: #757575;
    }

    .order .order-bar .order-bar-left .order-total-num {
        color: #61AAEE;
    }

    .order .order-bar .order-bar-right {
        float: right;
    }

    .order .order-bar .order-bar-right .total-price-title {
        color: #61AAEE;
        font-size: 14px;
    }

    .order .order-bar .order-bar-right .total-price {
        color: #61AAEE;
        font-size: 30px;
    }

    .order .order-empty {
        width: 1225px;
        margin: 0 auto;
    }

    .order .order-empty .empty {
        height: 300px;
        padding: 0 0 130px 558px;
        margin: 65px 0 0;
        background: url(../assets/imgs/cart-empty.jpg) no-repeat 124px 0;
        color: #b0b0b0;
        overflow: hidden;
    }

    .order .order-empty .empty h2 {
        margin: 70px 0 15px;
        font-size: 36px;
    }

    .order .order-empty .empty p {
        margin: 0 0 20px;
        font-size: 20px;
    }
</style>
