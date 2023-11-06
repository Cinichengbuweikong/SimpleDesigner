<template>
    <div class="viewBox">  <!-- 整个右侧盒子 -->
        <!-- 标签栏插槽 -->
        <slot
            name="tabBarSlot"
            :BeforePageChange="beforePageChange"
            :AfterPageChange="afterPageChange"
        >
        </slot>

        <!-- 设计视口插槽 -->
        <slot
            name="designerBoxSlot"
            :RegisterBeforePageChangeHandler="registerBeforePageChangeHandler"
            :RegisterAfterPageChangeHandler="registerAfterPageChangeHandler"
            :show="currentTab !== null && currentTab.type === 'design'"
        >
        </slot>

        <!-- 代码页插槽 -->
        <slot
            name="codeBoxSlot"
            :RegisterBeforePageChangeHandler="registerBeforePageChangeHandler"
            :RegisterAfterPageChangeHandler="registerAfterPageChangeHandler"
            :show="currentTab !== null && currentTab.type === 'code'"
        >
        </slot>

        <div
            class="blankInfo"
            v-if="currentTab === null"
        >
            <slot name="blankInfoSlot"></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ViewBoxComponent",

    data() {
        return {
            // 存储激活的标签变化之前所调用的函数
            beforePageChangeHandlers: {},
            // 存储 激活的标签变化之后所调用的函数
            afterPageChangeHandlers: {},
            // 上述两个属性中 key 值为回调的键  val 为回调函数
            // 方法通过回调的键来判断两个回调是否相同
        };
    },

    methods: {
        beforePageChange(toID, type, actionType) {
            // 激活的标签变化之前所调用的函数
            // toID: String  要被激活的标签所代表的组件的 id
            // type: String  要被激活的标签所代表的页面类型 取值: "design" | "code"
            // actionType: String  表示因什么原因导致需要更改当前激活的标签页 取值 "change" | "delete"
            //     其中 "change" 表示因页面切换  "delete" 表示因标签页被删除

            for (let key in this.beforePageChangeHandlers) {
                // 使用参数调用注册的函数

                const handler = this.beforePageChangeHandlers[key];
                handler(toID, type, actionType);
            }
        },

        afterPageChange(fromID, type, actionType) {
            // 激活的标签变化之后所调用的函数
            // fromID: String  当前激活的标签更改之前的那个激活的标签页所代表的组件的 id
            // type: String  当前激活的标签更改之前的激活的标签页所代表的页面类型 取值: "design" | "code"
            // actionType: String  表示因什么原因导致需要更改当前激活的标签页 取值 "change" | "delete"
            //     其中 "change" 表示因页面切换  "delete" 表示因标签页被删除

            for (let key in this.afterPageChangeHandlers) {
                // 使用参数调用注册的函数

                const handler = this.afterPageChangeHandlers[key];
                handler(fromID, type, actionType);
            }
        },

        registerBeforePageChangeHandler(key, handler) {
            // 注册在激活的标签变化之前所调用的函数
            // key: String  回调函数的键
            // handler: Function  回调函数

            // 如果已经注册过这个钩子了 那就不要再次注册这个钩子了
            if (this.beforePageChangeHandlers[key]) {
                return ;
            }

            this.beforePageChangeHandlers[key] = handler;
        },

        registerAfterPageChangeHandler(key, handler) {
            // 注册在激活的标签变化之后所调用的函数
            // key: String  回调函数的键
            // handler: Function  回调函数

            // 如果已经注册过这个钩子了 那就不要再次注册这个钩子了
            if (this.afterPageChangeHandlers[key]) {
                return ;
            }

            this.afterPageChangeHandlers[key] = handler;
        },

        removeBeforePageChangeHandler(key) {
            // 删除一个在激活的标签变化之前所调用的函数
            // key: String  要被删除的回调函数的键

            if (this.beforePageChangeHandlers[key]) {
                delete this.beforePageChangeHandlers[key];
            }
        },

        removeAfterPageChangeHandler(key) {
            // 删除一个在激活的标签变化之后所调用的函数
            // key: String  要被删除的回调函数的键

            if (this.afterPageChangeHandlers[key]) {
                delete this.afterPageChangeHandlers[key];
            }
        }
    },

    computed: {
        ...mapState("LayoutPageState", {
            currentTab: state => {
                // 获取存储在 LayoutPageState 中的当前激活的组件的信息
                return state.tabBar.currentTab;
            },
        })
    }
}
</script>

<style lang="scss" scoped>
.viewBox {
    flex-grow: 1;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .blankInfo {
        width: 100%;
        height: 100%;
        
        display: flex;
        justify-content: center;
        align-items: center;

        color: $textColor;
        font-size: 24px;
    }
}
</style>