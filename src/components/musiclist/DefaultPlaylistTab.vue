<template>
    <section>
        <header class="btns-container">
            <label class="checkbox-wrap">
                <input
                    @click="toggleCheckAll"
                    :checked="$store.state.checkedAll"
                    type="checkbox"
                    id="check-btn-all"
                    class="check-btn"
                />
                <div class="icons-check">
                    <div class="icon-small-square"></div>
                    <i class="fa-solid fa-check"></i>
                </div>
            </label>
            <p class="music-count">전체선택</p>
        </header>
        <!-- empty list -->
        <p
            v-if="$store.state.totalMusicCount === 0"
            class="empty-list-message"
        >
            <i class="fa-solid fa-music"></i>
            리스트가 비어있습니다.
        </p>
        <!-- 음악목록 -->
        <ul class="list-box">
            <li
                v-for="(item, index) in $store.state.fetchedMusicList"
                @dblclick="changeMusic(item, index)"
                @click="selectMusic(item)"
                :key="item.key"
                :class="{'_click': $store.state.selectedMusic === item, 'playing-now': $store.getters.getCurrentMusic === item && $store.state.playingPosition === 'tab1' }"
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
                        v-if="$store.state.playStatus && $store.getters.getCurrentMusic === item && $store.state.playingPosition === 'tab1'"
                    ></audio-visual-icon>
                    {{ item.title }}
                </p>
                <!-- artist -->
                <p class="artist">{{ item.artist }}</p>
            </li>
        </ul>
    </section>
</template>

<script>
import AudioVisualIcon from '../icon/AudioVisualIcon.vue'

export default {
    methods: {
        toggleCheck (item) {
            this.$store.commit('toggleCheck', { item })
        },
        toggleCheckAll () {
            this.$store.commit('toggleCheckAll')
        },
        changeMusic (item, index) {
            if (this.$store.state.currentPosition !== this.$store.state.playingPosition) {
                this.$store.commit('resetDefaultPlaylist')
            }
            this.$store.commit('changeMusic', { item, index })
            this.$store.commit('startMusic')
        },
        selectMusic (item) {
            this.$store.commit('selectMusic', { item })
        }
    },
    computed: {
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
/* header */
.play-list-all .btns-container {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
}
.play-list-all .music-count {
    font-size: 10.5px;
    font-weight: bolder;
    line-height: 37px;
    color: var(--font-gray);
}
/* empty list message */
.empty-list-message {
    color: var(--font-gray);
    text-align: center;
    font-size: 14px;
    line-height: 70px;
}
.fa-music {
    color: var(--font-gray);
    font-size: 12px;
    padding-right: 5px;
}
/* listbox */
.play-list-all .list-box {
    width: 100%;
    height: 247px;
    padding-bottom: 40px;
    overflow: scroll;
}
.play-list-all .list-box > li {
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
.play-list-all .list-box p {
    color: var(--font-gray);
    font-size: 13px;
    line-height: 37px;
}
.play-list-all .list-box .title {
    display: flex;
    align-items: center;
    width: 150px;
    max-width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
/* artist */
.play-list-all .list-box .artist {
    width: 62px;
    max-width: 62px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 30px;
}
/* current playing music style */
.play-list-all .list-box li.playing-now > p {
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
