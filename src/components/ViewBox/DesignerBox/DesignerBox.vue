<template>
    <div
        class="designerBox"
        ref="designerBoxRef"
        @keydown.alt="onDesignerBoxAltKeyDown"
        @click="onDesignerBoxClick"
        tabindex="-1"
    >  <!-- 设计视口 -->
        <Designer
            ref="designerRef"
            :DesignerPointEvents="designer.pointEvents"
            :DesignerWidth="designer.width"
        />
        <RulerBar
            :ScrollBarWidth="designer.scrollBarWidth"
        />
    </div>
</template>

<script>
import Designer from './Designer.vue';
import RulerBar from './RulerBar.vue';


// 这个变量用于缓存 designerBox 上的 alt key 是否被按下
// 该变量在 onDesignerBoxAltKeyDown 中使用
let isAltKeyDown = false;


export default {
    name: "designerBoxComponent",

    data() {
        return {
            designer: {
                pointEvents: true,
                width: 300,

                scrollBarWidth: 17,
            },
        };
    },

    methods: {
        onDesignerBoxAltKeyDown(event) {
            // 我们希望可以实现在用户按下 alt 键而后滚动鼠标滚轮的时候 我们可以对 Designer 组件的大小进行调整
            // 就是放大或缩小 Designer 组件的大小

            // 为什么非要在按下 alt 键后才能调整 Designer 组件的大小?
            // 因为我们的 Designer 组件内部使用了 iframe
            // 直接为 div.designerBox 添加事件监听是可以的 但是我发现当我把鼠标放在 Designer 上的 iframe 中后
            // 监听缩放的事件失效了

            // 具体的原因是 iframe 把缩放事件 "吃" 掉了  当我们在 iframe 上进行缩放时
            // iframe 会以为我们是要缩放 iframe 内部的网页 从而让来自外部的缩放行为失效

            // 那解决这个问题的方法也很简单 我们只需为 iframe 设置 pointer-events 这个 css
            // 而后在父组件(本组件) 中 动态传递 pointer-events 这个 css 属性的取值即可
            // 这也是这里所做的

            // 浏览器定义页面缩放行为就是 ctrl+鼠标滚轮
            // 不管用户是通过鼠标触发的缩放 还是通过触摸板 或是触摸屏(桌面端)触发的缩放

            // div.designerBox 在响应按键事件之前需要先被 focus
            // focus 的代码设置在 div.designerBox 的 click 事件中

            if (isAltKeyDown) {
                // 设置如果 alt 键已经被按下后 就不要再重复执行本函数了
                // 为什么要这样设置? 因为这里需要的是在用户按下 alt 键后 当用户滚动鼠标滚轮的时候缩放 Designer 组件的大小
                // 而我发现 在默认情况下 只要用户按下的 alt 键  alt 键的 keydown 回调就会一直触发
                // 而不是只触发一次(我以为 alt 键还没松开 我也只按下了一下 所以 keydown 只应调用一次来着 实际上不是这样)
                // 这种性能损耗肯定是让人无法接受的 但解决方法页很简单 我们只需设置一个 flag
                // 用于表示此时 alt 键是否已经被按下了
                // 如果 alt 键已经被按下 那就直接返回即可 不需要执行接下来的代码了!
                return ;
            }

            // 说明之前 alt 键还没被按下 此时 alt 键刚被按下
            // 标记 alt 键已经被按下了
            isAltKeyDown = true;

            // 当 alt 键按下后 说明我们要对整个 Designer 组件进行缩放
            // 因此先把 Designer 内部的 pointer-events 设置为 none
            this.designer.pointEvents = false;

            // 而后定义当调整缩放的命令触发时的回调
            const onWheel = (e) => {
                // 关闭浏览器默认的放大页面的行为
                e.preventDefault();

                if (e.deltaY < 0 && e.deltaX === 0 && e.deltaZ === 0 && e.ctrlKey) {
                    // 是方法的缩放 这个判断条件时通过观察事件对象中的数据而得到的
                    this.designer.width += 10;
                    return;
                }

                if (e.deltaY > 0 && e.deltaX === 0 && e.deltaZ === 0 && e.ctrlKey) {
                    // 是缩小的缩放 这个判断条件时通过观察事件对象中的数据而得到的
                    this.designer.width -= 10;
                    return;
                }
            };

            // 而后定义当 alt 键被松开时的回调
            const onAltKeyUp = (e) => {
                // 在 firefox 中 alt 键被松开时会有一个默认行为
                // 在这里阻止它
                e.preventDefault();

                // 设置 Designer 组件中的 iframe 可以继续响应鼠标操作了
                this.designer.pointEvents = true;

                // 删除在本方法中设置的回调
                this.$refs.designerBoxRef.removeEventListener("keyup", onAltKeyUp);
                this.$refs.designerBoxRef.removeEventListener("wheel", onWheel);

                // 设置 alt 键已经被松开了
                isAltKeyDown = false;
            };

            // 当 alt 键被按下后 我们需要监听 alt 键松开和滚轮滚动这两个事件
            // 同时在 alt 键被松开时 我们需要取消本函数中设置的所有监听
            this.$refs.designerBoxRef.addEventListener("keyup", onAltKeyUp);
            this.$refs.designerBoxRef.addEventListener("wheel", onWheel);
        },

        onDesignerBoxClick() {
            // 当用户点击 div.designerBox 时 设置将焦点移动到 div.designerBox 上
            this.$refs.designerBoxRef.focus();
        },
    },

    components: {
        Designer,
        RulerBar,
    },

    mounted() {
        // 计算 Designer 组件内的滚动条的宽度 已让 RulerBar 组件避开滚动条
        const designerElem = this.$refs.designerRef.$el;

        const elementOuterWidth = designerElem.clientWidth;
        const elementInnerWidth = designerElem.offsetWidth;

        this.scrollBarWidth = elementOuterWidth - elementInnerWidth;
    },
}
</script>

<style lang="scss" scoped>
.designerBox {
    width: 100%;
    height: 100%;

    flex-grow: 1;

    position: relative;

    outline: 0;
}
</style>