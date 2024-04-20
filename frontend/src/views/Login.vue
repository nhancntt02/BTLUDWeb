<template>
    <h1 class=" text-center">Đăng nhập</h1>
    <form class="border border-solid p-3" style="width: 500px; margin: auto;">
        <div class="form-group">
            <label for="username">Mã nhân viên:</label>
            <input type="text" class="form-control" id="username" v-model="User.username">
        </div>
        <div class="form-group">
            <label for="password">Mật khẩu:</label>
            <input type="password" class="form-control" id="password" v-model="User.password">
        </div>
        <button @click.prevent="login()" class="btn btn-primary">Đăng nhập</button>
        <p class="text-danger">{{ message }}</p>
    </form>
</template>
<script>
    import EmployeeService from '@/services/employee.service';
    export default {
        data(){
            return{
                User: {
                    username: '',
                    password: ''
                },
                message: ''
            }
        },
        methods: {
            async login() {
                try {
                    const user = await EmployeeService.login(this.User);
                    sessionStorage.setItem('userName', this.User.username);
                    this.$router.push('/');                
                } catch (error) {
                    this.message = "Mật khẩu hoặc tài khoản không đúng";
                    console.log(error);
                }

            }
        }

    }
</script>