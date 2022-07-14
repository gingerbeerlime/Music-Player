<template>
    <section>
        <!-- [2-2-1] 플레이리스트의 리스트 -->
        <div class="playlist-list" v-if="listViewMode">
            <header
                @click="showCreateModal"
            >
                <p class="btn-create">
                    <i class="fa-solid fa-circle-plus"></i>
                    새 플레이리스트 만들기
                </p>
            </header>
            <ul class="list-box">
                <!-- markup(temp) -->
                <li>
                    <div class="thumb-img">
                        <img src="../assets/img/thumb/default_image.jpg" alt="playlist_thumbnail">
                    </div>
                    <p class="playlist-name">요즘 많이 듣는 곡</p>
                    <span class="music-count">10</span>
                    <div class="go-playlist">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </li>
                <li
                    v-for="playlist in myPlaylistsInfo"
                    :key="playlist.playlistName"
                    @click="showPlaylist(playlist.playlistName)"
                >
                    <div class="thumb-img">
                        <img :src="require('@/assets/img/thumb/' + playlist.imgUrl + '.jpg')" alt="playlist_thumbnail">
                    </div>
                    <p class="playlist-name">{{ playlist.playlistName }}</p>
                    <span class="music-count">{{ playlist.totalMusicCount }}</span>
                    <div class="go-playlist">
                        <i class="fa-solid fa-play"></i>
                    </div>
                </li>
            </ul>
        </div>
        <!-- [2-2-2] 플레이리스트 재생리스트 -->
        <div class="playlist-play" v-else>
            <header class="btns-container">
                <label class="checkbox-wrap">
                    <input
                        @click="toggleCheckAll"
                        :checked="$store.state.checkedAll"
                        type="checkbox"
                        class="check-btn"
                        id="check-btn-all"
                    />
                    <div class="icons-check">
                        <div class="icon-small-square"></div>
                        <i class="fa-solid fa-check"></i>
                    </div>
                </label>
                <p class="music-count">
                    전체선택
                </p>
                <!-- 다른 부분1 -->
                <p class="return" @click="returnToPlaylist">
                    <i class="fa-solid fa-bars"></i>
                    플레이리스트 보기
                </p>
                <!-- 다른 부분1 -->
            </header>
            <ul class="list-box">
                <li
                    v-for="(item, index) in getCurrentPlaylist"
                    :key="item.key"
                    @dblclick="changeMusic(item, index)"
                    @click="selectMusic(item)"
                    :class="{'_click': $store.state.selectedMusic === item, 'playing-now': $store.getters.getCurrentMusic === item}"
                >
                <!-- checkbox -->
                <label class="checkbox-wrap">
                    <input
                        @click="toggleCheck(item)"
                        type="checkbox"
                        class="check-btn"
                        :checked="checkedMusicList.includes(item)"
                    />
                    <div class="icons-check">
                        <div class="icon-small-square"></div>
                        <i class="fa-solid fa-check"></i>
                    </div>
                </label>
                    <!-- music title -->
                    <p class="title">
                        <audio-visual-icon
                            v-if="$store.state.play && $store.getters.getCurrentMusic === item"
                        ></audio-visual-icon>
                        {{ item.title }}
                    </p>
                    <!-- artist -->
                    <p class="artist">{{ item.artist }}</p>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import AudioVisualIcon from '../components/icon/AudioVisualIcon.vue'

export default {
    methods: {
        toggleCheck (item) {
            this.$store.commit('toggleCheck', { item })
            // this.$emit('toggle', { item })
        },
        toggleCheckAll () {
            this.$store.commit('toggleCheckAll')
        },
        changeMusic (item, index) {
            this.$store.commit('changeMusic', { item, index })
            this.$store.commit('startMusic')
        },
        selectMusic (item) {
            this.$store.commit('selectMusic', { item })
        },
        showCreateModal () {
            this.$store.commit('showCreateModal')
        },
        showPlaylist (name) {
            console.log('11')
            this.$store.commit('showPlaylist', { name })
        },
        returnToPlaylist () {
            this.$store.commit('returnToPlaylist')
        }
    },
    computed: {
        myPlaylists: function () {
            return this.$store.getters.getMyPlaylists
        },
        checkedMusicList: function () {
            return this.$store.getters.getCheckedMusicList
        },
        myPlaylistsInfo: function () {
            const infoBox = []
            for (let i = 0; i < this.myPlaylists.length; i++) {
                const list = this.myPlaylists[i]
                const name = list[0][0]
                const count = list[1].length
                const thumbnail = list[2]
                const info = { playlistName: name, totalMusicCount: count, imgUrl: thumbnail }
                infoBox.push(info)
            }
            return infoBox
        },
        listViewMode: function () {
            let listMode
            if (this.$store.state.viewPlaylist === '') listMode = true
            else listMode = false
            return listMode
        },
        getCurrentPlaylist: function () {
            const playlistName = this.$store.state.viewPlaylist
            const allPlaylists = this.$store.state.myPlaylists
            let currentPlaylist
            for (let i = 0; i < allPlaylists.length; i++) {
                if (allPlaylists[i][0][0] === playlistName) {
                    currentPlaylist = allPlaylists[i][1]
                    break
                }
            }
            return currentPlaylist
        }
    },
    components: {
        AudioVisualIcon
    }
}
</script>

