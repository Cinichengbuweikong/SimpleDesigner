<template>
    <div class="designerView" :style="cssVars">  <!-- 设计视口盒子 -->
        <div class="designer">
            <iframe src="" frameborder="0"></iframe>
            <canvas style="width: 100%; height: 100%; position: absolute; pointer-events: none;"></canvas>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import getCurrentActiveComponentObject from '../../../utils/getCurrentActiveComponentObject.js';


export default {
    name: "designerComponent",

    data() {
        const vuexGetters = mapGetters({
            currentComponentExtraData: `${this.stateName}/getCurrentActiveComponentExtraData`
        });

        return {
            vuexGetters
        };
    },

    props: {
        stateName: {
            // 本组件需要使用哪个 state 下的信息?
            type: String,
            required: true
        },
    },

    computed: {
        currentComponentObject() {
            // 获取当前被激活组件的额外信息数据
            return getCurrentActiveComponentObject(this.stateName);
        },

        currentComponentExtraData() {
            return this.vuexGetters.currentComponentExtraData.call(this);
        },

        cssVars() {
            return {
                "--designerWidth":
                    this.currentComponentObject.width >= 0
                    ? `${this.currentComponentObject.width}px`
                    : "0px",
                
                "--aspectRatio": 
                    this.currentComponentObject.aspectRatio
                    ? this.currentComponentObject.aspectRatio
                    : "16/9",
                
                "--scale": 
                    this.currentComponentExtraData.scale
                    ? this.currentComponentExtraData.scale
                    : "1",
                
                "--overFlow":
                    this.currentComponentExtraData.lockState
                    ? "hidden"
                    : "scroll"
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

    overflow: var(--overFlow);

    .designer {
        width: var(--designerWidth);
        aspect-ratio: var(--aspectRatio);

        border: 1px dashed #ddd;

        position: relative;
        left: 15px;
        top: 15px;

        pointer-events: none;

        transform: scale(var(--scale));
        transform-origin: left top;

        iframe {
            width: 100%;
            height: 100%;

            position: absolute;

            pointer-events: auto;
        }
    }
}
</style>