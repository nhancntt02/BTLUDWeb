<template>
    <div class="page">
        <h4>Hiệu chỉnh thông tin độc giả</h4>
        <ReaderForm
            :reader="this.reader"
            :type="this.type"
            @submit:reader="updateReader"
            @delete:reader="deleteReader"
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
        props: {
            id: { type: String, required: true},
        },
        data() {
            return {
                reader: null,
                type: 'edit',
                message: '',
            };
        },
        methods: {
            async getReader(id) {
                try {
                    this.reader = await ReaderService.get(id);
                    console.log(this.reader);
                } catch(e) {
                    console.log(e);
                }
            },

            async updateReader(data) {
                try {
                    await ReaderService.update(this.reader._id, data);
                    this.$router.go(-1);
                } catch(e) {
                    console.log(e);
                }
            },

            async deleteReader() {
                if(confirm('Are you sure to delete?')){
                    try {
                        await ReaderService.delete(this.reader._id);
                        this.$route.go(-1);
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        },
        created() {
            this.getReader(this.id),
            this.message = "";
        }
    }
</script>