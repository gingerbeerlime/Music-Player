<template>
    <div class="modal-tab2 modal-layer">
        <transition name="slide" appear>
            <div class="modal-box">
                <header>
                    <h2>새 플레이리스트 만들기</h2>
                </header>
                <div class="input-box">
                    <input
                        v-model.trim="playlistName"
                        type="text"
                        maxlength="20"
                        class="input_playlist_name"
                    >
                    <i class="fa-solid fa-xmark"></i>
                    <div class="info-wrap">
                        <p
                            v-if="!uniqueName"
                            class="warning-text"
                        >
                            중복된 이름입니다.
                        </p>
                        <p class="char-num">
                            <span>{{ countInputLetters }}</span>/20
                        </p>
                    </div>
                </div>
                <ul class="btns-group">
                    <li
                        @click="makePlaylist(playlistName)"
                        :class="{'not-active': !uniqueName}"
                    >확인</li>
                    <li @click="closeCreateModal">취소</li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data () {
        return {
            playlistName: this.$store.getters.getDefaultPlaylistName,
            uniqueName: true
        }
    },
    methods: {
        closeCreateModal () {
            this.$store.commit('closeCreateModal')
        },
        makePlaylist (playlistName) {
            if (!this.uniqueName) return
            this.$store.commit('makePlaylist', { playlistName })
            if (this.$store.state.checkedMusicList.length >= 1) {
                this.$store.commit('addMusicToPlaylist', { name: playlistName })
            }
        }
    },
    computed: {
        countInputLetters () {
            return this.playlistName.length
        }
    },
    watch: {
        playlistName () {
            // 중복검사
            const myPlaylists = this.$store.state.myPlaylists
            for (let i = 0; i < myPlaylists.length; i++) {
                if (this.playlistName === myPlaylists[i].name) {
                    this.uniqueName = false
                    break
                } else {
                    this.uniqueName = true
                }
            }
        }
    }
}
</script>

<style scoped>
.modal-tab2 {
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 880;
}
.modal-tab2 .modal-box {
    display: flex;
    width: 275px;
    height: 175px;
    background-color: var(--modal-bg-gray);
    position: absolute;
    bottom: 12px;
    left: 15px;
    z-index: 890;
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
}
/* header */
.modal-tab2 .modal-box > header {
    width: 100%;
    height: 51px;
}
.modal-tab2 .modal-box > header > h2 {
    font-size: 17px;
    color: var(--font-point-white);
    text-align: center;
    line-height: 45px;
    margin-top: 7px;
}
/* input */
.modal-tab2 .input-box {
    width: 100%;
    height: 72px;
    position: relative;
}
.input_playlist_name {
    width: 235px;
    height: 38px;
    border-radius: 3px;
    border: 1px solid rgb(211, 211, 211, 0.2);
    background-color: #464646;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -117.5px;
    padding-left: 10px;
    color: var(--font-point-white);
    font-family: 'SUIT-Medium';
}
.input_playlist_name:focus {
    outline: none;
}
.input_playlist_name::placeholder {
    font-family: 'SUIT-Medium';
    font-size: 14px;
    color: var(--font-point-white);
}
.modal-tab2 .input-box .fa-xmark {
    color: rgb(211, 211, 211, 0.2);
    position: absolute;
    font-size: 15px;
    top: 11.5px;
    right: 30px;
    cursor: pointer;
}
.info-wrap {
    width: 235px;
    height: 30px;
    position: absolute;
    top: 38px;
    left: 50%;
    margin-left: -117.5px;
    display: flex;
    justify-content: space-between;
}
.info-wrap .warning-text {
    font-size: 11px;
    line-height: 30px;
    color: rgba(255, 0, 0, 0.7);
    padding-left: 5px;
}
.modal-tab2 .input-box .char-num {
    font-size: 13px;
    line-height: 30px;
    color: rgb(211, 211, 211, 0.2);
    margin-left: auto;
}
.modal-tab2 .input-box .char-num span {
    color: rgb(245, 245, 245, 0.7);
}
/* buttons(okay, cancel) */
.modal-tab2 .btns-group {
    width: 62.5%;
    height: 26px;
    display: flex;
    justify-content: space-between;
}
.modal-tab2 .btns-group li {
    width: 80px;
    height: 26px;
    font-size: 13px;
    line-height: 26px;
    color: var(--font-gray);
    border: 1px solid var(--font-gray);
    border-radius: 30px;
    text-align: center;
    cursor: pointer;
}
.modal-tab2 .btns-group li:hover {
    border: 1px solid var(--font-point-white);
    color: var(--font-point-white);
    transition: 0.02s all ease;
}
.modal-tab2 .btns-group li.not-active {
    color: rgb(185, 185, 185, 0.7);
    border: 1px solid rgb(185, 185, 185, 0.7);
    cursor: not-allowed;
}
/* modal transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
