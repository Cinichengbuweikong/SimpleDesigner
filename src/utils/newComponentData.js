export default function(id, name, type) {
    // 新建一个组件对象
    // id: String  新建的组件的 id
    // name: String  新建的组件的名字
    // type: "page" | "normal"  组件的类型

    const compName = `${name}${type === 'page' ? "Page" : ""}Component`;

    const code = `
<template>
    <div class="${compName}Box"></div>
</template>

<script>
    export defualt {
        name: "${compName}"
    };
</script>

<style lang="scss" scoped>
.${compName}Box {
    /* 注: 如果需要自己写样式的话 请把样式都写在此类下 否则解析器无法正确解析我们的样式代码 */
}
</style>
`;

    return {
        id: id,  // 组件 id
        name: name,  // 组件的名字
        type: type,  // 组件的类型
        ast: {},  // 模板的 ast

        width: 960,  // 展示组件的 iframe 的宽度
        aspectRatio: "16/9",  // 展示组件的 iframe 的宽高比
        dpr: 2,
        // dpr 取值 默认是 2
        // 表示当用户新建了一个 1920x1080 大小的页面时 虽然我们也应该为用户显示一个 1920x1080 大小的窗口
        // 但实际窗口的大小应为 960x540  同时所有用户进行的操作均应除以 dpr 值后再应用
        // 例如 dpr 值假设为 2  那此时如果用户期望在 1920x1080 窗口的 200x200 位置处显示一个 400x400 大小的图像的话
        // 那实际中我们应该做的 是在一块 960x540 窗口的 100x100 位置处显示一个 200x200 大小的图像
    };
}