<template>
    <div class="page">
        <h4>Thêm độc giả</h4>
        <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
        <ReaderForm
            :reader="this.reader"
            @submit:reader="addReader"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import ReaderForm from '@/components/ReaderForm.vue';
    import ReaderService from '@/services/reader.service';

    export default {
        components: {
            ReaderForm,
        },
        data() {
            return {
                reader: {},
                message: ""
            };
        },
        methods: {
            async addReader(data) {
                try {
                    await ReaderService.create(data);
                    this.message = "Đã thêm đọc giả mới";
                } catch(e) {
                    console.log(e);
                }
            },
            backPage() {
                this.$router.go(-1);
            }
        }
    }
</script>