<template>
    <section class="newProjectPage">
        <h1>请新建一个项目 或是打开一个已有的项目</h1>

        <article class="actionBox">
            <div class="box">
                <div>
                    <i class="iconfont icon-add_px_rounded"></i>
                </div>

                新建项目
            </div>

            <div class="box">
                <div>
                    <i class="iconfont icon-folder_px_rounded"></i>
                </div>

                打开项目
            </div>
        </article>
    </section>
</template>

<script>
export default {
    name: "newProjectPage",
}
</script>

<style lang="scss" scoped>
.newProjectPage {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        color: $textColor;
        margin: 30px 0;
    }

    .actionBox {
        width: 300px;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .box {
            width: 80px;
            margin: 0 30px;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            color: $textColor;

            cursor: pointer;

            div {
                width: 60px;
                height: 60px;

                background-color: $actionColor;

                border-radius: 3px;

                margin-bottom: 10px;

                position: relative;

                i {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);

                    font-size: 30px;
                }
            }
        }
    }
}
</style>