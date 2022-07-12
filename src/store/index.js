import Vue from 'vue'
import Vuex from 'vuex'
import { musicList } from '../assets/data.js'

Vue.use(Vuex)

console.log(musicList)

export const store = new Vuex.Store({
    state: {
        musicList,
        checkedMusic: [],
        playMode: 'repeat-all',
        currentMusic: null,
        selectedMusic: null,
        play: false,
        currentTime: 0,
        playTime: 0,
        timerId: null
    },
    getters: {
        getCurrentTime (state) {
            const time = state.currentTime
            let minute = parseInt(time / 60)
            let seconds = time % 60
            if (minute < 10) minute = '0' + minute
            if (seconds < 10) seconds = '0' + seconds
            return `${minute}:${seconds}`
        },
        getPlayTime (state) {
            const time = state.playTime
            let minute = parseInt(time / 60)
            let seconds = time % 60
            if (minute < 10) minute = '0' + minute
            if (seconds < 10) seconds = '0' + seconds
            return `${minute}:${seconds}`
        }
    },
    mutations: {
        // 첫번째곡 세팅
        setMusic (state) {
            const firstSong = state.musicList[0]
            state.currentMusic = firstSong
            state.currentTime = firstSong.playtime
            state.playTime = firstSong.playtime
        },
        // default list mutations
        toggleCheck (state, payload) {
            const list = state.checkedMusic
            const checkedItem = payload.item

            if (list.includes(checkedItem)) {
                const newList = list.filter(item => item !== checkedItem)
                state.checkedMusic = newList
            } else {
                state.checkedMusic.push(payload.item)
            }
        },
        playMusic (state, payload) {
            state.currentMusic = payload.item
            state.currentTime = payload.item.playtime
            state.playTime = payload.item.playtime
            state.play = false
        },
        selectMusic (state, payload) {
            state.selectedMusic = payload.item
        },
        // 음악 재생 & 정지
        startMusic (state) {
            state.play = true

            function startMusicTimer (time) {
                let currentTime = Number(time)

                const timerId = setInterval(function () {
                    state.currentTime = currentTime
                    if (currentTime === 0) {
                        clearInterval(timerId)
                        alert('다음곡 호출')
                    }
                    currentTime--
                }, 1000)

                return timerId
            }

            state.timerId = startMusicTimer(state.playTime)
        },
        stopMusic (state) {
            state.play = false
        }
    }
})
