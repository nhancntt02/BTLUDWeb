<template>
    <div class="page">
        <h4>Hiệu chỉnh sách</h4>
        <FlowBookForm
            :data="this.data"
            :type="this.type"
            @submit:data="update"
            @delete:data="delete"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
    import FlowBookForm from '@/components/FlowBookForm.vue';
    import FlowBookService from '@/services/flowBook.service';

    export default {
        components: {
            FlowBookForm
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                data: null,
                message: "",
                type: "edit"
            };
        },
        methods: {
            async getData(id) {
                try {
                    this.data = await FlowBookService.get(id);
                } catch(e) {
                    console.log(e);
                }
            },
            async update(data) {
                try {
                    await  FlowBookService.update(this.data._id, data);
                    this.$router.go(-1);
                } catch (error) {
                    console.log(error);
                }
            },
            async delete() {
                if(confirm("Bạn có muốn xóa dữ liệu này")) {
                    try {
                        await FlowBookService.delete(this.data._id);
                        this.$router.go(-1);
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getData(this.id),
            this.message = "";
        }
    }
</script>