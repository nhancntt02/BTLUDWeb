<template>
    <table class="table table-bordered">
        <thead>
            <tr class="table-secondary">
                <th scope="col">STT</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Giới tính</th>
                <th scope="col">Ngày sinh</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số điện thoại</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="(data, index) in datas"
            :key="data.id"
            :class="{ 'table-info': index === activeIndex}"
            @click="updateActiveIndex(index)"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ data.holot }} {{ data.ten }}</td>
                <td>{{ data.phai }}</td>
                <td>{{ data.ngaysinh }}</td>
                <td>{{ data.diachi }}</td>
                <td>{{ data.dienthoai }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
export default {
    props:{
        datas: { type: Array, default: [] },
        activeIndex: {type: Number, default: -1},
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        },
    },
}
</script>