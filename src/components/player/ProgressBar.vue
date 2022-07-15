<template>
    <div id="player-bar">
        <progress class="playing-bar" :value="currentPosition" min="0" max="100"></progress>
        <!-- time -->
        <ul class="playing-status">
            <!-- remaining time -->
            <li class="current-time">{{ $store.getters.getCurrentTime }}</li>
            <!-- total time -->
            <li class="running-time">{{ $store.getters.getPlayTime }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        currentPosition () {
            const nowPosition = 100 - ((this.$store.state.currentTime / this.$store.state.playTime) * 100)
            return nowPosition
        }
    }
}
</script>

<style scoped>
#player-bar {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
/* progress bar */
.playing-bar {
    appearance: none;
}
.playing-bar::-webkit-progress-bar {
    width: 275px;
    height: 2px;
    background-color: #070707;
    border-radius:10px;
    margin: 10px 0 0 15px;
    cursor: pointer;
}
.playing-bar::-webkit-progress-bar:hover {
    height: 4px;
    margin: 8px 0 0 15px;
    transition: 0.02s all ease;
}
.playing-bar::-webkit-progress-value {
    border-radius:10px;
    background: var(--point-green);
}
/* progress status */
.playing-status {
    width: 100%;
    height: 16px;
    display: flex;
}
.playing-status > li {
    font-size: 11px;
    font-weight: bold;
    line-height: 16px;
}
.current-time {
    margin: 0 8px 0 15px;
    color: var(--font-point-white);
}
.running-time {
    color: var(--font-gray);
}
</style>
