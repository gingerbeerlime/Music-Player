<template>
    <nav id="tool-bar">
        <ul class="btns-group">
            <li><i class="fa-solid fa-window-minimize"></i></li>
            <li><i class="fa-solid fa-xmark"></i></li>
        </ul>
    </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
#tool-bar {
    width: 100%;
    height: 50px;
}
#tool-bar .btns-group {
    float: right;
    width: 50px;
    height: 100%;
    display: flex;
    margin-right: 7px;
}
#tool-bar .btns-group li {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: var(--font-gray);
}
#tool-bar .btns-group li:hover {
    color: var(--font-point-white);
    transition: 0.02s all ease;

}
/* 최소화 */
#tool-bar .fa-window-minimize {
    font-size: 12px;
}
/* 닫기 */
#tool-bar .fa-xmark {
    font-size: 16px;
}
</style>
