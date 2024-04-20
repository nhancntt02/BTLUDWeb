<template>
    <form>
        <div class="form-group">
            <label for="id">Mã độc giả</label>
            <input class="form-control" type="text" name="id" v-model="dataLocal.madocgia">
        </div>
        <div class="form-group">
            <label for="ms">Mã sách</label>
            <input class="form-control" type="text" name="ms" v-model="dataLocal.masach">
        </div>
        <div class="form-group">
            <label for="nm">Ngày mượn</label>
            <input class="form-control" type="date" name="nm" v-model="dataLocal.ngaymuon">
        </div>
        <div class="form-group">
            <label for="nt">Ngày trả</label>
            <input class="form-control" type="date" name="nt" v-model="dataLocal.ngaytra">
        </div>
    </form>
    <div class="">
        <button class="btn btn-primary" @click="submit"><i class="fas fa-save"></i> Lưu</button>
        <button 
            v-if="this.type == 'edit'" 
            type="button"
            class="ml-2 btn btn-danger"
            @click="delete"
        >
        <i class="fas fa-trash"></i> Xóa
        </button>
    </div>
</template>
<script>
    export default {
        props: {
            data: {  type: Object, require: true},
            type:   {  type: String },
        },
        data() {
            return {
                dataLocal: this.data,
            }
        },
        methods: {
            submit() {
                this.dataLocal.manhanvien = sessionStorage.getItem('userName');
                this.$emit('submit:data', this.dataLocal);
            },
            delete() {
                this.$emit('delete:data', this.dataLocal._id);
            }
        },
    }
</script>