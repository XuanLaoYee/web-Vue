exports.install = function (Vue) {
    Vue.prototype.$target = "http://localhost:6666";//后端服务器
    Vue.prototype.notifySucceed = function (msg) {//成功时的弹出框
        this.$notify({
            title: "成功",
            message: msg,
            type: "success",
            offset: 100
        });
    };
    Vue.prototype.notifyError = function (msg) {
        this.$notify.error({
            title: "错误",
            message: msg,
            offset: 100
        });
    };
};
