export default {
    state: {
        shoppingCart: []
        //下面是shoppingCart结构
        /*shoppingCart = {
            id:"",//购物车id
            productID: "",
            productName: "",
            productImg: "", //商品图片
            price: "", //商品价格
            num: "", //商品数量
            maxNum: "", //商品限购数量
            check: false //是否勾选
        }*/
    },
    getters: {
        getShoppingCart(state) {
            return state.shoppingCart
        },
        getNum(state) {
            let totalNum = 0;
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                totalNum += temp.num;
            }
            return totalNum;
        },
        getIsAllCheck(state) {
            let isAllCheck = true;//是否全选
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                if (!temp.check) {//若非全选则返回false
                    isAllCheck = false;
                    return isAllCheck;
                }
            }
            return isAllCheck;
        },
        getCheckGoods(state) {
            //获取勾选的商品信息，用以确认订单页面
            let checkGoods = [];
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                if (temp.check) {
                    checkGoods.push(temp);
                }
            }
            return checkGoods;
        },
        getCheckNum(state) {
            let totalNum = 0;
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                if (temp.check) {
                    totalNum += temp.num;
                }
            }
            return totalNum;
        },
        getTotalPrice(state) {
            // 购物车勾选的商品总价格
            let totalPrice = 0;
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                if (temp.check) {
                    totalPrice += temp.price * temp.num;
                }
            }
            return totalPrice;
        }
    },
    mutations: {
        setShoppingCart(state, data) {
            // 设置购物车状态
            state.shoppingCart = data;
        },
        unshiftShoppingCart(state, data) {
            // 添加购物车
            // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
            state.shoppingCart.unshift(data);
        },
        updateShoppingCart(state, payload) {
            // 更新购物车
            // 可更新商品数量和是否勾选
            // 用于购物车点击勾选及加减商品数量
            if (payload.prop === "num") {
                // 判断效果的商品数量是否大于限购数量或小于1
                if (state.shoppingCart[payload.key].maxNum < payload.val) {
                    return;
                }
                if (payload.val < 1) {
                    return;
                }
            }
            // 根据商品在购物车的数组的索引和属性更改
            state.shoppingCart[payload.key][payload.prop] = payload.val;
        },
        addShoppingCartNum(state, productID) {
            // 增加购物车商品数量
            // 用于在商品详情页点击添加购物车,后台返回002，“该商品已在购物车，数量 +1”，更新vuex的商品数量
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                if (temp.productID === productID) {
                    if (temp.num < temp.maxNum) {
                        temp.num++;
                    }
                }
            }
        },
        deleteShoppingCart(state, id) {
            // 根据购物车id删除购物车商品
            for (let i = 0; i < state.shoppingCart.length; i++) {
                const temp = state.shoppingCart[i];
                if (temp.id === id) {
                    state.shoppingCart.splice(i, 1);
                }
            }
        },
        checkAll(state, data) {
            // 点击全选按钮，更改每个商品的勾选状态
            for (let i = 0; i < state.shoppingCart.length; i++) {
                state.shoppingCart[i].check = data;
            }
        }
    },
    actions: {
        setShoppingCart({commit}, data) {
            commit('setShoppingCart', data);
        },
        unshiftShoppingCart({commit}, data) {
            commit('unshiftShoppingCart', data);
        },
        updateShoppingCart({commit}, payload) {
            commit('updateShoppingCart', payload);
        },
        addShoppingCartNum({commit}, productID) {
            commit('addShoppingCartNum', productID);
        },
        deleteShoppingCart({commit}, id) {
            commit('deleteShoppingCart', id);
        },
        checkAll({commit}, data) {
            commit('checkAll', data);
        }
    }
}

