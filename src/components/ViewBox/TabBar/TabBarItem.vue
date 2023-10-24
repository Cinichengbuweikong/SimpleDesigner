<template>
    <div
        class="tabItem"
        :class="tabItemClass"
        @click="changeCurrentItem"
    >  <!-- 标签项 -->
        <p>{{currentItemType}}: {{itemName}}</p>
        <i class="iconfont icon-clear_px_rounded" @click="closeItem"></i>
    </div>
</template>

<script>
export default {
    name: "TabBarItemComponent",

    data() {
        return {
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
            type: Boolean,
            required: true
        },
    },

    methods: {
        changeCurrentItem() {
            this.$store.commit(
                "LayoutPageState/SET_CURRENT_TAB",
                { id: this.itemid, type: this.itemType }
            );
        },

        closeItem() {
            this.$store.commit(
                "LayoutPageState/REMOVE_OPENED_COMPONENTS",
                { id: this.itemid, type: this.itemType }
            );  
        }
    },

    computed: {
        currentItemType() {
            return this.itemType === "design" ? "设计" : "代码";
        },

        tabItemClass() {
            return {
                "active": this.isActive
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.tabItem {
    min-width: 60px;
    height: 100%;

    display: inline-flex;
    align-items: center;

    border-right: 1px solid $foregroundColor;

    font-size: 14px;
    color: $textColor;

    cursor: pointer;

    &.active {
        height: calc(100% - 3px);
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