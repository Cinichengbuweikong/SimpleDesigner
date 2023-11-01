export default function(id, type) {
    // 新建一个组件额外信息对象
    // id: String  新建的组件的 id
    // type: "design" | "code"  当前组件额外信息对象所代表标签页的类型

    return {
        id: id,  // 组件 id
        type: type,  // 当前标签页的类型

        width: 960,  // 展示组件的 iframe 的宽度
        aspectRatio: "16/9",  // 展示组件的 iframe 的宽高比
        dpr: 2,  // dpr 取值 默认是 2  表示设计中 960x540 大小的窗口表示实际中 1920x1080 大小的屏幕 

        enableRulerBar: true,  // 是否启用标尺
        focusPosition: "designPort",
        // 当前页面焦点的位置 取值 "designPage" | "designPort"  
        // designPage 表示焦点位置在设计页 此时用户可以对 designer 组件的大小进行缩放
        // designPort 表示焦点位置在设计视口中 我们认为 designerPort 即为 designer 组件
        // 当焦点处在 designPort 中时 用户可以对 designer 组件中的 iframe 中的内容进行操作
        workingComponentID: "",  // 当前用户正在操作的组件的 id
    };
}