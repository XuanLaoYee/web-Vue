<template>
    <div class="uploaditem">
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
                <el-input v-model="form.price" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="售价">

                <el-input v-model="form.selling" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="数量">
                <el-input v-model="form.num" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="封面" >
                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <!--action 上传的地址-->
            </el-form-item>
            <el-form-item label="详情图">
            <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
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
                    category: '',
                    title: '',
                    desc: '',
                    price:'',
                    selling:'',
                    categoryList: "",
                    num:'',
                    imageUrl: '',
                    dialogImageUrl: '',
                    dialogVisible: false
                }
            }
        },
        created() {
            // 获取分类列表
            this.getCategory();
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
