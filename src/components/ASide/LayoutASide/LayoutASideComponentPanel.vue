<template>
    <div class="layoutAsideComponentPanel">
        <p class="panelTitle">组件面板</p>

        <div class="panelBox">
            <p class="boxTitle">
                页面组件:
                <span @click="addPageComponent" ref="addPageComponentButton">+</span>
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
                        <i class="iconfont icon-delete_px_rounded">
                            <span>删除</span>
                        </i>
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
                <span @click="addNormalComponent" ref="addNormalComponentButton">+</span>
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
                        <i class="iconfont icon-delete_px_rounded">
                            <span>删除</span>
                        </i>

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
import { mapState } from 'vuex';

import getElementPosition from "../../../utils/getElementPosition";

export default {
    name: "layoutAsideComponentPanelComponent",

    methods: {
        openComponent(id, type) {
            // 生成打开某个组件的函数
            this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", { id, type });
        },

        addPageComponent() {
            // 添加一个页面组件

            // 设置要新建的组件的类型
            this.$store.commit("AppState/SET_NEW_COMPONENT_TYPE", "page");

            // 获取当前按钮相对于整个屏幕的位置(百分比)
            const { centerXRatio, centerYRatio } = getElementPosition(this.$refs.addPageComponentButton);
            
            // 而后显示新建组件对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "NewComponentDialog",
                left: centerXRatio,
                top: centerYRatio
            });
        },

        addNormalComponent() {
            // 添加一个普通组件

            // 设置要新建的组件的类型
            this.$store.commit("AppState/SET_NEW_COMPONENT_TYPE", "normal");

            // 获取当前按钮相对于整个屏幕的位置(百分比)
            const { centerXRatio, centerYRatio } = getElementPosition(this.$refs.addNormalComponentButton);
            
            // 而后显示新建组件对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "NewComponentDialog",
                left: centerXRatio,
                top: centerYRatio
            });
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

                cursor: pointer;

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

                position: relative;

                cursor: pointer;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;

                    .tool {
                        display: block;
                    }
                }

                .name {
                    overflow: auto;
                }

                .tool {
                    display: none;

                    padding: 2px 0;

                    position: absolute;
                    top: 0;
                    right: 0;
                    // transform: translateY(-50%);

                    background-color: $backgroundColor;

                    i {
                        margin: 0 3px;

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
}
</style>