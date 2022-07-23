<template>
    <div class="add-alert">
        <p class="message">반복을 사용하지 않습니다.</p>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.add-alert {
    display: flex;
    width: 275px;
    height: 50px;
    background-color: var(--modal-bg-gray);
    position: absolute;
    bottom: 8px;
    left: 15px;
    z-index: 840;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
}
.add-alert .message {
    color: var(--font-point-white);
    font-size: 14px;
    line-height: 50px;
}
</style>
