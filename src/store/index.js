import Vue from 'vue'
import Vuex from 'vuex'
import { musicList } from '../assets/data.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        rawMusicList: musicList,
        checkedMusicList: [],
        checkedAll: false,
        playMode: 'repeat-all',
        currentMusicList: [],
        currentIndex: 0,
        selectedMusic: null,
        play: false,
        currentTime: 0,
        playTime: 0,
        timerId: null,
        totalMusicCount: 0,
        deleteModal: false
    },
    getters: {
        getCurrentMusic (state) {
            const playlist = state.currentMusicList
            const currentMusic = playlist[0]
            return currentMusic
        },
        getCurrentTime (state) {
            const time = Math.round(state.currentTime)
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
        },
        getTotalMusicCount (state) {
            return state.totalMusicCount
        },
        getCheckedMusicList (state) {
            return state.checkedMusicList
        }
    },
    mutations: {
        // 첫번째곡 세팅
        setMusicList (state) {
            state.currentMusicList.push(...state.rawMusicList)
            state.currentIndex = 0
            state.currentTime = state.currentMusicList[0].playtime
            state.playTime = state.currentMusicList[0].playtime
            state.totalMusicCount = state.rawMusicList.length
        },
        // default list mutations
        toggleCheck (state, payload) {
            const list = state.checkedMusicList
            const checkedItem = payload.item

            if (list.includes(checkedItem)) {
                const newList = list.filter(item => item !== checkedItem)
                state.checkedMusicList = newList
            } else {
                state.checkedMusicList.push(payload.item)
            }

            if (state.checkedMusicList.length === state.totalMusicCount) {
                state.checkedAll = true
            } else {
                state.checkedAll = false
            }
        },
        toggleCheckAll (state) {
            state.checkedAll = !state.checkedAll
            if (state.checkedAll) {
                state.checkedMusicList = state.currentMusicList
            } else {
                state.checkedMusicList = []
            }
        },
        changeMusic (state, payload) {
            console.log(payload.item)
            // 재생중이던 노래 중지
            if (state.play) {
                state.play = false
                clearInterval(state.timerId)
            }
            // 재생 순서 재정렬
            let movingNum
            if (payload.index > state.currentIndex) {
                movingNum = payload.index - state.currentIndex
            } else if (payload.index < state.currentIndex) {
                movingNum = (payload.index - 0) + ((state.totalMusicCount - 1) - (state.currentIndex - 1))
            } else {
                return
            }
            const movingMusics = state.currentMusicList.splice(0, movingNum)
            state.currentMusicList.push(...movingMusics)
            // 바뀐 곡정보 state 저장
            state.currentIndex = payload.index
            state.currentTime = Number(payload.item.playtime)
            state.playTime = Number(payload.item.playtime)
            // 체크된 항목 리셋
            state.checkedMusicList = []
        },
        selectMusic (state, payload) {
            state.selectedMusic = payload.item
        },
        // 음악 재생 & 정지
        startMusic (state) {
            function goNextMusic () {
                const playlist = state.currentMusicList
                const finishedMusic = playlist.splice(0, 1)
                playlist.push(finishedMusic)
                const nextMusic = state.currentMusicList[0]
                state.currentTime = nextMusic.playtime
                state.playTime = nextMusic.playtime
                if (state.currentIndex === (state.totalMusicCount - 1)) {
                    state.currentIndex = 0
                } else {
                    state.currentIndex++
                }
            }

            function startMusicTimer (time) {
                state.play = true
                let currentTime = Number(time)

                const timerId = setInterval(function () {
                    state.currentTime = currentTime
                    if (currentTime <= 0) {
                        clearInterval(timerId)
                        state.play = false
                        goNextMusic()
                        state.timerId = startMusicTimer(state.currentTime)
                    }
                    currentTime = currentTime - 0.1
                }, 100)

                return timerId
            }

            state.timerId = startMusicTimer(state.currentTime)
        },
        stopMusic (state) {
            state.play = false
            clearInterval(state.timerId)
        },
        showDeleteModal (state) {
            state.deleteModal = true
        },
        closeDeleteModal (state) {
            state.deleteModal = false
        },
        deleteMusic (state) {
            // raw에서 삭제
            const checkedList = state.checkedMusicList
            let newList = state.rawMusicList
            for (let i = 0; i < checkedList.length; i++) {
                newList = newList.filter(item => item !== checkedList[i])
            }
            state.rawMusicList = newList
            state.totalMusicCount = newList.length
            // **currentlist에서 삭제 view에서 rawMusicList 변화 감지해서 watch로 구현가능?
            // checkedlist 초기화
            state.checkedMusicList = []
            // 모달 닫기
            state.deleteModal = false
            // 재생중인 노래가 포함된 경우? 리스트에서 사라지나 노래는 끝까지 재생
        }
    }
})
