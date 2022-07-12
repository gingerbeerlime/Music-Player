<template>
    <div id="player-control-box">
        <progress-bar></progress-bar>
        <player-tool></player-tool>
    </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'
import PlayerTool from '../components/PlayerTool.vue'

export default {
    components: {
        ProgressBar,
        PlayerTool
    }
}
</script>

<style>
    #player-control-box {
        width: 100%;
        height: 85px;
    }
</style>
