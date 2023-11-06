<template>
    <section class="exportPage">
        <ASide>
            <template v-slot:toolBar>
                <!-- 需要改 state -->
                <ASideBar
                    stateName="LayoutPageState"
                >
                    <template v-slot:ASideBarItemSlot="scopeData">
                        <ASideBarItem
                            name="组件"
                            :action="scopeData.ShowComponentPanel"
                            iconClass="icon-dashboard_px_rounded-copy"
                            :active="true"
                        />
                    </template>
                </ASideBar>
            </template>
            
            <template v-slot:toolPanel>
                <!-- 需要改 state -->
                <ASidePanel
                    stateName="LayoutPageState"
                >
                    <template v-slot:componentPanelSlot>
                        <!-- 需要改 state -->
                        <ASideComponentPanel
                            stateName="LayoutPageState"
                            :allowAddComponent="false"
                            :allowShowRightClickMenu="false"
                            :allowDrag="false"
                            :allowShowComponentHoverOption="false"
                        />
                    </template>
                </ASidePanel>
            </template>
        </ASide>

        <article>
            <ViewBox>
                <template v-slot:tabBarSlot="scopeData">
                    <!-- 需要修改 state -->
                    <TabBar
                        stateName="LayoutPageState"
                        :BeforePageChange="scopeData.BeforePageChange"
                        :AfterPageChange="scopeData.AfterPageChange"
                    />
                </template>
                
                <template v-slot:designerBoxSlot="scopeData">
                    <!-- 需要修改 state -->
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
                    </DesignerBox>
                </template>

                <template v-slot:blankInfoSlot>
                    <h1>请打开一个组件以进行预览</h1>
                </template>
            </ViewBox>

            <div class="exportBox">
                <div class="exportOptions">
                    <div class="box">
                        <div>
                            <i class="iconfont icon-save_alt_px_rounded"></i>
                        </div>

                        <p>导出项目</p>
                    </div>

                    <div class="box">
                        <div>
                            <i class="iconfont icon-save_alt_px_rounded"></i>
                        </div>

                        <p>仅导出当前预览的组件</p>
                    </div>

                    <div class="box">
                        <div>
                            <i class="iconfont icon-save_px_rounded"></i>
                        </div>

                        <p>保存项目</p>
                    </div>
                </div>
            </div>
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

import TabBar from '../components/ViewBox/TabBar/TabBar.vue';

import ViewBox from "../components/ViewBox/ViewBox.vue";
import DesignerBox from '../components/ViewBox/DesignerBox/DesignerBox.vue';
import Designer from '../components/ViewBox/DesignerBox/Designer.vue';


export default {
    name: "ExportPage",

    components: {
        ASide,
        ASideBar,
        ASideBarItem,
        ASidePanel,
        ASideComponentPanel,
        TabBar,

        ViewBox,
        DesignerBox,
        Designer
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
.exportPage {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;

    article {
        flex-grow: 1;

        display: flex;
        flex-direction: column;

        position: relative;

        .exportBox {
            width: 100%;
            height: 200px;
            background-color: $barBackgroundColor;

            display: flex;
            justify-content: center;
            align-items: center;

            .exportOptions {
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: flex-start;

                .box {
                    width: 80px;
                    margin: 0 30px;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    color: $textColor;

                    cursor: pointer;

                    font-size: 14px;

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
    }
}
</style>