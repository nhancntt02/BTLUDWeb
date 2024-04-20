<template>
    <footer class="mt-3 row justify-content-around agign-items-center">
        <button class="btn btn-sm btn-info" @click="gotoBook()">
            <i class="fas fa-book"></i> Quản lý sách
        </button>
        <button class="btn btn-sm btn-info" @click="gotoPubliser()">
            <i class="fas fa-star"></i> Quản lý nhà xuất bản
        </button>
        <button class="btn btn-sm btn-info" @click="gotoReader()">
            <i class="fas fa-user"></i> Quản lý độc giả
        </button>
        <button class="btn btn-sm btn-info" @click="gotoFlowBook()">
            <i class="fas fa-bookmark"></i> Quản lý mượn sách
        </button>
    </footer>
</template>
<script>
export default {
    methods: {
        gotoBook() {
            this.$router.push({name:'list_books'})
        },
        gotoPubliser() {
            this.$router.push({name:'list_publisers'})
        },
        gotoReader() {
            this.$router.push({name:'list_readers'})
        },
        gotoFlowBook() {
            this.$router.push({name:'flow_books'})
        }
    }
}
</script>