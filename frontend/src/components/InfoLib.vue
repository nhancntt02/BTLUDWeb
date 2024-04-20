<template>
    <table class="table table-bordered">
        <thead>
            <tr class="table-secondary">
                <th scope="col">STT</th>
                <th scope="col">Tên độc giả</th>
                <th scope="col">Sách</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
            </tr>
        </thead>
        <tbody style="height: 200px; overflow: auto;">
            <tr
                v-for="(data, index) in datas" :key="data._id"
                
            >
                <InfoCard :data="data" :index="index"></InfoCard>
            </tr>
        </tbody>
    </table>
</template>
<script>
    import InfoCard from './InfoLibCard.vue'
    export default {
        components: {
            InfoCard,
        },
        props: {
            datas: { type: Array, require: true }
        },
    }
</script>