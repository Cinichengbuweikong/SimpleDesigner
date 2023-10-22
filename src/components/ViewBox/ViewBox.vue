<template>
    <div class="viewBox">  <!-- 整个右侧盒子 -->
        <TabBar />
        <DesignerBox />
    </div>
</template>

<script>
import DesignerBox from './DesignerBox/DesignerBox.vue';
import TabBar from './TabBar/TabBar.vue';

export default {
    name: "ViewBoxComponent",

    components: {
        TabBar,
        DesignerBox,
    }
}
</script>

<style lang="scss" scoped>
.viewBox {
    flex-grow: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>