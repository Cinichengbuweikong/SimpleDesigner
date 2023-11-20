export default function(id, type) {
    // 新建一个组件额外信息对象
    // id: String  新建的组件的 id
    // type: "design" | "code"  当前组件额外信息对象所代表标签页的类型

    // 修改本文件后记得修改 ./utils/importProjects.js 和 ./utils/saveProjects.js
    

    return {
        id: id,  // 组件 id
        type: type,  // 当前标签页的类型

        scale: 1,
        // 设计 iframe 的缩放比 我们通过 transform: scale 来对 iframe 进行缩放
        // 而缩放的大小就是这里的 scale 的值
        // 在此处  1 表示 100%  也即不缩放

        /**
         * 当前设计页是否被锁定了 锁定后用户将无法滚动当前设计页中的内容
         * @type {Boolean}
         */
        lockState: false,

        enableRulerBar: true,  // 是否启用标尺

        workingComponentID: "",  // 当前用户正在操作的组件的 id
    };
}