<template>
    <ul id="player-control">
        <li class="eq">EQ</li>
            <li class="repeat-all">
                <i class="fa-solid fa-repeat"></i>
            </li>
            <li class="play-btns">
                <ul>
                    <!-- prev button -->
                    <li class="prev" @click="changeMusic(prevMusic, prevIdx)">
                        <i class="fa-solid fa-backward-step"></i>
                    </li>
                    <li class="play" :play="playStatus">
                        <!-- 일시정지 버튼-->
                        <i
                            v-if="$store.state.play"
                            @click="stopMusic"
                            class="fa-solid fa-pause"
                        ></i>
                        <!-- 재생 버튼 -->
                        <i
                            v-else class="fa-solid fa-play"
                            @click="startMusic"
                        ></i>
                    </li>
                    <!-- next button -->
                    <li class="next" @click="changeMusic(nextMusic, nextIdx)">
                        <i class="fa-solid fa-forward-step"></i>
                    </li>
                </ul>
            </li>
            <li class="shuffle">
                <i class="fa-solid fa-shuffle"></i>
            </li>
            <li class="volume">
                <i class="fa-solid fa-volume-high"></i>
        </li>
    </ul>
</template>

<script>
export default {
    methods: {
        startMusic () {
            this.$store.commit('startMusic')
        },
        stopMusic () {
            this.$store.commit('stopMusic')
        },
        changeMusic (item, index) {
            this.$store.commit('changeMusic', { item, index })
            this.$store.commit('startMusic')
        }
    },
    computed: {
        playStatus: function () {
            return this.$store.state.play
        },
        prevMusic: function () {
            const finalIdx = this.$store.getters.getTotalMusicCount - 1
            return this.$store.state.currentMusicList[finalIdx]
        },
        nextMusic: function () {
            return this.$store.state.currentMusicList[1]
        },
        prevIdx: function () {
            let index = this.$store.state.currentIndex
            if (index === 0) index = this.$store.getters.getTotalMusicCount - 1
            else index--

            return index
        },
        nextIdx: function () {
            let index = this.$store.state.currentIndex
            if (index === (this.$store.state.totalMusicNumber - 1)) index = 0
            else index++

            return index
        }
    }
    // watch: {
    //     playStatus: function () {
    //         this.$store.commit('startMusic')
    //     }
    // }
}
</script>

<style scoped>
#player-control {
    width: 100%;
    height: 40px;
    display: flex;
}
#player-control li {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--font-gray);
}
#player-control li:hover {
    color: var(--font-point-white);
    transition: 0.02s all ease;
}
#player-control .eq,
#player-control .volume {
    width: 45px;
    height: 100%;
}
#player-control .repeat-all,
#player-control .shuffle {
    width: 50px;
    height: 100%;
}
#player-control .eq {
    font-size: 12px;
    letter-spacing: 2px;
    padding-left: 1px;
}
.fa-repeat {
    color: var(--font-point-white);
}
.fa-volume-high {
    font-size: 12px;
    padding-right: 1px;
}
.play-btns {
    width: 115px;
}
.play-btns > ul {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0 2px;
    box-sizing: border-box;
}
.play-btns > ul > li > i {
    color: var(--font-point-white);
}
.play-btns .prev,
.play-btns .next {
    width: 38px;
    height: 100%;
    font-size: 18px;
}
.play-btns .play {
    width: 35px;
    height: 100%;
    font-size: 22px;
}
</style>
