<template>
    <div class="uploaditem">
<!--        <div>{{JSON.stringify(form.imageURLs)}}</div>-->
        <!--上传商品头部-->
        <div class="uploaditem-header">
            <div class="uploaditem-header-content">
                <p>
                    <i class="el-icon-s-shop" style="font-size: 30px;color: #ff6700;"></i>
                    上传商品
                </p>
            </div>
        </div>
        <!--上传商品头部END-->
        <el-form ref="form" :model="form"  labelPosition="right" label-width="100px">
            <el-form-item label="产品名称">
                <el-input v-model="form.name" style="width:600px;"></el-input>
            </el-form-item>
            <el-form-item label="产品类型">
                <el-select v-model="form.category" placeholder="请选择产品类型">
                    <el-option  v-for="item in categoryList"
                                :key="item.category_id"
                                :label="item.category_name"
                                :value="''+item.category_id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="产品标语">
                <el-input v-model="form.title" style="width:600px;"></el-input>
            </el-form-item>
            <el-form-item label="产品详细介绍">
                <el-input type="textarea"  :autosize="{ minRows: 5, maxRows: 10}"  v-model="form.desc" style="width:700px;"></el-input>
            </el-form-item>
            <el-form-item label="定价">
                <el-input v-model="form.price" style="width:300px;" type="number"></el-input>
            </el-form-item>
            <el-form-item label="售价">
                <el-input v-model="form.selling" style="width:300px;" type="number"></el-input>
            </el-form-item>
            <el-form-item label="数量">
                <el-input-number v-model="form.num" style="width:300px;" :max=999></el-input-number>
            </el-form-item>
            <el-form-item label="物品图片">
                <el-upload
                        action="https://httpbin.org/post"
                        list-type="picture-card"
                        :auto-upload="false"
                        ref="onSubmit"
                        :on-change="setImageURL">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                            <span
                                    class="el-upload-list__item-preview"
                                    @click="handlePictureCardPreview(file)"
                            >
                            <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                    v-if="!disabled"
                                    class="el-upload-list__item-delete"
                                    @click="handleRemove(file)"
                            >
                              <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即上传</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "uploadItem",
        data() {
            return {

                form: {
                    name: '',//商品名
                    category: '',//分类
                    title: '',//标题
                    desc: '',//介绍
                    price:0,
                    selling:0,//卖价
                    num:0,
                    imageURLs: [],//存object{id：标识，url：base64}
                },
                categoryList: [],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,

            }
        },
        created() {
            this.getCategory();
        },
        methods: {
            onSubmit() {
                //TODO
                // this.$refs.onSubmit.submit();
                // console.log(this.file);

                this.$axios
                    .post('api/user/upload',this.form)
                    .then(res=>{
                        if(res.data.code==='002'){
                            this.$message.error(this.data.msg);
                        }else{
                            this.notifySucceed("上架成功");
                            this.$router.push({path: "/myStore", query: {seller_id: this.$store.getters.getUser.user_id}})
                        }
                    })
            },
            handleRemove(file){
                console.log(file);
            },
            handlePictureCardPreview(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            setImageURL(file){
                console.log(file);
                const reader = new FileReader();
                let self = this;
                reader.addEventListener("load", function () {
                    // preview.src = reader.result;
                    self.form.imageURLs.push({
                        id:file.url,
                        url:reader.result
                    })
                    console.log(reader.result);
                }, false);

                if (file.raw) {
                    reader.readAsDataURL(file.raw);
                }
            },


            beforeAvatarUpload(file) {
                const isJPGOrPNG = (file.type === 'image/jpeg' || file.type === 'image/png');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPGOrPNG) {
                    this.$message.error('上传头像图片只能是 JPG或Png 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPGOrPNG && isLt2M;
            },
            getCategory() {
                this.$axios
                    .post("/api/product/getCategory", {})
                    .then(res => {
                        const cate = res.data.category;
                        this.categoryList = cate;
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }
        }
    }
</script>

<style scoped>
    .uploaditem {
        background-color: #f5f5f5;
        padding-bottom: 20px;
    }
    .uploaditem .uploaditem-header {
        height: 64px;
        border-bottom: 2px solid #ff6700;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .uploaditem .uploaditem-header .uploaditem-header-content {
        width: 1225px;
        margin: 0 auto;
    }
    .uploaditem .uploaditem-header p {
        font-size: 28px;
        line-height: 58px;
        float: left;
        font-weight: normal;
        color: #424242;
    }
    .avatar-uploader .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
