<template>
    <div class="row m-2 p-2">
        <router-link class="col-2"  to="/">
            <h1><i class="fas fa-home"></i></h1> 
        </router-link>
        <div class="col-2">
            <a href="#" @click="logout()"><h1><i class="fa-solid fa-right-from-bracket"></i></h1></a>
        </div>
        <div class="col-6">
            <h1 class="text-center"> Quản lý mượn sách </h1>
        </div>
        <div class="col-2">
            <a href="#" @click="about()"><h1><i class="fas fa-user"></i></h1></a>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            logout(){
                sessionStorage.removeItem('userName');
                this.$router.push('/');
                location.reload();
            },
            about(){
                this.$router.push('about');
            }

        },
    }
    
</script>