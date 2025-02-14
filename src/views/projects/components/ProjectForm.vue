<script setup lang="ts">
import { Project } from '@/models/ProjectModel';
import { Service } from '@/models/ServiceModel';
import { computed, ref } from 'vue';
const props = defineProps({
    project: Project
});

const form = ref(null);

// Computed para verificar se o formulário é válido
const isFormValid = computed(() => {
  return form.value?.isValid || false;
});

const emit = defineEmits(['onSave', 'onCancel'])

function onSave () {
    emit("onSave", formData.value)
}

function onCancel () {
    emit("onCancel")
}

const formData = ref<Project>({
    id: props.project?.id || null,
    name: props.project?.name || null,
    description: props.project?.description || null,
    services: props.project?.services || [],
    createdAt: props.project?.createdAt || null,
    createdBy: props.project?.createdBy || null
})

</script>
<template>
    <v-card class="mx-auto" width="600">
        <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
                {{ project ? $t('project.editTitle') : $t('project.addTitle') }}
            </div>
        </v-card-title>

        <v-divider class="mt-2"></v-divider>
        <v-card-text>
            <v-form ref="form">

            <div class="mb-2">{{ $t('project.name') }}</div>
            <v-text-field v-model="formData.name" class="mb-2" rows="2" variant="outlined"
                :placeholder="$t('project.namePlaceholder')" density="compact" counter="25"
                persistent-counter
                :rules="[v =>  !v || v.length <= 25]"
                ></v-text-field>

            <div class="mb-2">{{ $t('project.description') }}</div>
            <v-text-field v-model="formData.description" class="mb-2" rows="2" variant="outlined" density="compact"
                persistent-counter></v-text-field>

            <!-- <div class="mb-2">{{ $t('project.compute') }}</div>
            <v-card class="only-border">
                <v-slider class="pa-4 mt-2" show-ticks :step="25"></v-slider>
            </v-card> -->
            </v-form>
        </v-card-text>

        <v-card-actions class="ma-4 d-flex justify-end">
            <v-btn class="text-none" :text="$t('button.cancel')" @click="onCancel"></v-btn>

            <v-btn class="text-none" color="primary" :text="$t('button.save')" variant="flat" :disabled="!isFormValid" @click="onSave"></v-btn>
        </v-card-actions>
    </v-card>
</template>