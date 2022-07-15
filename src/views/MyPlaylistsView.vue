<template>
    <div>
        <header
            @click="showCreateModal"
        >
            <p class="btn-create">
                <i class="fa-solid fa-circle-plus"></i>
                새 플레이리스트 만들기
            </p>
        </header>
        <!-- no-list-message -->
        <p
            v-if="myPlaylistsCount === 0"
            class="empty-list-message"
        >
            <i class="fa-solid fa-headphones-simple"></i>
            플레이리스트를 생성해주세요.
        </p>
        <!-- list -->
        <ul class="list-box">
            <li
                v-for="playlist in myPlaylistsInfo"
                :key="playlist.playlistName"
                @click="showPlaylist(playlist.playlistName)"
            >
                <div class="thumb-img">
                    <img
                        :src="require('@/assets/img/thumb/' + playlist.imgUrl + '.jpg')"
                        alt="playlist_thumbnail"
                    >
                </div>
                <p class="playlist-name">{{ playlist.playlistName }}</p>
                <span class="music-count">{{ playlist.totalMusicCount }}</span>
                <div class="go-playlist">
                    <i class="fa-solid fa-play"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        showCreateModal () {
            this.$store.commit('showCreateModal')
        },
        showPlaylist (name) {
            this.$store.commit('showPlaylist', { name })
        }
    },
    computed: {
        myPlaylists: function () {
            return this.$store.getters.getMyPlaylists
        },
        myPlaylistsInfo: function () {
            const infoBox = []
            for (let i = 0; i < this.myPlaylists.length; i++) {
                const playlist = this.myPlaylists[i]
                console.log(playlist)
                const name = playlist.name
                const count = playlist.list.length
                const thumbnail = playlist.thumbnail
                const info = { playlistName: name, totalMusicCount: count, imgUrl: thumbnail }
                infoBox.push(info)
            }
            return infoBox
        },
        myPlaylistsCount: function () {
            return this.$store.state.myPlaylists.length
        }
    }
}
</script>

<style scoped>
.play-list-created .playlist-list {
    width: 100%;
    height: 100%;
}
/* header */
.play-list-created .playlist-list > header {
    width: 100%;
    height: 37px;
}
.play-list-created .playlist-list > header .btn-create {
    font-size: 12px;
    color: var(--font-gray);
    line-height: 37px;
    padding-left: 15px;
    cursor: pointer;
}
.play-list-created .playlist-list> header .btn-create:hover {
    color: var(--font-point-white);
    transition: 0.1s all ease;
}
.fa-circle-plus {
    padding-right: 5px;
}
/* no-list message */
.empty-list-message {
    color: var(--font-gray);
    text-align: center;
    font-size: 14px;
    line-height: 70px;
}
.fa-headphones-simple {
    color: var(--font-gray);
    font-size: 12px;
    padding-right: 5px;
}
/* listbox */
.play-list-created .playlist-list .list-box {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.play-list-created .playlist-list .list-box li {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    cursor: pointer;
}
.play-list-created .playlist-list .list-box li:hover {
    background-color: var(--selected-bg-gray-opacity);
    transition: 0.02s all ease;
}

.play-list-created .playlist-list .list-box li:last-child {
    margin-bottom: 25px;
}
.play-list-created .playlist-list .thumb-img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
}
.play-list-created .playlist-list .thumb-img > img {
    width: 100%;
}
.play-list-created .playlist-list .playlist-name {
    color: var(--font-gray);
    font-size: 13px;
    line-height: 40px;
    padding-left: 10px;
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.play-list-created .playlist-list .music-count {
    color: var(--font-gray);
    font-size: 11px;
    padding: 2px 6px;
    border: 1px solid var(--font-gray);
    border-radius: 10px;
    margin-left: 5px;
}
.go-playlist {
    width: 50px;
    height: 55px;
    margin-left: auto;
    display: flex;
    align-items: center;
}
.fa-play {
    display: none;
    font-size: 12px;
    color: var(--font-point-white);
}
.play-list-created .list-box li:hover .fa-play {
    display: block;
}
/* select item style */
.list-box ._click {
    background-color: var( --selected-bg-gray-opacity);
}
.list-box ._click .icon-small-square {
    background-color: rgba(51, 51, 51);
}
</style>
