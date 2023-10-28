<template>
    <div class="layoutAsideComponentPanel">
        <p class="panelTitle">组件面板</p>

        <div class="panelBox">
            <p class="boxTitle">
                页面组件:
                <span @click="addComponent('page')" ref="addPageComponentButton">+</span>
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
                        <i
                            class="iconfont icon-delete_px_rounded"
                            :ref="`deleteCompRef_${comp.id}`"
                            @click.stop="deleteComponent(comp.id)"
                        >
                            <span>删除</span>
                        </i>
                        <i
                            class="iconfont icon-code_px_rounded-copy"
                            @click.stop="openComponent(comp.id, 'code')"
                        >
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
                <span @click="addComponent('normal')" ref="addNormalComponentButton">+</span>
            </p>

            <ul class="boxContent">
                <li
                    class="boxItem"
                    v-for="comp in allNormalComponents"
                    @click="openComponent(comp.id, 'design')"
                    :key="comp.id"
                >
                    <span class="name">
                        {{comp.name}}.vue
                    </span>
                    
                    <span class="tool">
                        <i
                            class="iconfont icon-delete_px_rounded"
                            :ref="`deleteCompRef_${comp.id}`"
                            @click.stop="deleteComponent(comp.id)"
                        >
                            <span>删除</span>
                        </i>

                        <i
                            class="iconfont icon-code_px_rounded-copy"
                            @click.stop="openComponent(comp.id, 'code')"
                        >
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
            // 打开某个组件的函数
            this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", { id, type });
        },

        addComponent(componentType) {
            // 添加一个页面组件
            // componentType: "page" | "normal"  要新建的组件的类型

            // 设置要新建的组件的类型
            this.$store.commit("AppState/SET_NEW_COMPONENT_TYPE", componentType);

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

        deleteComponent(id) {
            // 删除一个组件
            // id: String  要被删除的组件的 id

            // 本函数可用于删除页面组件或是删除普通组件
            // 因为函数内部通过 id 来辨别要删除哪个组件 而不管是页面组件还是普通组件 它们的 id 都是唯一的
            // 一个 id 唯一确定一个组件 因此本方法可用于删除普通组件或是页面组件

            // 首先设置要被删除的组件的 id
            this.$store.commit("AppState/SET_DELETE_COMPONENT_ID", id);

            // 获取当前删除按钮的位置
            // 这里的 this.$refs[`deleteCompRef_${id}`] 获取到的是一个包含元素 ref 的数组
            // 数组中只有一个元素 就是被引用的元素 我们需要获取到它
            const deleteElem = this.$refs[`deleteCompRef_${id}`][0];

            const { centerXRatio, centerYRatio } = getElementPosition(deleteElem);

            // 而后显示删除对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "DeleteComponentDialog",
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