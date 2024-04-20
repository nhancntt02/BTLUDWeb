<template>
    <form @submit="submitBook">
        <div class="form-group">
            <label for="id">Mã sách</label>
            <input class="form-control" type="text" name="id" v-model="bookLocal._id">
        </div>
        <div class="form-group">
            <label for="name">Tên sách</label>
            <input class="form-control" type="text" name="name" v-model="bookLocal.tensach">
        </div>
        <div class="form-group">
            <label for="price">Đơn giá</label>
            <input class="form-control" type="text" name="price" v-model="bookLocal.dongia">
        </div>
        <div class="form-group">
            <label for="quantily">Số quyển</label>
            <input class="form-control" type="text" name="quantily" v-model="bookLocal.soquyen">
        </div>
        <div class="form-group">
            <label for="publisher">Nhà sản xuất</label>
            <input class="form-control" type="text" name="publisher" v-model="bookLocal.manxb">
        </div>
        <div class="form-group">
            <label for="author">Tác giả</label>
            <input class="form-control" type="text" name="author" v-model="bookLocal.tacgia">
        </div>
        
    </form>
    <div class="">
        <button class="btn btn-primary" @click="submitBook"><i class="fas fa-save"></i> Lưu</button>
        <button 
            v-if="this.type == 'edit'" 
            type="button"
            class="ml-2 btn btn-danger"
            @click="deleteBook"
        >
        <i class="fas fa-trash"></i> Xóa
        </button>
    </div>
</template>
<script>
export  default {
    props: {
        book: { type: Object, require: true },
        type: { type: String}
    },
    data(){
        return {
            bookLocal: this.book,
        }
    },
    methods: {
        submitBook() {
            this.$emit('submit:book',this.bookLocal);
        },
        deleteBook() {
            this.$emit('delete:book',this.bookLocal._id);
        }

    },
}
</script>