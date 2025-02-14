<script setup lang="ts">
import router from '@/plugins/router';
import { projectService } from '@/services';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from 'vue';

const projectStore = useProjectStore()

const project = ref()

const isProjectRoute = ref(router.currentRoute.value.path.includes('info'))

const search = ref("")

const filteredItems = computed(() => {
    return projects.value.filter((item) =>
        item.name.toLowerCase().includes(search.value.toLowerCase())
    );
})

function selectItem (item) {
    projectStore.setProject(item)
    window.location.href = `/project/${item.id}/info`
}

function createNewProject () {
    console.log("Criar novo projeto");
}

const projects = ref([])

async function getProjects () {
    if (!router.currentRoute.value.params.id) return

    const projectsResponse = await projectService.getAll()
    projects.value = projectsResponse.items
}

function setProject() {
    const proj = projects.value.filter(x => x.id == router.currentRoute.value.params.id)[0]

    project.value = proj
}

watch(
    () => router.currentRoute.value.name,
    (newParam) => {
        isProjectRoute.value = router.currentRoute.value.path.includes('/project/')
        setProject()
    }
);

onMounted(async () => {
    await getProjects()
    setProject()
})

</script>
<template>
    <router-link to="/projects">
        <v-btn variant="text" color="primary" :prepend-icon="'mdi-folder'">{{ $t('menu.projects') }}</v-btn>
    </router-link>

    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn v-if="isProjectRoute" variant="text" color="primary" v-bind="props"
                :append-icon="'mdi-chevron-down'">
                {{ project?.name }}
            </v-btn>
        </template>

        <v-list>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" size="small" variant="solo"
                density="compact" class="ma-2" hide-details></v-text-field>

            <v-list-item density="compact" nav v-for="(item, index) in filteredItems" :key="index" :value="item"
                @click="selectItem(item)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item density="compact" nav @click="createNewProject">
                <v-list-item-title>
                    <v-icon>mdi-plus</v-icon> {{ $t('project.createNew') }}
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
