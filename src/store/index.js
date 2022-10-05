import Vue from 'vue'
import Vuex from 'vuex'
import { musicList } from '../assets/data.js'
import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        fetchedMusicList: musicList,
        currentPlayOrder: [],
        currentMusicIndex: 0,
        checkedMusicList: [],
        checkedAll: false,
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
        // repeatMode : ['repeat-all', 'repeat-one', 'no-repeat']
        repeatMode: 'repeat-all',
        shuffle: false,
        deleteModal: false,
        createModal: false,
        addModal: false,
        alertModal: false,
        noRepeatModal: false,
        repeatAllModal: false,
        repeatOneModal: false,
        shuffleModal: false,
        noShuffleModal: false
    },
    getters,
    mutations
})

export default store
