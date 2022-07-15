import Vue from 'vue'
import Vuex from 'vuex'
import { musicList } from '../assets/data.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        fetchedMusicList: musicList,
        checkedMusicList: [],
        checkedAll: false,
        currentPlayOrder: [],
        currentMusicIndex: 0,
        selectedMusic: null,
        playStatus: false,
        currentTime: 0,
        playTime: 0,
        timerId: null,
        totalMusicCount: 0,
        myPlaylists: [],
        showPlaylist: '',
        playingPosition: 'tab1',
        currentPosition: 'tab1',
        playMode: 'repeat-all',
        deleteModal: false,
        createModal: false,
        addModal: false,
        alertModal: false
    },
    getters: {
        getCurrentMusic (state) {
            const playlist = state.currentPlayOrder
            const currentMusic = playlist[0] ?? ''
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
        getCurrentPlaylistCount (state) {
            return state.currentPlayOrder.length
        },
        getCheckedMusicList (state) {
            return state.checkedMusicList
        },
        getMyPlaylists (state) {
            return state.myPlaylists
        },
        getDefaultPlaylistName (state) {
            const playlistsCount = state.myPlaylists.length + 1
            return `플레이리스트 ${playlistsCount}`
        }
    },
    mutations: {
        // first set musiclist
        setFetchedMusicList (state) {
            state.currentPlayOrder.push(...state.fetchedMusicList)
            state.currentMusicIndex = 0
            state.currentTime = state.currentPlayOrder[0].playtime
            state.playTime = state.currentPlayOrder[0].playtime
            state.totalMusicCount = state.fetchedMusicList.length
        },
        // list event
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
                state.checkedMusicList = state.currentPlayOrder
            } else {
                state.checkedMusicList = []
            }
        },
        changeMusic (state, payload) {
            if (state.playStatus) {
                state.playStatus = false
                clearInterval(state.timerId)
            }
            // playlist rearrange
            let movingNum
            if (payload.index > state.currentMusicIndex) {
                movingNum = payload.index - state.currentMusicIndex
            } else if (payload.index < state.currentMusicIndex) {
                movingNum = (payload.index - 0) + ((state.currentPlayOrder.length - 1) - (state.currentMusicIndex - 1))
            } else {
                movingNum = 0
            }
            const movingMusics = state.currentPlayOrder.splice(0, movingNum)

            state.currentPlayOrder.push(...movingMusics)
            console.log(payload.index)
            state.currentMusicIndex = payload.index
            state.currentTime = Number(payload.item.playtime)
            state.playTime = Number(payload.item.playtime)

            state.checkedMusicList = []
            state.checkedAll = false
        },
        selectMusic (state, payload) {
            state.selectedMusic = payload.item
        },
        // music playing mutations
        startMusic (state) {
            function goNextMusic () {
                const playlist = state.currentPlayOrder
                const finishedMusic = playlist.splice(0, 1)
                playlist.push(...finishedMusic)
                const nextMusic = state.currentPlayOrder[0]
                state.currentTime = nextMusic.playtime
                state.playTime = nextMusic.playtime
                if (state.currentMusicIndex === (state.currentPlayOrder.length - 1)) {
                    state.currentMusicIndex = 0
                } else {
                    state.currentMusicIndex++
                }
            }

            function startMusicTimer (time) {
                state.playStatus = true
                let currentTime = Number(time)

                const timerId = setInterval(function () {
                    state.currentTime = currentTime
                    if (currentTime <= 0) {
                        clearInterval(timerId)
                        state.playStatus = false
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
            state.playStatus = false
            clearInterval(state.timerId)
        },
        deleteMusic (state) {
            // 삭제 리스트
            const checkedList = state.checkedMusicList

            // 삭제 리스트에 현재 재생중/일시정지 노래가 포함되어있을 때
            const currentMusic = state.currentPlayOrder[0]
            const except = checkedList.includes(currentMusic)

            let newList = state.fetchedMusicList
            for (let i = 0; i < checkedList.length; i++) {
                newList = newList.filter(item => item !== checkedList[i])
            }
            state.fetchedMusicList = newList
            state.totalMusicCount = newList.length

            // 현재 playlist 갱신
            let newPlaylist = state.currentPlayOrder
            for (let i = 0; i < checkedList.length; i++) {
                newPlaylist = newPlaylist.filter(item => item !== checkedList[i])
            }
            state.currentPlayOrder = newPlaylist

            // 예외처리
            if (except) {
                if (state.playStatus) {
                    clearInterval(state.timerId)
                    state.playStatus = false
                }
                if (state.totalMusicCount) {
                    state.currentTime = state.currentPlayOrder[0].playtime
                    state.playTime = state.currentPlayOrder[0].playtime
                } else {
                    state.currentTime = 0
                    state.playTime = 0
                }
            }
            state.currentMusicIndex = state.fetchedMusicList.indexOf(state.currentPlayOrder[0])

            state.checkedMusicList = []
            state.checkedAll = false
            state.deleteModal = false
        },
        // myplaylist 관련
        makePlaylist (state, payload) {
            const newList = {
                name: payload.playlistName,
                list: [],
                thumbnail: 'default_image'
            }
            state.myPlaylists.push(newList)
            // 선택한 노래로 만드는 경우 / 폴더만 생성하는 경우
            if (state.checkedMusicList.length === 0) {
                state.createModal = false
            }
        },
        addMusicToPlaylist (state, payload) {
            const addMusicList = state.checkedMusicList
            const myPlaylists = state.myPlaylists

            for (let i = 0; i < myPlaylists.length; i++) {
                const playlistName = myPlaylists[i].name
                if (playlistName !== payload.name) continue
                const playlist = myPlaylists[i].list
                // 노래 중복 제거
                const uniqueMusicList = addMusicList.filter(item => !playlist.includes(item))
                playlist.push(...uniqueMusicList)
                // thumbnail - 첫번째곡
                myPlaylists[i].thumbnail = playlist[0].photo
                break
            }

            if (state.createModal) state.createModal = false
            state.deleteModal = false
            if (state.checkedMusicList.length === state.totalMusicCount) {
                state.checkedAll = false
            }
            state.checkedMusicList = []

            // alert
            setTimeout(function () {
                state.alertModal = true
                setTimeout(function () {
                    state.alertModal = false
                }, 1500)
            }, 300)
        },
        showPlaylist (state, payload) {
            state.showPlaylist = payload.name
            state.currentPosition = payload.name
        },
        returnToPlaylist (state) {
            state.showPlaylist = ''
            state.checkedMusicList = []
            state.checkedAll = false
            state.currentPosition = 'tab2'
        },
        // tab 전환
        changeTab (state, payload) {
            if (state.currentPosition !== payload.tabId) {
                state.checkedMusicList = []
                state.checkedAll = false
            }
            state.currentPosition = payload.tabId
            state.showPlaylist = ''
        },
        // 현재 재생목록 reset
        resetCurrentPlaylist (state) {
            const currentPlaylist = state.currentPosition
            const newPlaylist = state.myPlaylists.find(item => item.name === currentPlaylist)
            state.currentPlayOrder = []
            state.currentPlayOrder.push(...newPlaylist.list)
            state.currentMusicIndex = 0
            state.playingPosition = state.currentPosition
        },
        resetDefaultPlaylist (state) {
            state.currentPlayOrder = []
            state.currentPlayOrder.push(...state.fetchedMusicList)
            state.currentMusicIndex = 0
            state.playingPosition = state.currentPosition
        },
        // modal
        showCreateModal (state) {
            state.createModal = true
        },
        closeCreateModal (state) {
            state.createModal = false
        },
        showDeleteModal (state) {
            state.deleteModal = true
        },
        closeDeleteModal (state) {
            state.deleteModal = false
        },
        showAddModal (state) {
            state.addModal = true
        },
        closeAddModal (state) {
            state.addModal = false
        }
    }
})
