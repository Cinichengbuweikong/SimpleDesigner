<template>
    <div class="designerView">  <!-- 设计视口盒子 -->
        <div class="designer" :style="cssVars">
            <iframe src="" frameborder="0"></iframe>
            <canvas style="width: 100%; height: 100%; position: absolute; pointer-events: none;"></canvas>
        </div>
    </div>
</template>

<script>
import getCurrentActiveComponentObject from '../../../utils/getCurrentActiveComponentObject.js';


export default {
    name: "designerComponent",

    props: {
        stateName: {
            // 本组件需要使用哪个 state 下的信息?
            type: String,
            required: true
        }
    },

    computed: {
        currentComponentExtraData() {
            // 获取当前被激活组件的额外信息数据
            return getCurrentActiveComponentObject(this.stateName);
        },

        cssVars() {
            return {
                "--designerWidth":
                    this.currentComponentExtraData.width >= 0
                    ? `${this.currentComponentExtraData.width}px`
                    : "0px",
                
                "--aspectRatio": 
                    this.currentComponentExtraData.aspectRatio
                    ? this.currentComponentExtraData.aspectRatio
                    : "16/9"
            };
        }
    },
}
</script>

<style lang="scss" scoped>
.designerView {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -20%);

    overflow: scroll;

    .designer {
        width: var(--designerWidth);
        aspect-ratio: var(--aspectRatio);

        border: 1px dashed #ddd;

        position: relative;
        margin: 15px;

        pointer-events: none;

        iframe {
            width: 100%;
            height: 100%;

            position: absolute;

            pointer-events: auto;
        }
    }
}
</style>