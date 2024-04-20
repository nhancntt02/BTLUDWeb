<template>
    <ul class="list-group" style="width: 30%;"> 
        <li class="list-group-item font-weight-bold">
            Nhà xuất bản - Địa chỉ
        </li>
    </ul>
    <ul class="list-group" style="width: 30%; height: 300px; overflow: auto;">
        <li 
            class="list-group-item"
            v-for="(data, index) in datas"
            :key="data.id"
            :class="{ 'active': index === activeIndex}"
            @click="updateActiveIndex(index)"
        >
            {{ data.tennxb }} -  {{ data.diachi }}
        </li>
    </ul>
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