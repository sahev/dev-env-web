<script setup lang="ts">
import {useRouter} from 'vue-router';
import { projectService } from '@/services';
import { useProjectStore } from '@/stores/project';
import { onMounted, ref } from 'vue';
import ProjectForm from './components/ProjectForm.vue';
import { Project } from '@/models/ProjectModel';
import { getRandomName } from '@/utils/global';

const router = useRouter()

const projects = ref([])

async function getProjects () {
    const projectsResponse = await projectService.getAll()
    projects.value = projectsResponse.items
}

const projectStore = useProjectStore()

function setProject (item) {
    projectStore.project = item
    router.push(`/project/${item.id}/info`)
}

onMounted(async () => {
    await getProjects()
})

const showNewProjectDialog = ref()

function add () {
    showNewProjectDialog.value = true
}

const applicationLimit = 3;

function getServicesLimit (project) {
    return (project.services.length / applicationLimit) * 100;
}

async function onSave (project: Project) {
    if (!project.name) {
        project.name = getRandomName()
    }

    const response = await projectService.post(project)

    console.log(response, 'saved');

    projects.value.unshift(response)

    showNewProjectDialog.value = false
}

</script>
<template>
    <v-row justify="start">
        <v-col cols="3" class="justify-center">
            <v-card @click="add" class="bg-background pa-4 new-project-style d-flex align-center justify-center"
                height="200">
                <v-card-title>
                    New Project
                </v-card-title>
            </v-card>
        </v-col>
        <v-col v-for="project in projects" :key="project.id" cols="3">
            <v-card @click="setProject(project)" height="200" class="pa-4">
                <v-card-title class="d-flex justify-space-between align-center">
                    <span>{{ project.name }}</span>
                    <v-icon icon="mdi-chevron-right" />
                </v-card-title>
                <v-card-text class="d-flex justify-space-between align-center">
                    <a><span class="text-h3">{{ project.services?.length || 0 }}</span> {{ $t('projects.services') }}</a>
                    <v-progress-circular size="90" :width="15" :model-value="getServicesLimit(project)"
                        color="secondary"></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog v-model="showNewProjectDialog" width="auto">
        <ProjectForm @on-save="onSave" @on-cancel="showNewProjectDialog = false"></ProjectForm>
    </v-dialog>
</template>
<style lang="scss" scoped>
.new-project-style {
    border-style: dashed;
    border-width: 2px;
    border-color: rgb(var(--v-theme-surface));
}
</style>