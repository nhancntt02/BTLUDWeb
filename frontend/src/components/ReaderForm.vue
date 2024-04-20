<template>
    <form>
        <div class="form-group">
            <label for="id">Mã độc giả</label>
            <input class="form-control" type="text" name="id" v-model="readerLocal._id">
        </div>
        <div class="form-group">
            <label for="ho">Họ lót</label>
            <input class="form-control" type="text" name="ho" v-model="readerLocal.holot">
        </div>
        <div class="form-group">
            <label for="name">Tên</label>
            <input class="form-control" type="text" name="name" v-model="readerLocal.ten">
        </div>
        <div class="form-group">
            <label for="bd">Ngày sinh</label>
            <input class="form-control" type="date" name="bd" v-model="readerLocal.ngaysinh">
        </div>
        <div class="form-group">
            <label for="gt">Phái</label>
            <input class="form-control" type="text" name="gt" v-model="readerLocal.phai">
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input class="form-control" type="text" name="address" v-model="readerLocal.diachi">
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input class="form-control" type="text" name="phone" v-model="readerLocal.dienthoai">
        </div>
    </form>
    <div class="">
        <button class="btn btn-primary" @click="submitReader"><i class="fas fa-save"></i> Lưu</button>
        <button 
            v-if="this.type == 'edit'" 
            type="button"
            class="ml-2 btn btn-danger"
            @click="deleteReader"
        >
        <i class="fas fa-trash"></i> Xóa
        </button>
    </div>
</template>
<script>
    export default {
        props: {
            reader: {  type: Object, require: true},
            type:   {  type: String },
        },
        data() {
            return {
                readerLocal: this.reader,
            }
        },
        methods: {
            submitReader() {
                this.$emit('submit:reader', this.readerLocal);
            },
            deleteReader() {
                this.$emit('delete:reader', this.readerLocal._id);
            }
        },
    }
</script>