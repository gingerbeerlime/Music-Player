<template>
    <ul class="audio-icon">
        <li class="audio-bar bar1"></li>
        <li class="audio-bar bar2"></li>
        <li class="audio-bar bar3"></li>
    </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
.audio-icon {
    display: block;
    width: 10px;
    height: 10px;
    padding: 0;
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
}
.audio-bar {
    width: 2px;
    background-color: var(--point-green);
    margin-top: auto;
    border-radius: 0.5px;
}
.bar1 {
    height: 6px;
    animation: moveBar1 1s linear infinite;
}
.bar2 {
    height: 10px;
    animation: moveBar2 1s linear infinite;
}
.bar3 {
    height: 2px;
    animation: moveBar3 1s linear infinite;
}
@keyframes moveBar1 {
    0% {
        height: 6px;
    }
    25% {
        height: 10px
    }
    50% {
        height: 4px;
    }
    75% {
        height: 0px;
    }
    100% {
        height: 6px;
    }
}
@keyframes moveBar2 {
    0% {
        height: 10px;
    }
    25% {
        height: 4px
    }
    50% {
        height: 0px;
    }
    75% {
        height: 6px;
    }
    100% {
        height: 10px;
    }
}
@keyframes moveBar3 {
    0% {
        height: 2px;
    }
    25% {
        height: 6px
    }
    40% {
        height: 10px;
    }
    60% {
        height: 6px;
    }
    75% {
        height: 3px;
    }
    90% {
        height: 0;
    }
    100% {
        height: 2px;
    }
}
</style>
