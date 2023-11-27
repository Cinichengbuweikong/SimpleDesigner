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
    };
}