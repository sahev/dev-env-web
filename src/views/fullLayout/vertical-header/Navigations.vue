<script setup lang="ts">
import { projectService } from '@/services';
import { useProjectStore } from '@/stores/project';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const project = ref()

const route = useRoute()

const isProjectRoute = ref(route.path.includes('/project/'))

const projectStore = useProjectStore()

const search = ref("")

const filteredItems = computed(() => {
    return projects.value.filter((item) =>
        item.name.toLowerCase().includes(search.value.toLowerCase())
    );
})

function selectItem (item) {
    projectStore.project = item
    window.location.href = `/project/${item.id}/info`
}

const projects = ref([])

async function getProjects () {
    const projectsResponse = await projectService.getAll()
    projects.value = projectsResponse.items
    setProject()
}

function setProject() {
    const proj = projects.value.filter(x => x.id == route.params.id)[0]
    project.value = proj
}

watch(
    () => route.name,
    (newParam) => {
        isProjectRoute.value = route.path.includes('/project/')
        setProject()
    }
);

onMounted(async () => {
    // getProjects()
    setProject()
})

</script>
<template>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn v-if="isProjectRoute" variant="text" color="primary" v-bind="props" @click="getProjects()"
                :append-icon="'mdi-chevron-down'">
                {{ projectStore.project.name }}
            </v-btn>
        </template>

        <v-list>
            <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" size="small" variant="solo"
                density="compact" class="ma-2" hide-details></v-text-field>

            <v-list-item density="compact" nav v-for="(item, index) in filteredItems" :key="index" :value="item"
                @click="selectItem(item)">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
