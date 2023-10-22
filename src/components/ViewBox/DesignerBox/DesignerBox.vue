<template>
    <div class="designerBox">  <!-- 设计视口 -->
        <Designer />
        <RulerBar />
    </div>
</template>

<script>
import Designer from './Designer.vue';
import RulerBar from './RulerBar.vue';

export default {
    name: "designerBoxComponent",

    components: {
        Designer,
        RulerBar,
    }
}
</script>

<style lang="scss" scoped>
.designerBox {
    width: 100%;
    height: 100%;

    flex-grow: 1;

    position: relative;

    overflow: auto;
}
</style>