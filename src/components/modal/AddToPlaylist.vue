<template>
    <div class="modal-wrap" @click="closeAddModal">
        <div class="modal-tab4">
            <header @click="showCreateModal">
                <h3>
                    <i class="fa-solid fa-plus"></i>
                    새 플레이리스트 만들기
                </h3>
            </header>
            <ul
                class="playlist-group no-scroll"
                v-if="playlistNames.length"
            >
                <li
                    v-for="name in playlistNames"
                    @click="addMusicToPlaylist(name)"
                    :key="name">
                    {{ name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeAddModal () {
            this.$store.commit('closeAddModal')
        },
        addMusicToPlaylist (name) {
            this.$store.commit('addMusicToPlaylist', { name })
        },
        // 새 플레이리스트 만들기
        showCreateModal () {
            this.$store.commit('showCreateModal')
        }
    },
    computed: {
        playlistNames: function () {
            const playlists = this.$store.getters.getMyPlaylists
            const namesArray = []
            playlists.forEach(item => namesArray.push(...item[0]))
            return namesArray
        }
    }
}
</script>

<style scoped>
.modal-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 850;
}
.modal-tab4 {
    width: 275px;
    /* height: 180px; */
    background-color: var(--modal-bg-gray);
    position: absolute;
    bottom: 8px;
    left: 15px;
    z-index: 870;
    border-radius: 10px;
    overflow: hidden;
}
.modal-tab4 > header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.modal-tab4 > header > h3 {
    font-size: 14px;
    color: var(--font-gray);
}
.modal-tab4 > header > h3:hover {
    color: var(--font-point-white);
    transition: 0.2s all ease;
}
.modal-tab4 > header > h3 > i {
    padding-right: 5px;
}
.modal-tab4 .playlist-group {
    width: 100%;
    height: 115px;
    overflow: scroll;
}
.modal-tab4 .playlist-group li {
    width: 100%;
    height: 36px;
    cursor: pointer;
    padding: 0 22px;
    box-sizing: border-box;
    color: var(--font-point-white);
    font-size: 13px;
    line-height: 36px;
}

.modal-tab4 .playlist-group li:hover {
    background-color: rgb(255, 255, 255, 0.1);
    transition: 0.2s all ease;
}
.no-scroll {
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
}
.no-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
