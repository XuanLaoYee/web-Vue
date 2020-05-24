import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
    {
        path: '/error',
        name: 'Error',
        component: () => import('../components/Error.vue')
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
