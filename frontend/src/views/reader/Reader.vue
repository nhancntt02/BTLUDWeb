<template>
    <Header></Header>
    <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
    <ReaderList :datas="this.datas" v-model:activeIndex="activeIndex">

    </ReaderList>
    <div class="mt-3 row justify-content-around agign-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
        </button>
        <button 
            class="btn btn-sm btn-success"
            @click="goToAddReader"
        >
            <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button
            class="btn btn-sm btn-danger"
            @click="removeAllReaders"
        >
            <i class="fas fa-trash"></i>  Xóa tất cả
        </button>
        <button
            v-if="activeReader"
            class="btn btn-sm btn-warning"
            @click="gotoEditReader"
        >
            <i class="fas fa-edit"></i>  Chỉnh sửa
        </button>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import ReaderList from '../../components/ReaderList.vue';
import ReaderService from '@/services/reader.service';
export default {
    components: {
        Header,
        ReaderList,
    },
    data() {
        return {
            datas: [],
            activeIndex: -1
        }
    },
    computed: {
        filtered() {
           return this.datas;
        },
        activeReader() {
            if (this.activeIndex < 0) {
                return null;
            }
            return this.filtered[this.activeIndex];
  
        },
    },
    
    methods: {
        async retrieve() {
            try {
                this.datas = await ReaderService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieve();
            this.activeIndex = -1;
            
        },
        gotoEditReader() {
            this.$router.push({ name: "edit_reader", params: { id: this.activeReader._id}});
        },
        goToAddReader() {
            this.$router.push({name: 'add_reader'});
        },
        async removeAllReaders() {
            try {
                if(confirm("Bạn chắc chắn muốn xóa tất cả độc giả?")) {
                    await  ReaderService.deleteAll();
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