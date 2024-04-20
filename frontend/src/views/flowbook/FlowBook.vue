<template>
    <Header></Header>
    <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
    <FlowBookList :datas="this.datas" v-model:activeIndex="activeIndex">

    </FlowBookList>
    <div class="mt-3 row justify-content-around agign-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
        </button>
        <button 
            class="btn btn-sm btn-success"
            @click="goToAdd"
        >
            <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button
            class="btn btn-sm btn-danger"
            @click="removeAll"
        >
            <i class="fas fa-trash"></i>  Xóa tất cả
        </button>
        <button
            v-if="active"
            class="btn btn-sm btn-warning"
            @click="gotoEdit"
        >
            <i class="fas fa-edit"></i>  Chỉnh sửa
        </button>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import FlowBookList from '../../components/FlowBookList.vue';
import FlowBookService from '@/services/flowBook.service';
export default {
    components: {
        Header,
        FlowBookList,
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
        active() {
            if (this.activeIndex < 0) {
                return null;
            }
            return this.filtered[this.activeIndex];
  
        },
    },
    methods: {
        async retrieve() {
            try {
                this.datas = await FlowBookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieve();
            this.activeIndex = -1;
        },
        gotoEdit() {
            this.$router.push({ name: "edit", params: { id: this.active._id}});
        },
        goToAdd() {
            this.$router.push({name: 'add'});
        },
        async removeAll() {
            try {
                if(confirm("Bạn chắc chắn muốn xóa tất cả dữ liệu?")) {
                    await FlowBookService.deleteAll();
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