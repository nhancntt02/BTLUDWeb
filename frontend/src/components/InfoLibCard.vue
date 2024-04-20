<template>
    <td>{{ index + 1 }}</td>
    <td>{{ reader.holot }} {{ reader.ten }}</td>
    <td>{{ book.tensach }}</td>
    <td>{{ data.ngaymuon }}</td>
    <td>{{ data.ngaytra }}</td>
</template>
<script>
    import readerService from '@/services/reader.service';
    import bookService from '@/services/book.service';
    export default {
        props: {
            data: { type: Object, require: true},
            index: { type: Number}
        },
        data() {
            return {
                reader: {},
                book: {}
            };
        },
        methods: {
            async getData() {
                this.reader = await readerService.get(this.data.madocgia);
                this.book = await bookService.get(this.data.masach);
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>