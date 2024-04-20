<template>
    <Header></Header>
    <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
    <PubliserList 
        :datas="this.datas"
        v-model:activeIndex="activeIndex"
    >
    </PubliserList>

    <div class="mt-3 row justify-content-around agign-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
        </button>
        <button 
            class="btn btn-sm btn-success"
            @click="goToAddPubliser"
        >
            <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button
            class="btn btn-sm btn-danger"
            @click="removeAllPublisers"
        >
            <i class="fas fa-trash"></i>  Xóa tất cả
        </button>
        <button
            v-if="activeData"
            class="btn btn-sm btn-warning"
            @click="gotoEditPubliser"
        >
            <i class="fas fa-edit"></i>  Chỉnh sửa
        </button>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import PubliserList from '../../components/PubliserList.vue';
import PubliserService from '../../services/publiser.service';
export default {
    components: {
        Header,
        PubliserList,
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
        activeData() {
            if (this.activeIndex < 0) {
                return null;
            }
            return this.filteredPublisers[this.activeIndex];
        },
    },
    methods: {
        async retrievePublisers() {
            try {
                this.datas = await PubliserService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievePublisers();
            this.activeIndex = -1
        },
        gotoEditPubliser() {
            this.$router.push({ name: "edit-nxb", params: { id: this.activeData._id}});
        },
        goToAddPubliser() {
            this.$router.push({name: 'add-nxb'});
        },
        async removeAllPublisers() {
            try {
                if(confirm("Bạn muốn xóa tất cả nhà sản xuất?")) {
                    await  PubliserService.deleteAll();
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