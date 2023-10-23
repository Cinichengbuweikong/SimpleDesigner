<template>
    <div
        class="rulerBar"
        :style="cssVars"
    >  <!-- 标尺盒子 -->
        <div class="rulerX" ref="rulerBarX">
            <span id="X01"></span>
            <span id="X02"></span>
            <span id="X03"></span>
            <span id="X04"></span>
            
            <span id="X1">
                <span id="X1Tag">{{ unitWidth.toFixed(2) }}</span>
            </span>

            <span id="X11"></span>
            <span id="X12"></span>
            <span id="X13"></span>
            <span id="X14"></span>
            
            <span id="X2">
                <span id="X2Tag">{{ (unitWidth * 2).toFixed(2) }}</span>
            </span>

            <span id="X21"></span>
            <span id="X22"></span>
            <span id="X23"></span>
            <span id="X24"></span>

            <span id="X3">
                <span id="X3Tag">{{ (unitWidth * 3).toFixed(2) }}</span>
            </span>

            <span id="X31"></span>
            <span id="X32"></span>
            <span id="X33"></span>
            <span id="X34"></span>

            <span id="X4">
                <span id="X4Tag">{{ (unitWidth * 4).toFixed(2) }}</span>
            </span>

            <span id="X41"></span>
            <span id="X42"></span>
            <span id="X43"></span>
            <span id="X44"></span>

            <span id="X5">
                <span id="X5Tag">{{ (unitWidth * 5).toFixed(2) }}</span>
            </span>

            <span id="X51"></span>
            <span id="X52"></span>
            <span id="X53"></span>
            <span id="X54"></span>

            <span id="X6">
                <span id="X6Tag">{{ (unitWidth * 6).toFixed(2) }}</span>
            </span>

            <span id="X61"></span>
            <span id="X62"></span>
            <span id="X63"></span>
            <span id="X64"></span>

            <span id="X7">
                <span id="X7Tag">{{ (unitWidth * 7).toFixed(2) }}</span>
            </span>

            <span id="X71"></span>
            <span id="X72"></span>
            <span id="X73"></span>
            <span id="X74"></span>

            <span id="X8">
                <span id="X8Tag">{{ (unitWidth * 8).toFixed(2) }}</span>
            </span>

            <span id="X81"></span>
            <span id="X82"></span>
            <span id="X83"></span>
            <span id="X84"></span>

            <span id="X9">
                <span id="X9Tag">{{ (unitWidth * 9).toFixed(2) }}</span>
            </span>

            <span id="X91"></span>
            <span id="X92"></span>
            <span id="X93"></span>
            <span id="X94"></span>

            <span id="X10">
                <span id="X10Tag">px</span>
            </span>
        </div>

        <div class="rulerY" ref="rulerBarY">
            <span id="Y01"></span>
            <span id="Y02"></span>
            <span id="Y03"></span>
            <span id="Y04"></span>
            
            <span id="Y1">
                <span id="Y1Tag">{{ unitHeight.toFixed(2) }}</span>
            </span>

            <span id="Y11"></span>
            <span id="Y12"></span>
            <span id="Y13"></span>
            <span id="Y14"></span>
            
            <span id="Y2">
                <span id="Y2Tag">{{ (unitHeight * 2).toFixed(2) }}</span>
            </span>

            <span id="Y21"></span>
            <span id="Y22"></span>
            <span id="Y23"></span>
            <span id="Y24"></span>

            <span id="Y3">
                <span id="Y3Tag">{{ (unitHeight * 3).toFixed(2) }}</span>
            </span>

            <span id="Y31"></span>
            <span id="Y32"></span>
            <span id="Y33"></span>
            <span id="Y34"></span>

            <span id="Y4">
                <span id="Y4Tag">{{ (unitHeight * 4).toFixed(2) }}</span>
            </span>

            <span id="Y41"></span>
            <span id="Y42"></span>
            <span id="Y43"></span>
            <span id="Y44"></span>

            <span id="Y5">
                <span id="Y5Tag">{{ (unitHeight * 5).toFixed(2) }}</span>
            </span>

            <span id="Y51"></span>
            <span id="Y52"></span>
            <span id="Y53"></span>
            <span id="Y54"></span>

            <span id="Y6">
                <span id="Y6Tag">{{ (unitHeight * 6).toFixed(2) }}</span>
            </span>

            <span id="Y61"></span>
            <span id="Y62"></span>
            <span id="Y63"></span>
            <span id="Y64"></span>

            <span id="Y7">
                <span id="Y7Tag">{{ (unitHeight * 7).toFixed(2) }}</span>
            </span>

            <span id="Y71"></span>
            <span id="Y72"></span>
            <span id="Y73"></span>
            <span id="Y74"></span>

            <span id="Y8">
                <span id="Y8Tag">{{ (unitHeight * 8).toFixed(2) }}</span>
            </span>

            <span id="Y81"></span>
            <span id="Y82"></span>
            <span id="Y83"></span>
            <span id="Y84"></span>

            <span id="Y9">
                <span id="Y9Tag">{{ (unitHeight * 9).toFixed(2) }}</span>
            </span>

            <span id="Y91"></span>
            <span id="Y92"></span>
            <span id="Y93"></span>
            <span id="Y94"></span>

            <span id="Y10">
                <span id="Y10Tag">px</span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "rulerBarComponent",

    data() {
        return {
            unitWidth: 10,
            unitHeight: 10,
        };
    },

    props: {
        ScrollBarWidth: {
            type: Number,
            default: 17
        }
    },

    methods: {
        calcUintLength() {
            // 计算横纵标尺中 每个大单位的长度 (px)
            // 一个大单位包含 5 个小单位
            const rulerBarXStyle = getComputedStyle(this.$refs.rulerBarX);
            const rulerBarXWidth = rulerBarXStyle.width.split("px")[0];
            this.unitWidth = Number(rulerBarXWidth) / 10;

            const rulerBarYStyle = getComputedStyle(this.$refs.rulerBarY);
            const rulerBarYHeight = rulerBarYStyle.height.split("px")[0];
            this.unitHeight = Number(rulerBarYHeight) / 10;
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
        window.addEventListener("resize", this.calcUintLength);
    },

    beforeDestroy() {
        window.removeEventListener("resize", this.calcUintLength);
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
        height: 15px;

        position: absolute;
        left: 15px;

        box-sizing: border-box;

        border-left: 1px solid $textColor;

        span {
            display: inline-block;
            
            width: calc(2% - 1px);
            height: 50%;
            
            border-right: 1px solid $textColor;

            position: relative;
            top: -50%;

            &#X1, &#X2, &#X3, &#X4, &#X5, &#X6, &#X7, &#X8, &#X9, &#X10 {
                height: 100%;
                top: 0;

                position: relative;
            }

            #X1Tag, #X2Tag, #X3Tag, #X4Tag, #X5Tag, #X6Tag, #X7Tag, #X8Tag, #X9Tag, #X10Tag {
                font-size: 10px;
                color: $textColor;
                
                position: absolute;
                left: 40%;
                top: 2px;
                transform: translateY(-50%);

                border: 0;

                background-color: $backgroundColor;
            }
        }
    }

    .rulerY {
        width: 15px;
        height: calc(100% - 15px - var(--scrollBarWidth));

        position: absolute;
        top: 15px;

        box-sizing: border-box;

        border-top: 1px solid $textColor;

        span {
            display: block;
            
            width: 50%;
            height: calc(2% - 1px);
            
            border-bottom: 1px solid $textColor;

            position: relative;

            &#Y1, &#Y2, &#Y3, &#Y4, &#Y5, &#Y6, &#Y7, &#Y8, &#Y9, &#Y10 {
                width: 100%;
            }

            #Y1Tag, #Y2Tag, #Y3Tag, #Y4Tag, #Y5Tag, #Y6Tag, #Y7Tag, #Y8Tag, #Y9Tag, #Y10Tag {
                font-size: 10px;
                color: $textColor;
                
                position: absolute;
                top: 2px;

                border: 0;

                background-color: $backgroundColor;

                &:hover {
                    opacity: 0;
                }
            }
        }
    }
}
</style>