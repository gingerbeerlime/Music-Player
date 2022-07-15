<template>
    <section>
        <!-- 플레이리스트의 목록보기 -->
        <my-playlists-view
            v-if="listViewMode"
            class="playlist-list"
        ></my-playlists-view>
        <!-- 플레이리스트의 재생리스트 -->
        <playing-list
            v-else
            class="playlist-play"
        ></playing-list >
    </section>
</template>

<script>
import MyPlaylistsView from './MyPlaylistsView.vue'
import PlayingList from './PlayingList.vue'

export default {
    computed: {
        listViewMode: function () {
            let listMode
            if (this.$store.state.showPlaylist === '') listMode = true
            else listMode = false
            return listMode
        }
    },
    components: {
        MyPlaylistsView,
        PlayingList
    }
}
</script>

<style>

</style>
