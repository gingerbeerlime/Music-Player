<template>
    <div id="tab-box">
            <!-- [1] tab buttons -->
            <div class="tab-btns-bg"></div>
            <input type="radio" name="playlist" id="tab1" checked>
            <label for="tab1" class="tab-btn btn-list-all">
                <p>곡<span>10</span></p>
            </label>
            <input type="radio" name="playlist" id="tab2">
            <label for="tab2" class="tab-btn btn-list-created">
                <p>플레이리스트</p>
            </label>

            <!-- [2] playing list -->
            <!-- [2-1] 전체 음악 리스트 -->
            <section class="play-list-all">
                <header class="btns-container">
                    <label class="checkbox-wrap">
                        <input type="checkbox" class="check-btn" id="check-btn-all"/>
                        <div class="icons-check">
                            <div class="icon-small-square"></div>
                            <i class="fa-solid fa-check"></i>
                        </div>
                    </label>
                    <p class="music-count">전체선택</p>
                </header>
                <ul class="list-box">
                    <li
                        v-for="item in $store.state.musicList"
                        :key="item.key"
                        @dblclick="playMusic(item)"
                        @click="selectMusic(item)"
                        :class="{'_click': $store.state.selectedMusic === item, 'playing-now': $store.state.currentMusic === item}"
                        >
                        <!-- checkbox -->
                        <label class="checkbox-wrap">
                            <input type="checkbox" class="check-btn" @click="toggleCheck(item)"/>
                            <div class="icons-check">
                                <div class="icon-small-square"></div>
                                <i class="fa-solid fa-check"></i>
                            </div>
                        </label>
                        <!-- 이퀄라이저 아이콘 -->
                        <!-- <div class="playing-icon"></div> -->
                        <!-- music title -->
                        <p class="title">{{ item.title }}</p>
                        <!-- artist -->
                        <p class="artist">{{ item.artist }}</p>
                    </li>
                </ul>
            </section>
            <!-- [2-2] 생성한 플레이리스트 -->
            <section class="play-list-created">
                <header>
                    <p class="btn-create"><i class="fa-solid fa-circle-plus"></i>새 플레이리스트 만들기</p>
                </header>
                <ul class="list-box">
                    <li>
                        <div class="thumb-img">
                            <img src="../assets/img/thumb/1.jpg" alt="playlist_thumbnail">
                        </div>
                        <p class="playlist-name">요즘 많이 듣는 곡</p>
                        <span class="music-count">10</span>
                    </li>
                    <li>
                        <div class="thumb-img">
                            <img src="../assets/img/thumb/1.jpg" alt="playlist_thumbnail">
                        </div>
                        <p class="playlist-name">요즘 많이 듣는 곡</p>
                        <span class="music-count">10</span>
                    </li>
                    <li>
                        <div class="thumb-img">
                            <img src="../assets/img/thumb/1.jpg" alt="playlist_thumbnail">
                        </div>
                        <p class="playlist-name">요즘 많이 듣는 곡</p>
                        <span class="music-count">10</span>
                    </li>
                    <li>
                        <div class="thumb-img">
                            <img src="../assets/img/thumb/1.jpg" alt="playlist_thumbnail">
                        </div>
                        <p class="playlist-name">요즘 많이 듣는 곡</p>
                        <span class="music-count">10</span>
                    </li>
                    <li>
                        <div class="thumb-img">
                            <img src="../assets/img/thumb/1.jpg" alt="playlist_thumbnail">
                        </div>
                        <p class="playlist-name">비오는 날 듣기 좋은 명곡들 플레이리스트</p>
                        <span class="music-count">3</span>
                    </li>
                </ul>
            </section>
        </div>
</template>

<script>
export default {
    methods: {
        toggleCheck (item) {
            this.$store.commit('toggleCheck', { item })
        },
        playMusic (item) {
            this.$store.commit('playMusic', { item })
        },
        selectMusic (item) {
            this.$store.commit('selectMusic', { item })
        }
    }

}
</script>

