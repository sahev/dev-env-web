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

const loading = ref()

function onSave () {
    loading.value = true
    formData.value.storageSize = formattedStorageSize.value
    emit("onSave", formData.value)
}

function onCancel () {
    emit("onCancel")
}

const formData = ref<Project>({
    id: props.project?.id || null,
    name: props.project?.name || null,
    description: props.project?.description || null,
    availableStorageSize: props.project?.availableStorageSize || null,
    storageSize: props.project?.storageSize || '5Gi',
    services: props.project?.services || [],
    createdAt: props.project?.createdAt || null,
    createdBy: props.project?.createdBy || null
})

const formattedStorageSize = computed(() => {
    if (formData.value.id) {
        return formData.value.storageSize
    }

    const size = parseFloat(formData.value.storageSize);
    return size < 1
        ? `${(size * 1000).toFixed(0)}Mi`
        : `${size.toFixed(1)}Gi`;
})

const convertToGigabytes = computed(() => {
console.log((formData.value.availableStorageSize / 1024 ** 3).toFixed(2), formData.value.availableStorageSize);

    return (formData.value.availableStorageSize / 1024 ** 3).toFixed(2)
}
)


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
                    :placeholder="$t('project.namePlaceholder')" density="compact" counter="25" persistent-counter
                    :rules="[v => !v || v.length <= 25]"></v-text-field>

                <div class="mb-2">{{ $t('project.description') }}</div>
                <v-text-field v-model="formData.description" class="mb-2" rows="2" variant="outlined" density="compact"
                    persistent-counter></v-text-field>

                <div class="mb-2" v-if="!formData.id">{{ $t('project.storageSize') }}</div>
                <v-card class="only-border" v-if="!formData.id">
                    <v-slider v-model="formData.storageSize" class="pa-4 mt-2" :min="0.05" :max="5"
                        :step="0.01" :readonly="formData.id" hide-details>
                    </v-slider>

                    <div class="text-center text-h6">
                        {{ formattedStorageSize }}
                    </div>
                </v-card>
            </v-form>
        </v-card-text>

        <v-card-actions class="ma-4 d-flex justify-end">
            <v-btn class="text-none" :text="$t('button.cancel')" @click="onCancel"></v-btn>

            <v-btn class="text-none" color="primary" :text="$t('button.save')" variant="flat" :disabled="!isFormValid"
                :laoding="loading" @click="onSave"></v-btn>
        </v-card-actions>
    </v-card>
</template>