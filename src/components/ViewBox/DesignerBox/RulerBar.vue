<template>
    <div
        class="rulerBar"
        :style="cssVars"
    >  <!-- 标尺盒子 -->
        <div class="rulerX" ref="rulerBarX">
            <span
                class="RulerXUnit"
                v-for="i in xUnitCount"
                :key="i"
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                
                <span :id="`X${i}`">
                    <span id="tag">{{100 * i}}{{ i === xUnitCount ? "px" : "" }}</span>
                </span>
            </span>
        </div>

        <div class="rulerY" ref="rulerBarY">
            <span
                class="RulerYUnit"
                v-for="i in yUnitCount"
                :key="i"
            >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                
                <span :id="`Y${i}`">
                    <span id="tag">{{100 * i}}{{ i === yUnitCount ? "px" : "" }}</span>
                </span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "rulerBarComponent",

    data() {
        return {
            // X 轴上应有几个大刻度
            xUnitCount: 10,
            // Y 轴上应有几个大刻度
            yUnitCount: 10,

            scrollBarWidth: 17,
        };
    },

    props: {
        ScrollBarWidth: {
            type: Number,
            default: 17
        }
    },

    methods: {
        calcUintCount() {
            // 计算横纵标尺中应有几个大单位 每个大单位 100 px
            // 一个大单位包含 5 个小单位
            const rulerBarXStyle = getComputedStyle(this.$refs.rulerBarX);
            const rulerBarXWidth = rulerBarXStyle.width.split("px")[0] - this.scrollBarWidth;
            this.xUnitCount = Math.floor(Number(rulerBarXWidth) / 100);

            const rulerBarYStyle = getComputedStyle(this.$refs.rulerBarY);
            const rulerBarYHeight = rulerBarYStyle.height.split("px")[0] - this.scrollBarWidth;
            this.yUnitCount = Math.floor(Number(rulerBarYHeight) / 100);
        }
    },

    computed: {
        cssVars() {
            return {
                "--scrollBarWidth": `${this.ScrollBarWidth}px`,
            };
        }
    },

    mounted() {
        this.calcUintCount();
        window.addEventListener("resize", this.calcUintCount);
    },

    beforeDestroy() {
        window.removeEventListener("resize", this.calcUintCount);
    }
}
</script>

<style scoped lang="scss">
.rulerBar {
    width: 100%;
    height: 100%;

    pointer-events: none;

    position: absolute;
    left: 0;
    top: 0;

    .rulerX{
        width: calc(100% - 15px - var(--scrollBarWidth));
        // 100% 的宽度 减去滚动条的宽度 减去标尺应向右侧偏移 15px 的距离
        height: 15px;

        position: absolute;
        left: 15px;

        box-sizing: border-box;

        border-left: 1px solid $textColor;

        .RulerXUnit {
            display: inline-block;
            
            width: 100px;
            height: 100%;

            span {
                display: inline-block;
                width: 19px;
                height: 50%;

                border-right: 1px solid $textColor;
                position: relative;
                top: -50%;
            }

            span[id^="X"] {
                height: 100%;
                top: 0;

                #tag {
                    color: $textColor;
                    font-size: 12px;

                    border: 0;

                    position: absolute;
                    right: -50%;
                    top: 30%;
                }
            }
        }
    }

    .rulerY {
        width: 15px;
        height: calc(100% - 15px);

        position: absolute;
        top: 15px;

        box-sizing: border-box;

        border-top: 1px solid $textColor;

        .RulerYUnit {
            display: block;
            width: 100%;
            height: 100px;

            span {
                display: block;

                width: 50%;
                height: 19px;

                border-bottom: 1px solid $textColor;
            }

            span[id^="Y"] {
                width: 100%;
                height: 19px;

                #tag {
                    color: $textColor;
                    font-size: 12px;

                    border: 0;

                    position: relative;
                    top: 30%;
                    left: -5%;
                }
            }
        }
    }
}
</style>