<template>
    <h1 class="text-center">Tạo tài khoản nhân viên</h1>
    <hr/>
    <form>
        <div class="form-group">
            <label for="id">Mã nhân viên</label>
            <input class="form-control" type="text" name="id" v-model="data._id">
        </div>
        <div class="form-group">
            <label for="name">Họ tên</label>
            <input class="form-control" type="text" name="name" v-model="data.hoten">
        </div>
        <div class="form-group">
            <label for="pass">Mật khẩu</label>
            <input class="form-control" type="text" name="pass" v-model="data.password">
        </div>
        <div class="form-group">
            <label for="cv">Chức vụ</label>
            <input class="form-control" type="text" name="cv" v-model="data.chucvu">
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input class="form-control" type="text" name="address" v-model="data.diachi">
        </div>
        <div class="form-group">
            <label for="phone">Số điện thoại</label>
            <input class="form-control" type="text" name="phone" v-model="data.sdt">
        </div>
    </form>
    <button class="btn btn-primary" @click="submit"><i class="fas fa-save"></i> Lưu</button>
</template>
<script>
    import employeeService from "@/services/employee.service";
    export default {
        data() {
            return {
                data: {},
            }
        },
        methods: {
            async submit() {
                try {
                    await employeeService.create(this.data);
                    alert("Thêm nhân viên thành công");
                    this.$router.push('/');
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>