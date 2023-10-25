export default function(elem) {
    // 该函数用于获取给定的 html 元素相对于整个浏览器窗口(window)的位置信息
    // elem: HTMLElement  要获取位置信息的 html 元素

    // 这四个属性分别是:
    // 元素的左上角点的 X 轴坐标  元素的左上角点的 Y 轴坐标  元素的宽  元素的高
    const {left, top, width, height} = elem.getBoundingClientRect();

    // 窗口可视区域内除开滚动条的宽高
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;

    return {
        // 元素中心点的 x 轴坐标
        centerXPx: Number((left + (width / 2)).toFixed(2)),
        // 元素中心点的 y 轴坐标
        centerYPx: Number((top + (height / 2)).toFixed(2)),

        // 元素中心点位置占整个屏幕宽度的百分比
        centerXRatio: Number(((left + (width / 2)) / windowWidth * 100).toFixed(2)),
        // 元素中心点位置占整个屏幕高的百分比
        centerYRatio: Number(((top + (height / 2)) / windowHeight * 100).toFixed(2)),
    };
}