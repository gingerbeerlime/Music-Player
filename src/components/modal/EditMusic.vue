<template>
    <div class="modal-tab1">
        <p class="selected-music-count">
            선택된 <span>{{ checkedMusicCount }}</span> 곡을
        </p>
        <ul class="btns-group">
            <li></li>
            <li
                @click="showAddModal"
                class="btn-add"
            >
                <i class="fa-solid fa-plus"></i>
            </li>
            <li
                @click="showDeleteModal"
                class="btn-delete"
            >
                <i class="fa-regular fa-trash-can"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        showDeleteModal () {
            this.$store.commit('showDeleteModal')
        },
        showAddModal () {
            this.$store.commit('showAddModal')
        }
    },
    computed: {
        checkedMusicCount: function () {
            return this.$store.state.checkedMusicList.length
        }
    }
}
</script>

<style scoped>
.modal-tab1 {
    display: flex;
    width: 275px;
    height: 50px;
    background-color: var(--modal-bg-gray);
    position: absolute;
    bottom: 8px;
    left: 15px;
    z-index: 700;
    border-radius: 10px;
}
.selected-music-count {
    width: 50%;
    font-size: 14px;
    color: var(--font-point-white);
    line-height: 50px;
    text-align: center;

}
.selected-music-count > span {
    color: var(--point-green);
}
.modal-tab1 .btns-group {
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    padding: 0 10px;
}
.modal-tab1 .btns-group li {
    width: 33%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.modal-tab1 .btns-group li > i {
    font-size: 14px;
    color: var(--font-gray);
}
.modal-tab1 .btns-group li:hover > i {
    color: var(--font-point-white);
    transition: 0.02s all ease;
}
</style>
