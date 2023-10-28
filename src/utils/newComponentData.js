export default function(id, name, type) {
    // 新建一个组件对象
    // id: String  新建的组件的 id
    // name: String  新建的组件的名字
    // type: "page" | "normal"  组件的类型

    const compName = `${name}${type === 'page' ? "Page" : ""}Component`;

    return {
        id: id,  // 组件 id
        name: name,  // 组件的名字
        type: type,  // 组件的类型
        code: `<template>\n</template>\n\n<script>\nexport defualt {\n    name: "${compName}"\n};\n</script>\n\n<style lang="scss" scoped>\n</style>`,
    };
}