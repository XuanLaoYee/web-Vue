import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [

    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/error',
        name: 'Error',
        component: () => import('../components/Error.vue')
    },
    {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/Goods.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/goods/details',
        name: 'Details',
        component: () => import('../views/Details.vue')
    },
    {
        path: '/shoppingCart',
        name: 'ShoppingCart',
        component: () => import('../views/ShoppingCart.vue'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/collect',
        name: 'Collect',
        component: () => import('../views/Collect.vue'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/Order.vue'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/confirmOrder',
        name: 'ConfirmOrder',
        component: () => import('../views/ConfirmOrder.vue'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/myStore',
        name: 'MyStore',
        component: ()=> import('../views/MyStore.vue'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    },
    {
        path: '/uploadItem',
        name: 'uploadItem',
        component: ()=> import('../views/uploadItem.vue'),
        meta: {
            requireAuth: true // 需要验证登录状态
        }
    }
];

const router = new Router({
    routes
});

// 假如没有回调函数，错误信息会由全局路由处理。
// 这里我们不希望全局处理，而是经由自己的错误处理
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onReject || onResolve) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
};

export default router
