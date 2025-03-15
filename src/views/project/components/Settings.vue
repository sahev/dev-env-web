<script setup lang="ts">
import { onMounted, ref } from 'vue';
import General from './General.vue';
import { projectService } from '@/services';
import { useRouter } from 'vue-router';
import Compute from './Compute.vue';
import Delete from './Delete.vue';

const tab = ref('general')

const router = useRouter()

const tabWindows = ref([
    {
        title: "project.settings.general.title",
        value: "general",
        component: General
    },
    {
        title: "project.settings.delete.title",
        value: "delete",
        component: Delete
    },
])

const project = ref()

async function getProject () {
    project.value = await projectService.get(router.currentRoute.value.params.id.toString())
}

onMounted(() => {
    getProject()
})

async function onSave (project) {
    await projectService.update(project)
    showSnackBar.value = true
}

async function onDelete (project) {
    await projectService.delete(project.id)
    showSnackBar.value = true
    router.push('/projects')
}

const showSnackBar = ref()
const snackBarText = ref("Done")

</script>
<template>
    <v-container>
        <v-row justify="center" align="start">
            <!-- Coluna das Tabs -->
            <v-col md="auto" sm="12" class="d-flex flex-column align-start mt-10">
                <v-tabs v-model="tab" color="primary" direction="vertical" width="200">
                    <v-tab v-for="tab in tabWindows" :key="tab.value" :text="$t(tab.title)" :value="tab.value"></v-tab>
                </v-tabs>
            </v-col>

            <!-- Coluna do Título + Conteúdo -->
            <v-col cols="12" md="6" sm="12">
                <!-- Título "Settings" alinhado com o v-card -->
                <div class="text-lg-h5 font-weight-bold mb-2">
                    {{ $t('project.settings.title') }}
                </div>

                <!-- v-card com o conteúdo -->
                <v-card flat class="tabs-content">
                    <v-tabs-window v-model="tab">
                        <v-tabs-window-item v-for="window in tabWindows" :key="window.value" :value="window.value">
                            <v-card-title>
                                {{ $t('project.settings.general.title') }}
                            </v-card-title>
                            <v-skeleton-loader :loading="!project" type="heading, text, actions">
                                <v-card-text>
                                    <component v-if="project" :is="window.component" :project="project" @onSave="onSave"
                                        @onDelete="onDelete">
                                    </component>
                                </v-card-text>
                            </v-skeleton-loader>
                        </v-tabs-window-item>
                    </v-tabs-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-snackbar v-model="showSnackBar" :timeout="2000" color="info">
        {{ snackBarText }}
    </v-snackbar>
</template>


<style scoped>
.tabs-content {
    min-height: 200px;
}
</style>