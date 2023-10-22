<template>
    <div class="designer">  <!-- 设计视口盒子 -->
        <iframe src="" frameborder="0"></iframe>
        <canvas style="width: 100%; height: 100%; position: absolute; pointer-events: none;"></canvas>
    </div>
</template>

<script>
export default {
    name: "designerComponent",
}
</script>

<style lang="scss" scoped>
.designer {
    width: 600px;
    height: 400px;

    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -20%);

    border: 1px dashed #ddd;

    iframe {
        width: 100%;
        height: 100%;

        position: absolute;
    }
}
</style>