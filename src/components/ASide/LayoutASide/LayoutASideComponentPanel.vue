<template>
    <div class="layoutAsideComponentPanel">
        <p class="panelTitle">组件面板</p>

        <div
            class="panelBox"
            @dragover.stop="onComponentListDragOver"
            @drop.stop="onPageComponentsDrop"
        >
            <p class="boxTitle">
                页面组件:
                <span @click="addComponent($event, 'page')" ref="addPageComponentButton">+</span>
            </p>

            <ul class="boxContent">
                <li
                    class="boxItem"
                    draggable="true"

                    v-for="comp in allPageComponents"
                    :key="comp.id"
                    @click="openComponent(comp.id, 'design')"
                    @click.right.stop="showMenu($event, comp.id, 'page')"

                    @dragstart="onComponentListItemDragStart($event, comp.id)"
                >
                    <span class="name">
                        {{comp.name}}.vue
                    </span>
                    
                    <span class="tool">
                        <i
                            class="iconfont icon-code_px_rounded-copy"
                            @click.stop="openComponent(comp.id, 'code')"
                        >
                            <span>代码</span>
                        </i>
                        <i class="iconfont icon-format_shapes_px_rounded">
                            <span>设计</span>
                        </i>
                    </span>
                </li>
            </ul>
        </div>

        <div
            class="panelBox"
            @dragover.stop="onComponentListDragOver"
            @drop.stop="onNormalComponentsDrop"
        >
            <p class="boxTitle">
                普通组件:
                <span @click="addComponent($event, 'normal')" ref="addNormalComponentButton">+</span>
            </p>

            <ul class="boxContent">
                <li
                    class="boxItem"
                    draggable="true"

                    v-for="comp in allNormalComponents"
                    @click="openComponent(comp.id, 'design')"
                    @click.right.stop="showMenu($event, comp.id, 'normal')"
                    :key="comp.id"

                    @dragstart="onComponentListItemDragStart($event, comp.id)"
                >
                    <span class="name">
                        {{comp.name}}.vue
                    </span>
                    
                    <span class="tool">
                        <i
                            class="iconfont icon-code_px_rounded-copy"
                            @click.stop="openComponent(comp.id, 'code')"
                        >
                            <span>代码</span>
                        </i>
                        <i class="iconfont icon-format_shapes_px_rounded">
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


export default {
    name: "layoutAsideComponentPanelComponent",

    methods: {
        openComponent(id, type) {
            // 打开某个组件的函数
            // id: String  要打开的组件的 id
            // type: "page" | "normal"  要新建的组件的类型
            this.$store.commit("LayoutPageState/ADD_OPENED_COMPONENT", { id, type });
        },

        addComponent(event, componentType) {
            // 添加一个页面组件
            // componentType: "page" | "normal"  要新建的组件的类型

            // 设置要新建的组件的类型
            this.$store.commit("AppState/SET_NEW_COMPONENT_TYPE", componentType);

            // 获取当前用户点击的位置
            const { clientX, clientY } = event;
            
            // 而后显示新建组件对话框
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "NewComponentDialog",
                left: clientX,
                top: clientY
            });
        },

        showMenu(event, id, type) {
            // 显示右键菜单的函数
            // event: Event  事件对象
            // id: String  被右键的组件的 id
            // type: "page" | "normal"  被右键的组件的类型

            // 首先禁用掉浏览器的默认行为
            event.preventDefault();

            // 设置当前被右键的组件项的数据
            this.$store.commit("AppState/SET_COMPONENT_MENU_DIALOG_DATA", {
                componentID: id,
                componentType: type
            });

            // 获取到当前鼠标的位置
            const { clientX, clientY } = event;
            
            // 在当前鼠标位置处显示 menu
            this.$store.commit("AppState/SET_DIALOG_STATE", {
                show: true,
                dialogCompName: "ComponentMenuDialog",
                left: clientX,
                top: clientY
            });
        },

        onComponentListItemDragStart(event, componentID) {
            // 当用户拖拽列表项时所执行的函数

            const data = {
                // 当前拖拽项的类型 这里表示被拖拽的是一个组件面板中的组件项
                type: "ComponentPanelItem",

                // 被拖拽的组件面板所表示的组件的 id
                id: componentID
            };

            event.dataTransfer.setData("Text", JSON.stringify(data));
        },

        onComponentListDragOver(event) {
            // 当用户把组件列表项拖拽到组件面板(页面或是普通)上时所执行的函数
            const data = event.dataTransfer.getData("Text");

            try {
                const { type } = JSON.parse(data);

                if (type !== "ComponentPanelItem") {
                    return ;
                }
            } catch {
                return ;
            }

            event.preventDefault();
        },

        onPageComponentsDrop(event) {
            // 当用户把组件列表项拖放在页面组件列表上时执行的函数

            const data = event.dataTransfer.getData("Text");

            try {
                const { type, id } = JSON.parse(data);

                if (type !== "ComponentPanelItem") {
                    return ;
                }

                if (this.allPageComponents[id]) {
                    // 说明当前组件已经在页面组件中了 不需要做任何事
                    return ;
                }

                this.$store.commit("AppState/MOVE_COMPONENT", {
                    componentID: id,
                    targetComponentType: "page"
                });
            } catch(e) {
                console.log(e);
                return ;
            }
        },

        onNormalComponentsDrop(event) {
            // 当用户把组件列表项拖放在普通组件列表上时执行的函数

            const data = event.dataTransfer.getData("Text");

            try {
                const { type, id } = JSON.parse(data);

                if (type !== "ComponentPanelItem") {
                    return ;
                }

                if (this.allNormalComponents[id]) {
                    // 说明当前组件已经在普通组件中了 不需要做任何事
                    return ;
                }

                this.$store.commit("AppState/MOVE_COMPONENT", {
                    componentID: id,
                    targetComponentType: "normal"
                });
            } catch(e) {
                console.log(e);
                return ;
            }
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