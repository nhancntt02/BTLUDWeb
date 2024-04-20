<template>
    <Header></Header>
    <InfoData :datas="this.datas"/>
    <Footer></Footer>
</template>
<script>
import BookService from "../services/flowBook.service";
import InfoData from "@/components/InfoLib.vue"
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
export default {
    components: {
        Header,
        InfoData,
        Footer
    },
    data() {
        return {
            datas: [],

        };
    },
    computed: {
        dataToStrings() {
            return this.datas.map((data) => {
                const {_id, madocgia, masach, ngaytra } = data;
                return [_id, madocgia, masach, ngaytra ].join("");
            });
        },
    },
    methods: {
        async retrieveBooks() {
            try {
                this.datas = await BookService.getAll();
                console.log("Data from server", this.datas);
            } 
            catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.retrieveBooks();
        },
    },
    mounted() {
        if(!sessionStorage.getItem('userName')){
            this.$router.push('/login');
        }
        console.log(sessionStorage.getItem('userName'));
        this.refreshList();
    },
};
</script>
<style scoped>
.page {
   text-align: left;
   max-width: 750px;
}
</style>