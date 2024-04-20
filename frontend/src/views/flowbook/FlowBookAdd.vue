<template>
    <div class="page">
        <h4>Thêm dữ liệu mượn sách</h4>
        <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
        <FlowBookForm
            :data="this.data"
            @submit:data="addData"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import FlowBookForm from '@/components/FlowBookForm.vue';
    import FlowBookService from '@/services/flowBook.service';
    import BookService from '@/services/book.service';

    export default {
        components: {
            FlowBookForm,
        },
        data() {
            return {
                data: {},
                message: ""
            };
        },
        methods: {
            async addData() {
                try {
                    const book = await BookService.get(this.data.masach);
                    if(book.soquyen ){
                       book.soquyen -= 1; 
                       await BookService.update(this.data.masach, book);
                       await FlowBookService.create(this.data);
                        this.message = "Thêm thành công";
                    }
                    this.message = "Sách đã hết";
      
                } catch (error) {
                    console.log(error);
                }
            },
            backPage() {
                this.$router.go(-1);
            }
        }
    }
</script>