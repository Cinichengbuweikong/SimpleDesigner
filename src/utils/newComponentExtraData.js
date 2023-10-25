export default function(id, type) {
    // 新建一个组件额外信息对象
    // id: String  新建的组件的 id
    // type: "design" | "code"  当前组件额外信息对象所代表标签页的类型

    return {
        id: id,  // 组件 id
        type: type,  // 当前标签页的类型

        width: 300,  // 展示组件的 iframe 的宽度
        aspectRatio: "16/9",  // 展示组件的 iframe 的宽高比

        enableRulerBar: true,  // 是否启用标尺
    };
}