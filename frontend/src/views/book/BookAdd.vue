<template>
    <div class="page">
        <h4>Thêm sách</h4>
        <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
        <BookForm
            :book="this.book"
            @submit:book="addBook"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import BookForm from '@/components/BookForm.vue';
    import BookService from '@/services/book.service.js';
    export default {
        components: {
            BookForm,
        },
        data() {
            return {
                book: {},
                message: "",
            };
        },
        methods: {
            async addBook(data) {
                try {   
                    await BookService.create(data); 
                    this.message = "Thêm sách thành công";
                } catch (error) {
                    console.log(error);
                }
            },
            backPage() {
                this.$router.go(-1);
            }

        },
    };
</script>