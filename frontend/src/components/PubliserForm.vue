<template>
    <form >
        <div class="form-group">
            <label for="id">Mã nhà xuất bản</label>
            <input class="form-control" type="text" name="id" v-model="dataLocal._id">
        </div>
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <input class="form-control" type="text" name="name" v-model="dataLocal.tennxb">
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input class="form-control" type="text" name="address" v-model="dataLocal.diachi">
        </div>
    </form>
    <div>
        <button class="btn btn-primary" @click="submitData"><i class="fas fa-save"></i> Lưu</button>
        <button 
            v-if="this.type == 'edit'" 
            type="button"
            class="ml-2 btn btn-danger"
            @click="deleteData"
        >
        <i class="fas fa-trash"></i> Xóa
        </button>
    </div>
</template>
<script>
export  default {
    props: {
        data: { type: Object, require: true },
        type: { type: String}
    },
    data(){
        return {
            dataLocal: this.data,
        }
    },
    methods: {
        submitData() {
            this.$emit('submit:data',this.dataLocal);
        },
        deleteData() {
            this.$emit('delete:data',this.dataLocal._id);
        }

    },
}
</script>