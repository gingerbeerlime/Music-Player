export default {
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
        const checkedList = state.checkedMusicList
        const checkedItem = payload.item
        const currentPosition = state.currentPosition
        const myPlaylistsList = state.myPlaylists
        let totalMusicCount

        if (checkedList.includes(checkedItem)) {
            const newList = checkedList.filter(item => item !== checkedItem)
            state.checkedMusicList = newList
        } else {
            state.checkedMusicList.push(payload.item)
        }

        if (currentPosition !== 'tab1') {
            for (let i = 0; i < myPlaylistsList.length; i++) {
                if (myPlaylistsList[i].name === currentPosition) {
                    totalMusicCount = myPlaylistsList[i].list.length
                }
            }
        } else {
            totalMusicCount = state.totalMusicCount
        }

        if (state.checkedMusicList.length === totalMusicCount) {
            state.checkedAll = true
        } else {
            state.checkedAll = false
        }
    },
    toggleCheckAll (state) {
        state.checkedAll = !state.checkedAll
        const currentPosition = state.currentPosition
        const myPlaylistsList = state.myPlaylists
        let currentPositionList

        if (currentPosition !== 'tab1') {
            for (let i = 0; i < myPlaylistsList.length; i++) {
                if (myPlaylistsList[i].name === currentPosition) {
                    currentPositionList = myPlaylistsList[i].list
                }
            }
        } else {
            currentPositionList = state.fetchedMusicList
        }

        state.checkedMusicList = state.checkedAll ? currentPositionList : []
    },
    changeMusic (state, payload) {
        if (state.repeatMode === 'repeat-all' || state.repeatMode === 'no-repeat') {
            if (state.playStatus) {
                state.playStatus = false
                clearInterval(state.timerId)
            }
            // playlist rearrange
            let movingNum
            if (payload.index > state.currentMusicIndex) {
                movingNum = payload.index - state.currentMusicIndex
            } else if (payload.index < state.currentMusicIndex) {
                const finalIndex = state.currentPlayOrder.length - 1
                movingNum = payload.index + (finalIndex - (state.currentMusicIndex - 1))
            } else {
                movingNum = 0
            }
            const movingMusics = state.currentPlayOrder.splice(0, movingNum)
            state.currentPlayOrder.push(...movingMusics)

            state.currentMusicIndex = payload.index
            state.currentTime = Number(payload.item.playtime)
            state.playTime = Number(payload.item.playtime)

            state.checkedMusicList = []
            state.checkedAll = false
        } else if (state.repeatMode === 'repeat-one') {
            if (state.playStatus) {
                state.playStatus = false
                clearInterval(state.timerId)
            }

            state.currentPlayOrder = []
            state.currentPlayOrder.push(payload.item)
            state.currentMusicIndex = payload.index
            state.currentTime = Number(payload.item.playtime)
            state.playTime = Number(payload.item.playtime)

            state.checkedMusicList = []
            state.checkedAll = false
        }
    },
    selectMusic (state, payload) {
        state.selectedMusic = payload.item
    },
    // music playing mutations
    startMusic (state) {
        const goNextMusic = () => {
            if (state.repeatMode === 'repeat-one') {
                const nextMusic = state.currentPlayOrder[0]
                state.currentTime = Number(nextMusic.playtime)
            } else {
                const playlist = state.currentPlayOrder
                const finishedMusic = playlist.splice(0, 1)
                playlist.push(...finishedMusic)
                const nextMusic = state.currentPlayOrder[0]
                state.currentTime = Number(nextMusic.playtime)
                state.playTime = Number(nextMusic.playtime)
                if (state.currentMusicIndex === (state.currentPlayOrder.length - 1)) {
                    state.currentMusicIndex = 0
                } else {
                    state.currentMusicIndex++
                }
            }
        }

        const startMusicTimer = time => {
            state.playStatus = true
            let currentTime = Number(time)

            const timerId = setInterval(() => {
                state.currentTime = currentTime
                if (currentTime <= 0) {
                    clearInterval(timerId)
                    state.playStatus = false
                    goNextMusic()
                    if (state.currentMusicIndex !== 0 || state.repeatMode !== 'no-repeat') {
                        state.timerId = startMusicTimer(state.currentTime)
                    }
                }
                currentTime -= 0.1
            }, 100)

            return timerId
        }

        state.timerId = startMusicTimer(state.currentTime)
    },
    stopMusic (state) {
        state.playStatus = false
        clearInterval(state.timerId)
    },
    deleteMusicFromDefaultList (state) {
    // delete items list
        const checkedList = state.checkedMusicList
        const currentMusic = state.currentPlayOrder[0]
        const currentPosition = state.currentPosition
        const playingPosition = state.playingPosition

        if (currentPosition === playingPosition && checkedList.includes(currentMusic)) {
            if (state.playStatus) {
                clearInterval(state.timerId)
                state.playStatus = false
            }
        }

        let newList = state.fetchedMusicList
        for (let i = 0; i < checkedList.length; i++) {
            newList = newList.filter(item => item !== checkedList[i])
        }
        state.fetchedMusicList = newList
        state.totalMusicCount = newList.length

        // 현재 playlist 갱신
        if (currentPosition === playingPosition) {
            let newPlaylist = state.currentPlayOrder
            for (let i = 0; i < checkedList.length; i++) {
                newPlaylist = newPlaylist.filter(item => item !== checkedList[i])
            }
            state.currentPlayOrder = newPlaylist

            if (state.totalMusicCount) {
                state.currentTime = state.currentPlayOrder[0].playtime
                state.playTime = state.currentPlayOrder[0].playtime
            } else {
                state.currentTime = 0
                state.playTime = 0
            }

            state.currentMusicIndex = state.fetchedMusicList.indexOf(state.currentPlayOrder[0])
        }

        state.checkedMusicList = []
        state.checkedAll = false
        state.deleteModal = false
    },
    deleteMusicFromMyPlaylist (state) {
    // delete items list
        const checkedList = state.checkedMusicList
        const currentMusic = state.currentPlayOrder[0]
        const currentPosition = state.currentPosition
        const playingPosition = state.playingPosition

        if (currentPosition === playingPosition && checkedList.includes(currentMusic)) {
            if (state.playStatus) {
                clearInterval(state.timerId)
                state.playStatus = false
            }
        }

        let myPlaylist
        for (let i = 0; i < state.myPlaylists.length; i++) {
            if (state.myPlaylists[i].name === currentPosition) {
                myPlaylist = state.myPlaylists[i]
                break
            }
        }

        let newList = myPlaylist.list
        for (let i = 0; i < checkedList.length; i++) {
            newList = newList.filter(item => item !== checkedList[i])
        }
        myPlaylist.list = newList

        // 현재 playlist 갱신
        if (currentPosition === playingPosition) {
            let newPlaylist = state.currentPlayOrder
            for (let i = 0; i < checkedList.length; i++) {
                newPlaylist = newPlaylist.filter(item => item !== checkedList[i])
            }
            state.currentPlayOrder = newPlaylist

            if (state.currentPlayOrder.length) {
                state.currentTime = state.currentPlayOrder[0].playtime
                state.playTime = state.currentPlayOrder[0].playtime
            } else {
                state.currentTime = 0
                state.playTime = 0
            }

            state.currentMusicIndex = myPlaylist.list.indexOf(state.currentPlayOrder[0])
        }

        state.checkedMusicList = []
        state.checkedAll = false
        state.deleteModal = false
    },
    // myplaylist 관련
    makePlaylist (state, payload) {
        const newList = {
            name: payload.playlistName,
            list: []
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

            break
        }

        if (state.createModal) state.createModal = false
        state.deleteModal = false
        if (state.checkedMusicList.length === state.totalMusicCount) {
            state.checkedAll = false
        }
        state.checkedMusicList = []

        // alert
        setTimeout(() => {
            state.alertModal = true
            setTimeout(() => {
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
    // repeat
    changeRepeatMode (state) {
        const currentMode = state.repeatMode
        if (currentMode === 'repeat-all') state.repeatMode = 'repeat-one'
        else if (currentMode === 'repeat-one') state.repeatMode = 'no-repeat'
        else if (currentMode === 'no-repeat') state.repeatMode = 'repeat-all'

        if (state.repeatMode === 'repeat-one') {
            const currentMusic = state.currentPlayOrder[0]
            state.currentPlayOrder = []
            state.currentPlayOrder.push(currentMusic)

            // alert
            setTimeout(() => {
                state.repeatOneModal = true
                setTimeout(() => {
                    state.repeatOneModal = false
                }, 1500)
            }, 300)
        } else if (state.repeatMode === 'no-repeat') {
            if (state.playingPosition === 'tab1') {
                const basicList = state.fetchedMusicList
                state.currentPlayOrder = [...basicList]

                const movingMusics = state.currentPlayOrder.splice(0, state.currentMusicIndex)
                state.currentPlayOrder.push(...movingMusics)
            } else {
                let myPlaylist
                for (let i = 0; i < state.myPlaylists.length; i++) {
                    if (state.myPlaylists[i].name === state.playingPosition) {
                        myPlaylist = state.myPlaylists[i].list
                        break
                    }
                }
                state.currentPlayOrder = [...myPlaylist]

                const movingMusics = state.currentPlayOrder.splice(0, state.currentMusicIndex)
                state.currentPlayOrder.push(...movingMusics)
            }

            // alert
            setTimeout(() => {
                state.noRepeatModal = true
                setTimeout(() => {
                    state.noRepeatModal = false
                }, 1500)
            }, 300)
        } else {
        // alert
            setTimeout(() => {
                state.repeatAllModal = true
                setTimeout(() => {
                    state.repeatAllModal = false
                }, 1500)
            }, 300)
        }
    },
    // shuffle
    changeShuffleMode (state) {
        state.shuffle = !state.shuffle

        if (state.repeatMode === 'repeat-one') return

        if (state.shuffle) {
            const playlist = [...state.currentPlayOrder]
            const firstMusic = playlist.shift()
            playlist.sort(() => Math.random() - 0.5)
            state.currentPlayOrder = [firstMusic, ...playlist]
            state.currentMusicIndex = 0

            // alert
            setTimeout(() => {
                state.shuffleModal = true
                setTimeout(() => {
                    state.shuffleModal = false
                }, 1500)
            }, 300)
        } else {
        // 배열 원래대로 (현재 음악이 가장 앞으로 오게)
        // shuffle 상태에서 클릭해서 노래 바꾸면 버그
            if (state.playingPosition === 'tab1') {
                const basicList = state.fetchedMusicList
                const currentMusic = state.currentPlayOrder[0]
                const currentMusicIndex = basicList.indexOf(currentMusic)
                state.currentPlayOrder = [...basicList]
                const movingMusics = state.currentPlayOrder.splice(0, currentMusicIndex)
                state.currentPlayOrder.push(...movingMusics)
                state.currentMusicIndex = currentMusicIndex
            } else {
                let myPlaylist
                for (let i = 0; i < state.myPlaylists.length; i++) {
                    if (state.myPlaylists[i].name === state.playingPosition) {
                        myPlaylist = state.myPlaylists[i].list
                        break
                    }
                }
                // 아래 코드 test해보기, shuffle아닐 때도 playlist에서 currentIndex값이 현재 플레이리스트에 맞게 보이는지 확인
                const currentMusic = state.currentPlayOrder[0]
                const currentMusicIndex = myPlaylist.indexOf(currentMusic)
                // console.log(`currentMusicIndex: ${currentMusicIndex}`)
                state.currentPlayOrder = [...myPlaylist]
                const movingMusics = state.currentPlayOrder.splice(0, currentMusicIndex)
                state.currentPlayOrder.push(...movingMusics)
                state.currentMusicIndex = currentMusicIndex
            }
            // alert 띄우기
            setTimeout(() => {
                state.noShuffleModal = true
                setTimeout(() => {
                    state.noShuffleModal = false
                }, 1500)
            }, 300)
        }
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
