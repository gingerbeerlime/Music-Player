<template>
    <div id="album-view">
        <!-- 앨범사진 -->
        <div class="album-bg">
            <div class="album-photo">
                <img src="../assets/img/thumb/1.jpg" alt="album-photo">
            </div>
        </div>
        <!-- 노래 제목 & 가수 -->
        <div class="music-info">
            <h2 class="music-title">POP!</h2>
            <p class="artist-name">나연 (TWICE)</p>
        </div>
        <!-- 좋아요 버튼 -->
        <div class="like-btn">
            <i class="fa-regular fa-heart"></i>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#album-view {
    width: 100%;
    height: 236px;
}
/* 앨범 사진 */
.album-bg {
    width: 100%;
    height: 170px;
    /* background-color: rgb(240, 248, 255);
    background: url('/images/music_photo.jpg');
    -webkit-filter: blur(5px);
    filter: blur(5px);
    background-size: cover; */
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
/* 노래 제목 */
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
/* 좋아요 버튼 */
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
