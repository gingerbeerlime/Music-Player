<template>
    <div id="wrap">
        <div id="player">
            <tool-bar></tool-bar>
            <music-view></music-view>
            <player-control></player-control>
            <music-list></music-list>
            <create-playlist></create-playlist>
            <transition name="slide" appear>
                <music-control v-if="$store.state.checkedMusicList.length"></music-control>
            </transition>
            <transition name="fade" appear>
                <delete-modal v-if="$store.state.deleteModal"></delete-modal>
            </transition>
        </div>
    </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'
import MusicView from './views/MusicView.vue'
import PlayerControl from './views/PlayerControl.vue'
import MusicList from './views/MusicList.vue'
import CreatePlaylist from './components/modal/CreatePlaylist.vue'
import MusicControl from './components/modal/MusicControl.vue'
import DeleteModal from './components/modal/DeleteModal.vue'

export default {
    created () {
        this.$store.commit('setMusicList')
    },
    components: {
        ToolBar,
        MusicView,
        PlayerControl,
        MusicList,
        CreatePlaylist,
        MusicControl,
        DeleteModal
    }
}
</script>

<style>
@import url('./css/reset.css');

/* common colors */
:root {
    --point-green: #1EE13C;
    --bg-black: #191919;
    --selected-bg-gray: rgba(51, 51, 51);
    --selected-bg-gray-opacity: rgba(51, 51, 51, 0.7);
    --font-gray: #B9B9B9;
    --font-point-white: #F2F2F2;
    --modal-bg-gray: #3C3C3C;
    --modal-input-bg-gray: #424242
}

body {
    margin: 0;
    padding: 0;
}
#wrap {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
/* [player contianer] */
#player {
    width: 305px;
    height: 720px;
    background-color: var(--bg-black);
    overflow: hidden;
    padding-bottom: 10px;
    box-shadow: 0 0 6px #444;
    position: relative;
}
/* 모달 트랜지션 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
