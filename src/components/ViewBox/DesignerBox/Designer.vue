<template>
    <div class="designerView">  <!-- 设计视口盒子 -->
        <div class="designer" :style="cssVars">
            <iframe src="" frameborder="0"></iframe>
            <canvas style="width: 100%; height: 100%; position: absolute; pointer-events: none;"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    name: "designerComponent",

    props: {
        DesignerPointEvents: {
            // 设置当前组件内的 iframe 是否响应 pointer-events
            type: Boolean,
            required: true
        },

        CurrentComponentData: {
            // 获取当前被激活的组件的数据
            // 本组件需要显示这个对象中包含的组件数据
            type: Object,
            required: true,
        },

        CurrentComponentExtraData: {
            // 获取当前被激活的组件的额外数据
            // 本组件需要根据这个对象中包含的额外数据来调整本组件内的界面的信息
            type: Object,
            required: true,
        },
    },

    computed: {
        cssVars() {
            return {
                "--iframePointerEvents":
                    this.DesignerPointEvents === false ? "none" : "auto",
                
                "--designerWidth":
                    this.CurrentComponentExtraData.width >= 0
                    ? `${this.CurrentComponentExtraData.width}px`
                    : "0px",
                
                "--aspectRatio": 
                    this.CurrentComponentExtraData.aspectRatio
                    ? this.CurrentComponentExtraData.aspectRatio
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

        iframe {
            width: 100%;
            height: 100%;

            position: absolute;

            pointer-events: var(--iframePointerEvents);
        }
    }
}
</style>