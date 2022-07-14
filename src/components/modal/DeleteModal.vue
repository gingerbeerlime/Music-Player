<template>
    <div class="modal-tab3 modal-layer">
        <div class="modal-box">
            <header>
                <p>{{ checkedMusicCount }}곡을 재생목록에서 삭제하시겠습니까?</p>
            </header>
            <ul class="btns-group">
                <li @click="deleteMusic">확인</li>
                <li @click="closeDeleteModal">취소</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeDeleteModal () {
            this.$store.commit('closeDeleteModal')
        },
        deleteMusic () {
            this.$store.commit('deleteMusic')
        }
    },
    computed: {
        checkedMusicCount: function () {
            return this.$store.getters.getCheckedMusicList.length
        }
    }
}
</script>

<style scoped>
.modal-tab3 {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 800;
}
.modal-tab3 .modal-box {
    display: flex;
    width: 275px;
    height: 120px;
    background-color: var(--modal-bg-gray);
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -60px 0 0 -137.5px;
    z-index: 810;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
}
/* header */
.modal-tab3 .modal-box > header {
    width: 100%;
    height: 67px;
}
.modal-tab3 .modal-box > header > p {
    font-size: 14px;
    color: var(--font-point-white);
    text-align: center;
    line-height: 58px;
    margin-top: 7px;
}
/* buttons(okay, cancel) */
.modal-tab3 .btns-group {
    width: 62.5%;
    height: 26px;
    display: flex;
    justify-content: space-between;
}
.modal-tab3 .btns-group li {
    width: 80px;
    height: 26px;
    font-size: 13px;
    line-height: 26px;
    color: var(--font-gray);
    border: 1px solid var(--font-gray);
    border-radius: 30px;
    text-align: center;
    cursor: pointer;
}
.modal-tab3 .btns-group li:hover {
    border: 1px solid var(--font-point-white);
    color: var(--font-point-white);
    transition: 0.02s all ease;
}
</style>
