export default {
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
        const playlistsCount = state.myPlaylists.length
        return `플레이리스트 ${playlistsCount + 1}`
    },
    getRepeatMode (state) {
        return state.repeatMode
    }
}
