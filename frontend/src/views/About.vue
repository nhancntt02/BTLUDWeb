<template>
    <Header></Header>
    <hr>
    <button class="btn btn-sm btn-secondary mb-2 px-4" @click="backPage"><i class="fas fa-arrow-left"></i></button>
    <h1 class="text-center my-3">Thông tin nhân viên</h1>
    <table class="table table-bordered" style="width: 400px;  margin: auto;">
        <tr>
            <th>Họ tên:</th>
            <td>{{ staff.hoten }}</td>
        </tr>
        <tr>
            <th>Chức vụ:</th>
            <td>{{ staff.chucvu }}</td>
        </tr>
        <tr>
            <th>Địa chỉ:</th>
            <td>{{ staff.diachi }}</td>
        </tr>
        <tr>
            <th>Số điện thoại:</th>
            <td>{{ staff.sdt }}</td>
        </tr>
    </table>
    <div class="d-flex justify-content-end">
       <button @click="addUser" class="btn btn-primary"><i class="fas fa-plus"></i> Thêm nhân viên</button> 
    </div>
    
</template>
<script>
    import employeeService from "@/services/employee.service";
    import Header from "@/components/Header.vue";
    export default {
        components: {
            Header,
        },
        data() {
            return {
                staff: {},
            }
        },
        methods: {
            async getStaff(id) {
                try {
                    this.staff = await employeeService.get(id);
                } catch (error) {
                    console.log(error)
                }
                
            },
            backPage() {
                this.$router.go(-2);
            },
            addUser() {
                if(confirm("Là tài khoản admin mới thêm nhân viên được")){
                    if(sessionStorage.getItem('userName')  != "admin"){
                        alert("Bạn không có quyền truy cập chức năng này");
                        this.$router.push('/');
                    }else {
                        this.$router.push('addstaff');
                    }
                }
            }

            
        },
        created() {
            this.getStaff(sessionStorage.getItem('userName'));
        }
    }
</script>