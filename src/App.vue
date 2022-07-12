<template>
    <div id="wrap">
        <div id="player">
            <tool-bar></tool-bar>
            <music-view></music-view>
            <player-control></player-control>
            <music-list></music-list>
            <create-playlist></create-playlist>
            <music-control v-if="$store.state.checkedMusic.length"></music-control>
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

export default {
    computed: {
        checkedMusicCount: function () {
            return this.$store.state.checkedMusic.length
        }
    },
    components: {
        ToolBar,
        MusicView,
        PlayerControl,
        MusicList,
        CreatePlaylist,
        MusicControl
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
</style>
