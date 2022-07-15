<template>
    <div id="wrap">
        <div id="player">
            <tool-bar></tool-bar>
            <music-view></music-view>
            <player-control></player-control>
            <music-list></music-list>
            <!-- modals -->
            <transition name="slide" appear>
                <edit-music v-if="$store.state.checkedMusicList.length"></edit-music>
            </transition>
            <transition name="fade" appear>
                <delete-modal v-if="$store.state.deleteModal"></delete-modal>
            </transition>
            <create-playlist v-if="$store.state.createModal"></create-playlist>
            <transition name="slide2" appear>
                <add-to-playlist v-if="$store.state.addModal"></add-to-playlist>
            </transition>
            <transition name="fade" appear>
                <add-alert v-if="$store.state.alertModal"></add-alert>
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
import EditMusic from './components/modal/EditMusic.vue'
import DeleteModal from './components/modal/DeleteModal.vue'
import AddToPlaylist from './components/modal/AddToPlaylist.vue'
import AddAlert from './components/modal/AddAlert.vue'

export default {
    created () {
        this.$store.commit('setFetchedMusicList')
    },
    components: {
        ToolBar,
        MusicView,
        PlayerControl,
        MusicList,
        EditMusic,
        DeleteModal,
        CreatePlaylist,
        AddToPlaylist,
        AddAlert
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
#wrap p {
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}
/* [player container] */
#player {
    width: 305px;
    height: 720px;
    background-color: var(--bg-black);
    overflow: hidden;
    padding-bottom: 10px;
    box-shadow: 0 0 6px #444;
    position: relative;
}
/* modal transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
/* slow version */
.slide2-enter-active,
.slide2-leave-active {
  transition: transform 1s cubic-bezier(0.8, 0, 0.5, 1), opacity 0.4s linear;
}

.slide2-enter,
.slide2-leave-to {
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
