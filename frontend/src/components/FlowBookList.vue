<template>
    <table class="table table-bordered">
        <thead>
            <tr class="table-secondary">
                <th scope="col">STT</th>
                <th scope="col">Nhân viên</th>
                <th scope="col">Độc giả</th>
                <th scope="col">Sách</th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(data, index) in datas"
                :class="{ 'table-info': index === activeIndex}"
                :key="data.id"
                @click="updateActiveIndex(index)"
            >
                <FlowBookCard :data="data" :index="index"></FlowBookCard>
            </tr>
        </tbody>
    </table>
    <!-- <ul class="list-group">
        <li 
            class="list-group-item"
            style="width: 70%;"
            v-for="(data, index) in datas"
            :key="data.id"
            :class="{ 'active': index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            <FlowBookCard :data="data" :index="index"></FlowBookCard>
        </li>
    </ul> -->
</template>
<script>
    import FlowBookCard from './FlowBookCard.vue';
    export default {
        components: {
            FlowBookCard,
        },
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