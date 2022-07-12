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
        selectedMusic: null
    },
    mutations: {
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
        },
        selectMusic (state, payload) {
            state.selectedMusic = payload.item
        }
    }
})
