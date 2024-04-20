<template>
    <td>{{ index + 1 }}</td>
    <td>{{ staff.hoten }}</td>
    <td>{{ reader.holot }} {{ reader.ten }}</td>
    <td>{{ book.tensach }}</td>
</template>
<script>
    import readerService from '@/services/reader.service';
    import bookService from '@/services/book.service';
    import employeeService from '@/services/employee.service';
    export default {
        props: {
            data: { type: Object, require: true},
            index: { type: Number}
        },
        data() {
            return {
                reader: {},
                book: {},
                staff: {}
            };
        },
        methods: {
            async getData() {
                try {
                    this.reader = await readerService.get(this.data.madocgia);
                    this.book = await bookService.get(this.data.masach);
                    this.staff = await employeeService.get(sessionStorage.getItem('userName'));
                } catch (error) {
                    console.log(error);
                }
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>