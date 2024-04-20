<template>
    <Header></Header>
    <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
    <BookList 
        :datas="this.datas"
        v-model:activeIndex="activeIndex"
    >
    </BookList>
    <!-- ----------------------------------------------------------------- -->
    <div class="mt-3 row justify-content-around agign-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
        </button>
        <button 
            class="btn btn-sm btn-success"
            @click="goToAddBook"
        >
            <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button
            class="btn btn-sm btn-danger"
            @click="removeAllBooks"
        >
            <i class="fas fa-trash"></i>  Xóa tất cả
        </button>
        <button
            v-if="activeBook"
            class="btn btn-sm btn-warning"
            @click="gotoEditBook"
        >
            <i class="fas fa-edit"></i>  Chỉnh sửa
        </button>
    </div>
        
    <!-- ----------------------------------------------------------------- -->
</template>
<script>
import Header from "@/components/Header.vue";
import BookList from '../../components/BookList.vue';
import BookService from '../../services/book.service';
export default {
    components: {
        Header,
        BookList,
    },
    data() {
        return {
            datas: [],
            activeIndex: -1,
        }
    },
    computed: {
        filteredPublisers() {
           return this.datas;
        },

        activeBook() {
            if (this.activeIndex < 0) {
                return null;
            }
            return this.filteredPublisers[this.activeIndex];
  
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                    this.datas = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveBooks();
            this.activeIndex = -1;
        },
        gotoEditBook() {
            this.$router.push({ name: "edit-book", params: { id: this.activeBook._id}});
        },
        goToAddBook() {
            this.$router.push({name: 'add_book'});
        },
        async removeAllBooks() {
            try {
                if(confirm("Bạn muốn xóa tất cả sách?") ){
                    await BookService.deleteAll();
                    alert("Xoá thành công");
                } 
            } catch (error) {
                console.log(error);
            }
        },
        backPage() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.refreshList();
    }
}
</script>