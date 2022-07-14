<template>
    <div id="tab-box">
            <!-- [1] tab buttons -->
            <div class="tab-btns-bg"></div>
            <input type="radio" name="playlist" id="tab1" checked @click="changeTab($event)">
            <label for="tab1" class="tab-btn btn-list-all">
                <p>곡<span>{{ $store.getters.getTotalMusicCount }}</span></p>
            </label>
            <input type="radio" name="playlist" id="tab2" @click="changeTab($event)">
            <label for="tab2" class="tab-btn btn-list-created">
                <p>플레이리스트</p>
            </label>

            <!-- [2] playing list -->
            <!-- [2-1] 전체 음악 리스트 -->
            <default-playlist class="play-list-all"></default-playlist>
            <created-playlist class="play-list-created"></created-playlist>
        </div>
</template>

<script>
import DefaultPlaylist from '../components/DefaultPlaylist.vue'
import CreatedPlaylist from '../components/CreatedPlaylist.vue'

export default {
    methods: {
        changeTab (event) {
            const tabId = event.target.getAttribute('id')
            this.$store.commit('changeTab', { tabId })
        }
    },
    components: {
        DefaultPlaylist,
        CreatedPlaylist
    }
}
</script>

<style>
#tab-box {
    width: 100%;
    /* 60(button) & 288(list) */
    height: 344px;
    position: relative;
}
.tab-btns-bg {
    width: 165px;
    height: 27px;
    background-color: #070707;
    border-radius: 32px;
    position: absolute;
    top: 13px;
    left: 50%;
    margin-left: -82.5px;
}
/* [1] tab_btns */
input[type="radio"] {
    display: none;
}
.tab-btn {
    display: block;
    height: 27px;
    border-radius: 32px;
    position: absolute;
    top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.btn-list-all {
    width: 60px;
    left: 70px;
}
.tab-btn > p {
    color: var(--font-gray);
    font-size: 12px;
    /* font-weight: bold; */
}
.tab-btn > p > span {
    padding-left: 3px;
}
.btn-list-created {
    width: 105px;
    right: 70px;
}
#tab1:checked + label,
#tab2:checked + label {
    background-color: var(--selected-bg-gray);
}
#tab1:checked + label > p,
#tab2:checked + label > p {
    color: var(--font-point-white);
}
/* [2] section: play list */
#tab-box > .play-list-all,
#tab-box > .play-list-created {
    width: 100%;
    height: 287px;
    position: absolute;
    top: 50px;
    left: 0;
    overflow: hidden;
}
.play-list-all {
    display: none;
    z-index: 500;
}
/* tab2) 생성한 플레이리스트 섹션 */
.play-list-created {
    display: none;
    z-index: 800;
}
/* tab button 선택에 따라 리스트 전환 */
#tab1:checked ~ .play-list-all {
    display: block;
}
#tab2:checked ~ .play-list-created {
    display: block;
}
</style>
