<script setup lang="ts">
import { Project } from '@/models/ProjectModel';

const props = defineProps({
    project: Project
})

const emit = defineEmits(['onSave', 'onCancel'])

function onSave () {
    emit("onSave", props.project)
}

</script>
<template>
    <div class="mb-2">{{ $t('project.name') }}</div>
    <v-text-field v-model="project.name" class="mb-2" rows="2" variant="outlined" density="compact" readonly>
    </v-text-field>

    <div class="mb-2">{{ $t('project.description') }}</div>
    <v-text-field v-model="project.description" class="mb-2" rows="2" variant="outlined" density="compact"
        persistent-counter>
    </v-text-field>

    <v-btn class="text-none float-right" color="primary" :text="$t('button.save')" variant="flat" @click="onSave"></v-btn>
</template>