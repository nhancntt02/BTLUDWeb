<template>
    <div class="page">
        <h4>Thêm nhà xuất bản</h4>
        <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
        <PubliserForm
            :data="this.data"
            @submit:data="addData"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import PubliserForm  from '@/components/PubliserForm.vue';
import PubliserService from '@/services/publiser.service';
export default {
    components: {
        PubliserForm
    },
    data() {
        return {
            data: {_id: null, tennxb: null, diachi: null},
            message: ""
        };
    },
    methods: {
        async addData(data) {
            try {
                await  PubliserService.create(data);
                this.message = "Thêm thành công";
            } catch (error) {
                console.log(error)
            }
        },
        backPage() {
            this.$router.go(-1);
        }
    }
};
</script>