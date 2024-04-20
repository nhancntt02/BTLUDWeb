<template>
    <div class="page">
        <h4>Hiệu chỉnh sách</h4>
        <BookForm
            :book="this.book"
            :type="this.type"
            @submit:book="updateBook"
            @delete:book="deleteBook"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import BookForm from '@/components/BookForm.vue';
    import BookService from '@/services/book.service';
    

    export default {
        components: {
            BookForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                book: null,
                message: "",
                type: "edit"
            };
        },
        methods: {
            async getBook(id) {
                try {
                    
                    this.book = await BookService.get(id); 
                } catch (error) {
                    console.log(error);
                    // this.$router.push({
                    //     name: "notfound",
                    //     params: {
                    //         pathMatch: this.$router.path.split("/").slice(1)
                    //     },
                    //     query: this.$router.query,
                    //     hash: this.$router.hash,
                    // });
                }
            },

            async updateBook(data) {
                try {
                    await BookService.update(this.book._id, data);
                    this.message = "Sách được cập nhật thành công.";
                    this.$router.go(-1);
                } catch (error) {
                    console.log(error);
                }
            },

            async  deleteBook() {
                if (confirm("Bạn muốn xóa sách này?")) {
                    try {
                        await BookService.delete(this.book._id);
                        this.$router.push({ name: "homePage" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getBook(this.id),
            this.message = "";
        },
    };
</script>