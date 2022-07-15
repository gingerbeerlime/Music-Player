<template>
    <div id="tab-box">
            <!-- tab buttons -->
            <div class="tab-btns-bg"></div>
            <input
                @click="changeTab($event)"
                type="radio"
                name="playlist"
                id="tab1"
                checked
            >
            <label for="tab1" class="tab-btn btn-list-all">
                <p>곡<span>{{ $store.getters.getTotalMusicCount }}</span></p>
            </label>
            <input
                @click="changeTab($event)"
                type="radio"
                name="playlist"
                id="tab2"
            >
            <label for="tab2" class="tab-btn btn-list-created">
                <p>플레이리스트</p>
            </label>

            <!-- tab1) default playlist -->
            <default-playlist-tab class="play-list-all"></default-playlist-tab>
            <!-- tab2) my playlists -->
            <my-playlist-tab class="play-list-created"></my-playlist-tab>
        </div>
</template>

<script>
import DefaultPlaylistTab from './DefaultPlaylistTab.vue'
import MyPlaylistTab from './MyPlaylistTab.vue'

export default {
    methods: {
        changeTab (event) {
            const tabId = event.target.getAttribute('id')
            this.$store.commit('changeTab', { tabId })
        }
    },
    components: {
        DefaultPlaylistTab,
        MyPlaylistTab
    }
}
</script>

<style scoped>
#tab-box {
    width: 100%;
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
/* tab buttons */
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
/* section: play list */
#tab-box > .play-list-all,
#tab-box > .play-list-created {
    width: 100%;
    height: 287px;
    position: absolute;
    top: 50px;
    left: 0;
    overflow: hidden;
}
/* default */
.play-list-all {
    display: none;
    z-index: 500;
}
/* my playlists */
.play-list-created {
    display: none;
    z-index: 800;
}
#tab1:checked ~ .play-list-all {
    display: block;
}
#tab2:checked ~ .play-list-created {
    display: block;
}
</style>