<style scoped>
/* [2-2] tab2) 생성한 음악 리스트 */
/* [2-2-1] 플레이리스트의 리스트 뷰 부분 */
.play-list-created .playlist-list {
    width: 100%;
    height: 100%;
}
/* header */
.play-list-created .playlist-list > header {
    width: 100%;
    height: 37px;
}
.play-list-created .playlist-list > header .btn-create {
    font-size: 12px;
    color: var(--font-gray);
    line-height: 37px;
    padding-left: 15px;
    cursor: pointer;
}
.play-list-created .playlist-list> header .btn-create:hover {
    color: var(--font-point-white);
    transition: 0.1s all ease;
}
.fa-circle-plus {
    padding-right: 5px;
}
/* listbox */
.play-list-created .playlist-list .list-box {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.play-list-created .playlist-list .list-box li {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    cursor: pointer;
}
.play-list-created .playlist-list .list-box li:hover {
    background-color: var(--selected-bg-gray-opacity);
    transition: 0.02s all ease;
}

.play-list-created .playlist-list .list-box li:last-child {
    margin-bottom: 25px;
}
.play-list-created .playlist-list .thumb-img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
}
.play-list-created .playlist-list .thumb-img > img {
    width: 100%;
}
.play-list-created .playlist-list .playlist-name {
    color: var(--font-gray);
    font-size: 13px;
    line-height: 40px;
    padding-left: 10px;
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.play-list-created .playlist-list .music-count {
    color: var(--font-gray);
    font-size: 11px;
    padding: 2px 6px;
    border: 1px solid var(--font-gray);
    border-radius: 10px;
    margin-left: 5px;
}
.go-playlist {
    width: 50px;
    height: 55px;
    margin-left: auto;
    display: flex;
    align-items: center;
}
.fa-play {
    display: none;
    font-size: 12px;
    color: var(--font-point-white);
}
.play-list-created .list-box li:hover .fa-play {
    display: block;
}
/* 선택 효과 */
.list-box ._click {
    background-color: var( --selected-bg-gray-opacity);
}
.list-box ._click .icon-small-square {
    background-color: rgba(51, 51, 51);
}
/* [2-2-2] 플레이리스트의 노래 리스트 뷰 부분 */
.play-list-created .playlist-play {
    width: 100%;
    height: 100%;
}
/* test */
/* header */
.playlist-play .btns-container {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
}
.playlist-play .music-count {
    font-size: 10.5px;
    font-weight: bolder;
    line-height: 37px;
    color: var(--font-gray);
}
.playlist-play .return {
    font-size: 10.5px;
    font-weight: bolder;
    line-height: 37px;
    color: var(--font-gray);
    cursor: pointer;
    margin-left: auto;
    margin-right: 30px;
}
.playlist-play .return:hover {
    color: var(--font-point-white);
    transition: 0.2s all ease;
}
fa-bars {
    padding-right: 7px;
    cursor: pointer;
}
/* listbox */
.playlist-play .list-box {
    width: 100%;
    height: 247px;
    padding-bottom: 40px;
    overflow: scroll;
}
.playlist-play .list-box > li {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
}
/* music title */
.playlist-play .list-box p {
    color: var(--font-gray);
    font-size: 13px;
    line-height: 37px;
}
.playlist-play .list-box .title {
    display: flex;
    align-items: center;
    width: 150px;
    max-width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.playlist-play .list-box .artist {
    width: 62px;
    max-width: 62px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 30px;
}
/* 재생중 리스트 효과 */
.playlist-play .list-box li.playing-now > p {
    color: var(--point-green);
}
</style>
