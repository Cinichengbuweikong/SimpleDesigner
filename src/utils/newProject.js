// 生成项目对象

export default function(projectName) {
    // projectName: String  项目名字

    return {
        projectName,  // 项目名
        projectSetting: {  // 项目设置
            rulerBar: true,  // 是否默认启用标尺
            template: `
<template>
    <div class="{{compName}}Box"></div>
</template>

<script>
    export defualt {
        name: "{{compName}}"
    };
</script>

<style lang="scss" scoped>
    .{{compName}}Box {
        /* 注: 如果需要自己写样式的话 请把样式都写在此类下 否则解析器无法正确解析我们的样式代码 */
    }
</style>
`,  // 组件模板的默认代码
            
            width: 960,  // 组件默认宽度

            aspectRatio: "16/9",  // 组件默认宽高比

            dpr: 2,  // 组件默认 dpr 值
        }
    };
}