<template>
    <ul class="list-group" style="width: 60%;"> 
        <li class="list-group-item font-weight-bold">
            Tên sách - Nhà xuất bản - Tác giả
        </li>
    </ul>
    <ul class="list-group" style="height: 300px; width: 60%; overflow: auto;">
        <li 
            class="list-group-item"
            
            v-for="(data, index) in datas"
            :key="data.id"
            :class="{ 'active': index === activeIndex}"
            @click="updateActiveIndex(index)"
        >   
            <div v-for="nxb in dsnxb">
                <p v-if="nxb._id == data.manxb">
                   {{ data.tensach }} -  {{ nxb.tennxb }} - {{ data.tacgia }} 
                </p>
            </div>
            
        </li>
    </ul>
</template>
<script>
import PubliserService from '@/services/publiser.service';
export default {
    data() {
        return {
            dsnxb: [],
        }
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
        async getdsnxb(){
            try{
                this.dsnxb = await PubliserService.getAll();

            } catch (e){
                console.log(e)
            }
        }
    },
    created() {
        this.getdsnxb();
    }
}
</script>