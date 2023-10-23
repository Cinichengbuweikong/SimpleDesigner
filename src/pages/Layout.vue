<template>
  <section class="layoutPage">
    <ASide>
        <template v-slot:toolBar>
            <LayoutASideBar/>
        </template>
        
        <template v-slot:toolPanel>
            <LayoutASidePanel/>
        </template>
    </ASide>

    <article>
        <ViewBox />
        <CmdBox />
    </article>
  </section>
</template>

<script>
import CmdBox from '../components/CmdBox/CmdBox.vue';
import ASide from "../components/ASide/ASide.vue";
import LayoutASideBar from "../components/ASide/LayoutASide/LayoutASideBar.vue";
import LayoutASidePanel from "../components/ASide/LayoutASide/LayoutASidePanel.vue";
import ViewBox from "../components/ViewBox/ViewBox.vue";


export default {
    name: "LayoutPage",

    data() {
        return {
        };
    },

    methods: {},

    components: {
        ASide,
        ViewBox,
        CmdBox,
        LayoutASideBar,
        LayoutASidePanel,
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