<template>
    <div class="layoutAsideComponentPanel">
        <p class="panelTitle">组件面板</p>

        <div class="panelBox">
            <p class="boxTitle">
                页面组件:
                <span>+</span>
            </p>

            <ul class="boxContent">
                <li
                    class="boxItem"
                    v-for="comp in allPageComponents"
                    :key="comp.id"
                    @click="openComponent(comp.id, 'design')"
                >
                    <span class="name">
                        {{comp.name}}.vue
                    </span>
                    
                    <span class="tool">
                        <i class="iconfont icon-code_px_rounded-copy">
                            <span>代码</span>
                        </i>
                        <i class="iconfont icon-create_px_rounded-copy">
                            <span>设计</span>
                        </i>
                    </span>
                </li>
            </ul>
        </div>

        <div class="panelBox">
            <p class="boxTitle">
                普通组件:
                <span>+</span>
            </p>

            <ul class="boxContent">
                <li
                    class="boxItem"
                    v-for="comp in allNormalComponents"
                    :key="comp.id"
                >
                    <span class="name">
                        {{comp.name}}.vue
                    </span>
                    
                    <span class="tool">
                        <i class="iconfont icon-code_px_rounded-copy">
                            <span>代码</span>
                        </i>
                        <i class="iconfont icon-create_px_rounded-copy">
                            <span>设计</span>
                        </i>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "layoutAsideComponentPanelComponent",

    methods: {
        openComponent(id, type) {
            // 生成打开某个组件的函数
            this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", { id, type });
        }
    },

    computed: {
        ...mapState("LayoutPageState", {}),

        ...mapState("AppState", {
            allPageComponents: state => state.components.pageComponents,
            allNormalComponents: state => state.components.normalComponents,
        })
    }
}
</script>

<style lang="scss" scoped>
.layoutAsideComponentPanel {
    .panelTitle {
        color: $textColor;
        font-size: 14px;
        padding: 10px 5px;

        border-bottom: 1px solid $foregroundColor;
    }

    .panelBox {
        padding: 5px 5px;
        border-bottom: 1px solid $foregroundColor;

        .boxTitle {
            color: $textColor;
            font-size: 14px;

            padding: 5px 0;

            position: relative;

            span {
                display: block;
                width: 20px;
                height: 20px;

                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);

                text-align: center;
                line-height: 20px;
                font-size: 20px;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }
            }
        }

        .boxContent {
            list-style: none;

            padding-left: 10px;

            color: $textColor;
            font-size: 14px;

            .boxItem {
                padding: 3px 2px;

                display: flex;
                flex-direction: row;
                justify-content: space-between;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }

                .name {
                    overflow: auto;
                }

                .tool > i {
                    margin: 0 5px;

                    position: relative;

                    &:hover {
                        background-color: lighten($color: $barItemHoverBackgroundColor, $amount: 20);

                        span {
                            display: block;
                        }
                    }

                    span {
                        display: none;
                        width: 40px;

                        font-size: 14px;
                        text-align: center;

                        position: absolute;
                        left: -50%;
                        top: -150%;

                        background-color: $backgroundColor;

                        border: 1px solid $textColor;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
}
</style>