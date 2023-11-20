<template>
    <div
        class="tabItem"
        draggable="true"
        :class="tabItemClass"
        @click="changeCurrentItem"

        @dragstart="startDrag"
        @dragover.stop="dragOver"
        @drop.stop="changeOrderByDrag"
    >  <!-- 标签项 -->
        <p>{{currentItemType}}: {{itemName}}</p>
        <i class="iconfont icon-clear_px_rounded" @click="closeItem"></i>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "TabBarItemComponent",

    data() {
        const vuexState = mapState(this.stateName, {
            currentTab: state => state.tabBar.currentTab,
        });

        return {
            vuexState
        }
    },

    props: {
        itemid: {
            // 本标签项所代表的组件的组件 id
            type: String,
            required: true,
        },

        itemName: {
            // 本标签项所代表的组件的组件名
            type: String,
            required: true,
        },

        itemType: {
            // 本标签项所代表的页面的类型 是设计页面还是代码页面
            type: String,
            default: ""
        },

        isActive: {
            // 当前标签页是否是被激活的?
            type: Boolean,
            required: true
        },

        BeforePageChange: {
            // 在标签页切换之前所执行的函数
            type: Function,
            default: (toID, type, actionType) => {}
        },

        AfterPageChange: {
            // 在标签页切换之后所执行的函数
            type: Function,
            default: (fromID, type, actionType) => {}
        },

        stateName: {
            // 本组件需要使用哪个 state 下的标签栏数据 ?
            // 取值各个 state 命名空间的名字 例如 "LayoutPageState"
            type: String,
            required: true
        }
    },

    methods: {
        changeCurrentItem() {
            // 在标签页切换之前所执行的函数
            this.BeforePageChange(this.currentActiveTabID, this.currentActiveTabType, "change");

            this.$store.commit(
                `${this.stateName}/SET_CURRENT_TAB`,
                { id: this.itemid, type: this.itemType }
            );

            // 在标签页切换之后所执行的函数
            this.AfterPageChange(this.itemid, this.itemType, "change");
        },

        closeItem() {
            // 在标签页切换之前所执行的函数
            this.BeforePageChange(this.currentActiveTabID, this.currentActiveTabType, "delete");

            this.$store.commit(
                `${this.stateName}/REMOVE_OPENED_COMPONENTS`,
                { id: this.itemid, type: this.itemType }
            );

            // 在标签页切换之后所执行的函数
            this.AfterPageChange(this.itemid, this.itemType, "delete");
        },

        startDrag(event) {
            // 当用户把标签项拖动到标签项上时触发
            // 我们认为此时用户想通过拖动改变标签项的顺序

            const data = {
                // 当前拖拽项的类型 这里表示被拖拽的是一个 TabBar 上的 item
                type: "TabBarItem",

                // 被拖拽的 TabBarItem 所表示的组件的 id
                id: this.itemid,

                // 被拖拽的 TabBarItem 的类型 是 "design" 还是 "code"
                itemType: this.itemType
            };

            event.dataTransfer.setData("Text", JSON.stringify(data));
        },

        dragOver(event) {
            // 我们需要将 onDragOver 的默认行为删除掉后 我们才能将本 item 拖动到其他 item 上

            try {
                const data = JSON.parse(event.dataTransfer.getData("Text"));

                if (data.type && data.type === "TabBarItem") {
                    event.preventDefault();
                }
            } catch {
                return ;
            }
        },

        changeOrderByDrag(event) {
            // 拖动到此 item 上的 item 所代表的组件的 id
            // 我们需要将 LayoutPageState.openedComponents 中此 id 代表的组件额外信息对象
            // 放到本标签所表示的额外信息对象的前面
            const data = JSON.parse(event.dataTransfer.getData("Text"));

            this.$store.commit(`${this.stateName}/SET_OPENED_COMPONENT_ORDER`, {
                sentryID: this.itemid,
                sentryType: this.itemType,
                compID: data.id,
                compType: data.itemType,
                direction: "auto"
            });
        }
    },

    computed: {
        currentTab() {
            return this.vuexState.currentTab.call(this);
        },

        currentActiveTabID() {
            // 获取当前被激活的 tab 项所代表的组件的 id

            if (this.currentTab === null) {
                console.log("can't find currentActiveTabID because currentTab is null!");
                return "";
            }

            return this.currentTab.id;
        },

        currentActiveTabType() {
            // 获取当前被激活的 tab 项所代表的组件的类型
            
            if (this.currentTab === null) {
                console.log("can't find currentActiveTabType because currentTab is null!");
                return "";
            }

            return this.currentTab.type;
        },
        
        currentItemType() {
            // 获取当前标签所表示的页面的类型 是设计页还是代码页
            return this.itemType === "design" ? "设计" : "代码";
        },

        tabItemClass() {
            // 获取当前 TabBarItem 的动态 class 属性值
            return {
                "active": this.isActive
            };
        },
    }
}
</script>

<style lang="scss" scoped>
.tabItem {
    height: 100%;

    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;  // 设置在父容器在容纳不下时不要换行 而是直接溢出
    flex-shrink: 0;  // 设置在父容器在容纳不下时不要调整大小

    border-top: 3px solid transparent;
    border-right: 1px solid $foregroundColor;

    font-size: 14px;
    color: $textColor;

    cursor: pointer;

    &.active {
        border-top: 3px solid $actionColor;
    }

    &:hover {
        background-color: $barItemHoverBackgroundColor;
    }

    p {
        margin-left: 10px;
        margin-right: 10px;
        margin-top: -4px;
    }

    i {
        margin: 0 10px;
        padding: 0 2px;

        &:hover {
            background-color: lighten($color: $barItemHoverBackgroundColor, $amount: 10);
        }
    }
}
</style>