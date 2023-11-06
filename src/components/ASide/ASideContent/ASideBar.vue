<template>
    <ul class="layoutASideBar">
        <!-- slot 中应存放 ASideBarItem 组件 -->
        <slot
            name="ASideBarItemSlot"
            :ShowComponentPanel="showComponentPanel"
            :ShowToolPanel="showToolPanel"
            :CurrentPanel="currentPanel"
        ></slot>
    </ul>
</template>

<script>
import { mapState } from 'vuex';


export default {
    name: "aSideBarComponent",

    data() {
        // 我们需要为 mapState 传递一个动态参数 就是 this.stateName
        // 而在 computed 中 由于 computed 内只是一个普通的对象 无法使用 this
        // 因此我们只能把 mapState 的使用方式稍微改变一下
        // 就是在 data 中使用 mapState  而后把 mapState 的返回值挂到 data 上
        // 最后在 computed 中读取 data 中的 mapState 的返回值 而后取出这个对象中的数据而后使用

        const vuexState = mapState(this.stateName, {
            currentPanel: state => state.panel.currentPanel,
        });

        return {
            vuexState
        };
    },

    props: {
        stateName: {
            // 本组件需要使用哪个 state 下的侧边栏数据 ?
            // 取值各个 state 命名空间的名字 例如 "LayoutPageState"
            type: String,
            required: true
        }
    },

    methods: {
        showComponentPanel() {
            // 显示组件面板
            this.$store.commit(`${this.stateName}/SET_CURRENT_PANEL`, 'componentPanel');
        },

        showToolPanel() {
            // 显示工具面板
            this.$store.commit(`${this.stateName}/SET_CURRENT_PANEL`, 'toolPanel');
        }
    },

    computed: {
        currentPanel() {
            // 取出 vuex 中的数据
            // 需要写个 call 是因为 mapState 函数的返回值中的方法需要一个 this
            // 同时这个 this 需要指向本组件对象 于是在这里我们就使用本组件的示例对象 call 一下这个函数
            return this.vuexState.currentPanel.call(this);
        }
    }
}
</script>

<style lang="scss" scoped>
.layoutASideBar {
    width: 100%;
    height: 100%;
    list-style: none;
}
</style>