<style scoped>
#tab-box {
    width: 100%;
    /* 60(button) & 288(list) */
    height: 344px;
    position: relative;
}
.tab-btns-bg {
    width: 165px;
    height: 27px;
    background-color: #070707;
    border-radius: 32px;
    position: absolute;
    top: 13px;
    left: 50%;
    margin-left: -82.5px;
}
/* [1] tab_btns */
input[type="radio"] {
    display: none;
}
.tab-btn {
    display: block;
    height: 27px;
    border-radius: 32px;
    position: absolute;
    top: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.btn-list-all {
    width: 60px;
    left: 70px;
}
.tab-btn > p {
    color: var(--font-gray);
    font-size: 12px;
    /* font-weight: bold; */
}
.tab-btn > p > span {
    padding-left: 3px;
}
.btn-list-created {
    width: 105px;
    right: 70px;
}
#tab1:checked + label,
#tab2:checked + label {
    background-color: var(--selected-bg-gray);
}
#tab1:checked + label > p,
#tab2:checked + label > p {
    color: var(--font-point-white);
}
/* [2] section: play list */
#tab-box > section {
    width: 100%;
    height: 287px;
    position: absolute;
    top: 50px;
    left: 0;
    overflow: hidden;
}
.play-list-all {
    display: none;
    z-index: 900;
}
/* tab2) 생성한 플레이리스트 섹션 */
.play-list-created {
    display: none;
    z-index: 800;
}
/* tab button 선택에 따라 리스트 전환 */
#tab1:checked ~ .play-list-all {
    display: block;
}
#tab2:checked ~ .play-list-created {
    display: block;
}
/* [2-1] tab1) 전체 음악 리스트 */
/* header */
.play-list-all .btns-container {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
}
.play-list-all .music-count {
    font-size: 10.5px;
    font-weight: bolder;
    line-height: 37px;
    color: var(--font-gray);
}
/* listbox */
.play-list-all .list-box {
    width: 100%;
    height: 247px;
    padding-bottom: 40px;
    overflow: scroll;
}
.play-list-all .list-box li {
    width: 100%;
    height: 37px;
    display: flex;
    align-items: center;
}
/* checkbox */
input[type="checkbox"] {
    display: none;
}
.checkbox-wrap {
    display: block;
    margin: 0 10px 0 13px;
    position: relative;
    width: 13px;
    height: 13px;
    border: 2px solid #b9b9b96c;
    box-sizing: border-box;
    border-radius: 2px;
    cursor: pointer;
}
.checkbox-wrap .icons-check {
    display: none;
}
.checkbox-wrap .icon-small-square {
    width: 6px;
    height: 8px;
    background-color: var(--bg-black);
    position: absolute;
    top: -2px;
    right: -2px;
    z-index: 700;
}
.checkbox-wrap .fa-check {
    color: var(--point-green);
    font-size: 8px;
    position: absolute;
    top: -1.2px;
    right: 0;
    z-index: 750;
}
.check-btn:checked + .icons-check {
    display: block;
}
/* music title */
.play-list-all .list-box p {
    color: var(--font-gray);
    font-size: 13px;
    line-height: 37px;
}
.play-list-all .list-box .title {
    width: 150px;
    max-width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.play-list-all .list-box .artist {
    width: 62px;
    max-width: 62px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 30px;
}
/* 재생중 리스트 효과 */
.play-list-all .list-box li.playing-now > p {
    color: var(--point-green);
}
/* [2-2] tab2) 생성한 음악 리스트 */
/* header */
.play-list-created > header {
    width: 100%;
    height: 37px;
}
.play-list-created > header .btn-create {
    font-size: 12px;
    color: var(--font-gray);
    line-height: 37px;
    padding-left: 15px;
    cursor: pointer;
}
.fa-circle-plus {
    padding-right: 5px;
}
/* listbox */
.play-list-created .list-box {
    width: 100%;
    height: 100%;
    overflow: scroll;
}
.play-list-created .list-box li {
    width: 100%;
    height: 55px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    cursor: pointer;
}
.play-list-created .list-box li:hover {
    background-color: var(--selected-bg-gray-opacity);
    transition: 0.02s all ease;
}
.play-list-created .list-box li:last-child {
    margin-bottom: 25px;
}
.play-list-created .thumb-img {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
}
.play-list-created .thumb-img > img {
    width: 100%;
}
.play-list-created .playlist-name {
    color: var(--font-gray);
    font-size: 13px;
    line-height: 40px;
    padding-left: 10px;
    max-width: 170px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.play-list-created .music-count {
    color: var(--font-gray);
    font-size: 11px;
    padding: 2px 6px;
    border: 1px solid var(--font-gray);
    border-radius: 10px;
    margin-left: 5px;
}
/* 선택 효과 */
.list-box ._click {
    background-color: var( --selected-bg-gray-opacity);
}
.list-box ._click .icon-small-square {
    background-color: rgba(51, 51, 51);
}
</style>
