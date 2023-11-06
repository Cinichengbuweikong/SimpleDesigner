<template>
    <li
        class="aSideBarItem"
        :class="active ? 'active' : ''"
        @click="action"
    >
        <i class="iconfont" :class="iconClass"></i>
        <span>{{name}}</span>
    </li>
</template>

<script>
export default {
    name: "ASideBarItemComponent",

    props: {
        name: {
            // 该侧边栏项的名字
            type: String,
            default: ""
        },

        action: {
            // 点击该侧边栏项后执行的回调
            type: Function,
            default: () => {}
        },

        iconClass: {
            // 该侧边栏项的 iconfont class
            type: String,
            default: ""
        },

        active: {
            // 当前侧边栏项是否是被激活的项?
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.aSideBarItem {
    width: calc(100% - 3px);
    height: 50px;
    border-left: 3px solid transparent;

    position: relative;

    cursor: pointer;

    &:hover > span {
        display: block;
        opacity: 1;
    }

    &.active {
        border-left: 3px solid $actionColor;
    }

    i {
        font-size: 30px;
        color: $textColor;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    span {
        display: block;
        
        width: 40px;

        position: absolute;
        left: calc(100% + 3px);
        top: 50%;
        transform: translateY(-50%);

        border: 1px solid $textColor;
        border-radius: 3px;

        color: $textColor;
        text-align: center;
        font-size: 14px;

        opacity: 0;
        display: none;

        background-color: $backgroundColor;

        transition: opacity 0.2s;
    }
}
</style>