<template>
    <div>
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
            <p class="music-count">전체선택</p>
            <!-- 다른 부분 -->
            <p
                @click="returnToPlaylist"
                class="return"
            >
                플레이리스트 보기
                <i class="fa-solid fa-bars"></i>
            </p>
            <!-- 다른 부분 -->
        </header>
        <ul class="list-box">
            <li
                v-for="(item, index) in getCurrentPlaylist"
                :key="item.key"
                @dblclick="changeMusic(item, index)"
                @click="selectMusic(item)"
                :class="{
                    '_click': $store.state.selectedMusic === item,
                    'playing-now': $store.getters.getCurrentMusic === item && $store.state.playingPosition === $store.state.currentPosition
                }"
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
                        v-if="$store.state.playStatus && $store.getters.getCurrentMusic === item && $store.state.playingPosition === $store.state.currentPosition"
                    ></audio-visual-icon>
                    {{ item.title }}
                </p>
                <!-- artist -->
                <p class="artist">{{ item.artist }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import AudioVisualIcon from '../../icon/AudioVisualIcon.vue'

export default {
    methods: {
        toggleCheck (item) {
            this.$store.commit('toggleCheck', { item })
        },
        toggleCheckAll () {
            this.$store.commit('toggleCheckAll')
        },
        changeMusic (item, index) {
            if (this.$store.state.playingPosition !== this.$store.state.currentPosition) {
                this.$store.commit('resetCurrentPlaylist', { index })
            }
            this.$store.commit('changeMusic', { item, index })
            this.$store.commit('startMusic')
        },
        selectMusic (item) {
            this.$store.commit('selectMusic', { item })
        },
        returnToPlaylist () {
            this.$store.commit('returnToPlaylist')
        }
    },
    computed: {
        getCurrentPlaylist () {
            const playlistName = this.$store.state.showPlaylist
            const allPlaylists = this.$store.state.myPlaylists
            let currentPlaylist
            for (let i = 0; i < allPlaylists.length; i++) {
                if (allPlaylists[i].name === playlistName) {
                    currentPlaylist = allPlaylists[i].list
                    break
                }
            }
            return currentPlaylist
        },
        checkedMusicList () {
            return this.$store.getters.getCheckedMusicList
        }
    },
    components: {
        AudioVisualIcon
    }
}
</script>

<style scoped>
.play-list-created .playlist-play {
    width: 100%;
    height: 100%;
}
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
    margin-right: 15px;
}
.playlist-play .return:hover {
    color: var(--font-point-white);
    transition: 0.2s all ease;
}
.fa-bars {
    padding-left: 3px;
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
/* checkbox */
input[type="checkbox"] {
    display: none;
}
.checkbox-wrap {
    display: block;
    margin: 0 10px 0 13px;
    position: relative;
    width: 13px;
    height: 13px;
    border: 2px solid #b9b9b96c;
    box-sizing: border-box;
    border-radius: 2px;
    cursor: pointer;
}
.checkbox-wrap .icons-check {
    display: none;
}
.checkbox-wrap .icon-small-square {
    width: 6px;
    height: 8px;
    background-color: var(--bg-black);
    position: absolute;
    top: -2px;
    right: -2px;
    z-index: 200;
}
.checkbox-wrap .fa-check {
    color: var(--point-green);
    font-size: 8px;
    position: absolute;
    top: -1.2px;
    right: -0.5px;
    z-index: 250;
}
.check-btn:checked + .icons-check {
    display: block;
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
/* playing effect */
.playlist-play .list-box li.playing-now > p {
    color: var(--point-green);
}
/* 선택 효과 */
.list-box ._click {
    background-color: var( --selected-bg-gray-opacity);
}
.list-box ._click .icon-small-square {
    background-color: rgba(51, 51, 51);
}
</style>
