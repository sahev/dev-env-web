<script setup lang="ts">
import { Project } from '@/models/ProjectModel';

const props = defineProps({
    project: Project
})

const emit = defineEmits(['onDelete'])

function onDelete () {
    emit("onDelete", props.project)
}
</script>
<template>
    <v-card-title>
        {{ $t('project.settings.delete.title') }}
    </v-card-title>

    <v-alert class="mb-4" icon="mdi-alert" border>
        Permanently delete project <span class="font-weight-bold">{{ project.name }}</span>. This action is not
        reversible.
    </v-alert>

    <v-btn class="text-none float-right" color="error" :text="$t('project.settings.delete.title')" variant="flat" @click="onDelete"></v-btn>
</template>