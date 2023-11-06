<template>
  <section class="layoutPage">
    <ASide>
        <template v-slot:toolBar>
            <ASideBar
                stateName="LayoutPageState"
            >
                <template v-slot:ASideBarItemSlot="scopeData">
                    <ASideBarItem
                        name="组件"
                        :action="scopeData.ShowComponentPanel"
                        iconClass="icon-dashboard_px_rounded-copy"
                        :active="scopeData.CurrentPanel === 'componentPanel' "
                    />

                    <ASideBarItem
                        name="工具"
                        :action="scopeData.ShowToolPanel"
                        iconClass="icon-build_px_rounded"
                        :active="scopeData.CurrentPanel === 'toolPanel' "
                    />
                </template>
            </ASideBar>
        </template>
        
        <template v-slot:toolPanel>
            <ASidePanel
                stateName="LayoutPageState"
            >
                <template v-slot:componentPanelSlot="scopeData">
                    <ASideComponentPanel
                        stateName="LayoutPageState"
                        v-if="scopeData.show"
                    />
                </template>

                <template v-slot:toolPanelSlot="scopeData">
                    <ASideToolPanel
                        stateName="LayoutPageState"
                        v-if="scopeData.show"
                    />
                </template>
            </ASidePanel>
        </template>
    </ASide>

    <article>
        <ViewBox>
            <template v-slot:tabBarSlot="scopeData">
                <TabBar
                    stateName="LayoutPageState"
                    :BeforePageChange="scopeData.BeforePageChange"
                    :AfterPageChange="scopeData.AfterPageChange"
                />
            </template>

            <template v-slot:designerBoxSlot="scopeData">
                <DesignerBox
                    v-if="scopeData.show"
                    :RegisterBeforePageChangeHandler="scopeData.RegisterBeforePageChangeHandler"
                    :RegisterAfterPageChangeHandler="scopeData.RegisterAfterPageChangeHandler"
                    :designerRef="$refs.designerRef"
                    stateName="LayoutPageState"
                >
                    <template v-slot:designerSlot="scopeData">
                        <Designer
                            ref="designerRef"
                            :DesignerPointEvents="scopeData.DesignerPointEvents"
                            :CurrentComponentData="scopeData.CurrentComponentData"
                            :CurrentComponentExtraData="scopeData.CurrentComponentExtraData"
                        />
                    </template>

                    <template v-slot:rulerBarSlot="scopeData">
                        <RulerBar
                            v-if="scopeData.show"
                            :ScrollBarWidth="scopeData.ScrollBarWidth"
                        />
                    </template>
                    
                    <template v-slot:cmdBoxSlot>
                        <CmdBox />
                    </template>
                </DesignerBox>
            </template>
            
            <template v-slot:codeBoxSlot="scopeData">
                <CodeBox
                    v-if="scopeData.show"
                    :RegisterBeforePageChangeHandler="scopeData.RegisterBeforePageChangeHandler"
                    :RegisterAfterPageChangeHandler="scopeData.RegisterAfterPageChangeHandler"
                />
            </template>

            <template v-slot:blankInfoSlot>
                <h1>请先创建或打开一个组件</h1>
            </template>
        </ViewBox>
    </article>
  </section>
</template>

<script>
import { default as AppState } from "../store/AppState/AppState.js";

import ASide from "../components/ASide/ASide.vue";
import ASideBar from "../components/ASide/ASideContent/ASideBar.vue";
import ASideBarItem from '../components/ASide/ASideContent/ASideBarItem.vue';
import ASidePanel from "../components/ASide/ASideContent/ASidePanel.vue";
import ASideComponentPanel from '../components/ASide/ASideContent/ASidePanelContent/ASideComponentPanel.vue';
import ASideToolPanel from '../components/ASide/ASideContent/ASidePanelContent/ASideToolPanel.vue';

import ViewBox from "../components/ViewBox/ViewBox.vue";
import DesignerBox from '../components/ViewBox/DesignerBox/DesignerBox.vue';
import CodeBox from '../components/ViewBox/CodeBox.vue';
import TabBar from '../components/ViewBox/TabBar/TabBar.vue';

import Designer from '../components/ViewBox/DesignerBox/Designer.vue';
import RulerBar from '../components/ViewBox/DesignerBox/RulerBar.vue';
import CmdBox from '../components/CmdBox/CmdBox.vue';


export default {
    name: "LayoutPage",

    components: {
        ASide,
        ASideBar,
        ASideBarItem,
        ASidePanel,
        ASideComponentPanel,
        ASideToolPanel,

        ViewBox,
        DesignerBox,
        CodeBox,
        TabBar,

        Designer,
        RulerBar,
        CmdBox,
    },

    beforeRouteEnter(to, from, next) {
        // 如果现在没有打开的工程的话 那用户就不能在本页面进行操作
        if (AppState.state.projectInfo === null) {
            return ;
        }

        next();
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

        position: relative;
    }
}

</style>