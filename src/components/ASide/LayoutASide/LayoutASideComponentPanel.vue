<template>
    <div class="layoutAsideComponentPanel">
        <p class="panelTitle">组件面板</p>

        <div class="panelBox">
            <p class="boxTitle">
                页面组件:
                <span>+</span>
            </p>

            <ul class="boxContent">
                <li class="boxItem">PageA.vue</li>
            </ul>
        </div>

        <div class="panelBox">
            <p class="boxTitle">
                普通组件:
                <span>+</span>
            </p>

            <ul class="boxContent">
                <li class="boxItem">CompB.vue</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "layoutAsideComponentPanelComponent",
}
</script>

<style lang="scss" scoped>
.layoutAsideComponentPanel {
    .panelTitle {
        color: $textColor;
        font-size: 14px;
        padding: 10px 5px;

        border-bottom: 1px solid $foregroundColor;
    }

    .panelBox {
        padding: 5px 5px;
        border-bottom: 1px solid $foregroundColor;

        .boxTitle {
            color: $textColor;
            font-size: 14px;

            padding: 5px 0;

            position: relative;

            span {
                display: block;
                width: 20px;
                height: 20px;

                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);

                text-align: center;
                line-height: 20px;
                font-size: 20px;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }
            }
        }

        .boxContent {
            list-style: none;

            padding-left: 10px;

            color: $textColor;
            font-size: 14px;

            .boxItem {
                padding: 3px 2px;

                &:hover {
                    background-color: $barItemHoverBackgroundColor;
                }
            }
        }
    }
}
</style>