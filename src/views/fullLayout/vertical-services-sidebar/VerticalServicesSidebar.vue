<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import menuItems from './menuItems';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import { useDisplay } from 'vuetify';
import { useProjectStore } from '@/stores/project';
import Icon from './Icon.vue';

const projectStore = useProjectStore()

const { smAndDown } = useDisplay();
const isMobile = smAndDown.value;

const sidebarMenu = shallowRef(menuItems);

const drawer = ref(true)

</script>

<template>
    <v-navigation-drawer left v-model="drawer" :mobile-breakpoint="960" class="leftComponentSidebar" width="300">

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <v-list class="pa-4" density="compact">
                <v-list-item v-if="!$route.path.includes('info')" :to="`/project/${$route.params.id}/info`">
                    <!---If icon-->
                    <template v-slot:prepend>
                        <Icon :icon="'mdi-arrow-left'" />
                    </template>
                    <v-list-item-title>{{ $t('menu.back') }}</v-list-item-title>
                </v-list-item>

                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <!---Item Sub Header -->

                    <v-divider v-if="item.divider" />

                    <NavGroup v-can="item.roles" :item="item" v-else-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <NavCollapse v-can="item.roles" class="leftPadding" :item="item" :level="0"
                        v-else-if="item.children" />
                    <!---Single Item-->
                    <NavItem v-can="item.roles" :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>

</template>
<style scoped></style>