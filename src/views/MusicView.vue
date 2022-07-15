<template>
    <div id="album-view">
        <!-- album photo -->
        <div class="album-bg" >
            <div class="album-photo">
                <img :src="require('@/assets/img/thumb/' + currentMusicInfo.imgUrl + '.jpg')" alt="album-photo" />
            </div>
        </div>
        <!-- title & artist -->
        <div class="music-info">
            <h2 class="music-title">{{ currentMusicInfo.title }}</h2>
            <p class="artist-name">{{ currentMusicInfo.artist }}</p>
        </div>
        <!-- like button -->
        <div class="like-btn">
            <i class="fa-regular fa-heart"></i>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        imgUrl: function () {
            let imgUrl
            if (this.$store.getters.getCurrentMusic) {
                imgUrl = this.$store.getters.getCurrentMusic.photo
            } else {
                imgUrl = 'default_image'
            }
            return imgUrl
        },
        currentMusicInfo () {
            let imgUrl, title, artist
            if (this.$store.getters.getCurrentMusic === '') {
                imgUrl = 'default_image'
                title = ''
                artist = ''
            } else {
                const music = this.$store.getters.getCurrentMusic
                imgUrl = music.photo
                title = music.title
                artist = music.artist
            }
            return { imgUrl, title, artist }
        }
    }
}
</script>

<style scoped>
#album-view {
    width: 100%;
    height: 236px;
}
/* album - photo */
.album-bg {
    width: 100%;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.album-photo {
    width: 150px;
    height: 150px;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
.album-photo > img {
    width: 100%;
}
/* title & artist */
.music-info {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.music-title {
    font-size: 14px;
    line-height: 20px;
    color: var(--font-point-white);
}
.artist-name {
    font-size: 13px;
    line-height: 20px;
    color: var(--font-gray);
}
/* like button */
.like-btn {
    width: 100%;
    height: 16px;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
.fa-heart {
    color: var(--font-point-white);
    font-size: 13px;
    line-height: 16px;
}
</style>
