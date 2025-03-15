<script setup lang="ts">
import { Project } from '@/models/ProjectModel';
import { ref } from 'vue';

const props = defineProps({
    project: Project
})

const emit = defineEmits(['onDelete'])

function onDelete () {
    emit("onDelete", props.project)
}

const showConfirmButton = ref()

</script>
<template>
    <v-card-title>
        {{ $t('project.settings.delete.title') }}
    </v-card-title>

    <v-alert class="mb-4" icon="mdi-alert" border>
        Permanently delete project <span class="font-weight-bold">{{ project.name }}</span>. This action is not
        reversible.
    </v-alert>

    <v-btn v-if="showConfirmButton" color="primary" variant="outlined" class="ml-2 float-right" @click="showConfirmButton = !showConfirmButton">
        {{ $t('button.cancel') }}
    </v-btn>

    <v-btn v-if="showConfirmButton" color="info" variant="flat" class="ml-2 float-right" @click="onDelete">
        I want to delete this service
    </v-btn>

    <v-btn v-else class="text-none float-right" color="error" :text="$t('project.settings.delete.title')" variant="flat"
        @click="showConfirmButton = true"></v-btn>


</template>