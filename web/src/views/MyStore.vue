<template>
    <div class="myStore">
        <!--我的店铺头部-->
        <div class="store-header">
            <div class="order-header-content">
                <p>
                    <i class="el-icon-s-shop" style="font-size: 30px;color: #ff6700;"></i>
                    店铺
                </p>
            </div>
        </div>
    </div>
    <!--我的店铺头部END-->


    <!--我的店铺主要内容-->
<!--    <div class="nav">-->
<!--        <div class="product-nav">-->
<!--            <el-tab-pane-->
<!--                    v-for="item in categoryList"-->
<!--                    :key="item.category_id"-->
<!--                    :label="item.category_name"-->
<!--                    :name="''+item.category_id"-->
<!--                    />-->
<!--        </div>-->
<!--    </div>-->
    <!--我的店铺主要内容END-->

</template>

<script>
    export default {
        name: "MyStore"
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
