<template>
  <section class="layoutPage">
    <AsideBar />

    <article>
        <ViewBox />
        <CmdBox />
    </article>
  </section>
</template>

<script>
import CmdBox from '../components/CmdBox/CmdBox.vue';
import AsideBar from "../components/AsideBar/ASideBar.vue";
import ViewBox from "../components/ViewBox/ViewBox.vue";


export default {
    name: "LayoutPage",

    data() {
        return {
        };
    },

    methods: {},

    components: {
        AsideBar,
        ViewBox,
        CmdBox
    }
}
</script>

<style lang="scss" scoped>
.layoutPage {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;

    article {
        flex-grow: 1;

        display: flex;
        flex-direction: column;

        position: relative;

        :deep(.cmdBox) {
            position: absolute;
            left: 50%;
            bottom: 60px;

            transform: translateX(-50%);
        }
    }
}

</style>