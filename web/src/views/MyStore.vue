<template>
    <div class="myStore" id="myStore" name="goods">
        <!--我的店铺头部-->
        <div class="store-header">
            <div class="order-header-content">
                <p>
                    <i class="el-icon-s-shop" style="font-size: 30px;color: #ff6700;"></i>
                    店铺
                </p>
            </div>
        </div>

    <!--我的店铺头部END-->


<!--    我的店铺主要内容-->
    <div class="main">
        <div class="list">
            <MyList :list="product" v-if="product.length > 0"></MyList>
            <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
    </div>

<!--    我的店铺主要内容END-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                product: "",// 商品列表
                total: 0, // 商品总量
                pageSize: 15,// 每页显示的商品数量
                currentPage: 1, //当前页码
                seller_id: -1,

            }
        },
        //通过路由获取卖家id
        activated() {
            this.total = 0;// 初始化商品总量为0
            this.currentPage = 1;//初始化当前页码为1
            if(this.$route.query.seller_id !==undefined){
                this.seller_id = this.$route.query.seller_id;
            }
        },
        watch: {
            seller_id: function (val) {
                if(val >0){
                    this.getProductBySellerID(val);
                }
            },
        },
        methods: {
            // 返回顶部
            backtop() {
                const timer = setInterval(function () {
                    const top = document.documentElement.scrollTop || document.body.scrollTop;
                    const speed = Math.floor(-top / 5);
                    document.documentElement.scrollTop = document.body.scrollTop =
                        top + speed;

                    if (top === 0) {
                        clearInterval(timer);
                    }
                }, 20);
            },
            //通过卖家id获得商品
            getProductBySellerID(){
                this.$axios
                    .post("/api/product/getProductBySellerID",{
                        user_id: this.seller_id,
                        currentPage: this.currentPage,
                        pageSize: this.pageSize
                    })
                    .then(res => {
                        this.product = res.data.Product;
                        this.total = res.data.total;
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    })
            },
            currentChange(currentPage) {
                this.currentPage = currentPage;
                this.getProductBySellerID();
            }
        }

    }
</script>

<style scoped>
    .myStore {
        background-color: #f5f5f5;
        padding-bottom: 20px;
    }
    .myStore .store-header {
        height: 64px;
        border-bottom: 2px solid #ff6700;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .myStore .store-header .order-header-content {
        width: 1225px;
        margin: 0 auto;
    }
    .myStore .store-header p {
        font-size: 28px;
        line-height: 58px;
        float: left;
        font-weight: normal;
        color: #424242;
    }
    .goods .nav {
        background-color: white;
    }
    .goods .nav .product-nav {
        width: 1225px;
        height: 40px;
        line-height: 40px;
        margin: 0 auto;
    }
</style>
