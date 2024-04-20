<template>
    <div class="page">
        <h4>Hiệu chỉnh sách</h4>
        <PubliserForm
            :data="this.data"
            :type="this.type"
            @submit:data="updateData"
            @delete:data="deleteData"
        />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import PubliserForm from '@/components/PubliserForm.vue';
import PubliserService from '@/services/publiser.service';
export default {
    components: {
        PubliserForm
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
        async getPublisher(id) {
            try { 
                this.data = await PubliserService.get(id); 
            } catch (error) {
                console.log(error);
            }
        },

        async updateData(data) {
            try {
                await PubliserService.update(this.data._id, data);
                this.message = "Sách được cập nhật thành công.";
                this.$router.go(-1);
            } catch (error) {
                console.log(error);
            }
        },

        
        async deleteData() {
            if (confirm("Bạn muốn xóa nhà phát hành này?")) {
                try {
                    console.log('aaaaaaaa');
                    await PubliserService.delete(this.data._id);
                    this.$router.push({ name: "homePage" });
                } catch (error) {
                    console.log(error);
                }
            }
        },
        
    },
    created() {
        this.getPublisher(this.id),
        this.message = ""
    },
};
</script>