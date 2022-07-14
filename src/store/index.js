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
        deleteModal: false,
        createModal: false,
        addModal: false,
        alertModal: false,
        myPlaylists: [],
        myPlaylistKey: 1,
        viewPlaylist: '',
        currentTab: 'tab1'
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
        // 처음 로딩시 첫번째곡 세팅
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
            // 삭제할 리스트
            const checkedList = state.checkedMusicList

            // 삭제 리스트에 현재 재생중/일시정지 노래가 포함되어있을 때
            const currentMusic = state.currentMusicList[0]
            const except = checkedList.includes(currentMusic)

            // rawlist 갱신
            let newList = state.rawMusicList
            for (let i = 0; i < checkedList.length; i++) {
                newList = newList.filter(item => item !== checkedList[i])
            }
            state.rawMusicList = newList
            state.totalMusicCount = newList.length

            // 현재 playlist 갱신
            let newPlaylist = state.currentMusicList
            for (let i = 0; i < checkedList.length; i++) {
                newPlaylist = newPlaylist.filter(item => item !== checkedList[i])
            }
            state.currentMusicList = newPlaylist

            // checkedlist에 현재 재생중/일시정지 노래가 포함되어있을 때
            if (except) {
                if (state.play) {
                    clearInterval(state.timerId)
                    state.play = false
                }
                state.currentTime = state.currentMusicList[0].playtime
                state.playTime = state.currentMusicList[0].playtime
            }
            // currentIndex 삭제되는 첫번째 아이템의 인덱스로 변경
            state.currentIndex = state.rawMusicList.indexOf(state.currentMusicList[0])
            // checkedlist 초기화
            state.checkedMusicList = []
            // 모달 닫기
            state.deleteModal = false
            // 재생중인 노래가 포함된 경우? 리스트에서 사라지나 노래는 끝까지 재생
        },
        // 새 플레이리스트 만들기
        showCreateModal (state) {
            state.createModal = true
        },
        closeCreateModal (state) {
            state.createModal = false
        },
        // 플레이리스트 폴더 생성
        makePlaylist (state, payload) {
            const musicList = []
            const thumbnail = ['default_image']
            const newList = [[payload.playlistName], musicList, thumbnail]
            state.myPlaylists.push(newList)
            // 선택한 노래가 있는 경우 / 폴더만 생성하는 경우
            if (state.checkedMusicList.length === 0) {
                state.createModal = false
            }
        },
        showAddModal (state) {
            state.addModal = true
        },
        closeAddModal (state) {
            state.addModal = false
        },
        // 플레이리스트에 노래 추가
        addMusicToPlaylist (state, payload) {
            console.log('working')
            // 체크된 노래 리스트에 추가
            const addMusicList = state.checkedMusicList
            const myPlaylists = state.myPlaylists

            for (let i = 0; i < myPlaylists.length; i++) {
                const playlistName = myPlaylists[i][0][0]
                if (playlistName !== payload.name) continue
                const playlist = myPlaylists[i][1]
                // 중복 제거
                const addUniqueMusicList = addMusicList.filter(item => !playlist.includes(item))
                playlist.push(...addUniqueMusicList)
                // thumbnail변경(첫번째곡 사진)
                console.log(playlist[0].photo)
                const thumbnail = myPlaylists[i][2]
                thumbnail.pop()
                thumbnail.push(playlist[0].photo)
                break
            }

            if (state.createModal) state.createModal = false
            state.deleteModal = false
            if (state.checkedMusicList.length === state.totalMusicCount) {
                state.checkedAll = false
            }
            state.checkedMusicList = []
            // alert 띄우기
            setTimeout(function () {
                state.alertModal = true
                setTimeout(function () {
                    state.alertModal = false
                }, 1500)
            }, 300)
        },
        showPlaylist (state, payload) {
            console.log(payload.name)
            state.viewPlaylist = payload.name
        },
        returnToPlaylist (state) {
            state.viewPlaylist = ''
        },
        tabChange (state, payload) {
            if (state.currentTab !== payload.tabId) {
                state.checkedMusicList = []
            }
            state.currentTab = payload.tabId
        }
    }
})
