<script setup lang="ts">
import { Service } from '@/models/ServiceModel';
import { ServiceType } from '@/models/ServiceTypeModel';
import { EServiceType } from '@/types/EServiceType';
import { computed, ref } from 'vue';

const props = defineProps<{
    service: Service,
    serviceTypes: ServiceType[]
}>();

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

const formData = ref<Service>({
    id: props.service?.id || null,
    name: props.service?.name || null,
    description: props.service?.description || null,
    createdAt: props.service?.createdAt || null,
    createdBy: props.service?.createdBy || null,
    updatedAt: props.service?.updatedAt || null,
    updatedBy: props.service?.updatedBy || null,
    serviceType: props.service?.serviceType || null,
    storageSize: props.service?.storageSize || "0.1Gi",
    containerStatusType: props.service?.containerStatusType || null,
    userId: props.service?.userId || null,
    projectId: props.service?.projectId || null,
    host: props.service?.host || null,
    user: props.service?.user || null,
    password: props.service?.password || null
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
</script>
<template>
    <v-card class="mx-auto" width="600">
        <v-card-title class="d-flex justify-space-between align-center">
            <div class="text-h5 text-medium-emphasis ps-2">
                {{ service ? $t('service.editTitle') : $t('service.addTitle') }}
            </div>
        </v-card-title>

        <v-divider class="mt-2"></v-divider>
        <v-card-text>
            <v-form ref="form">

                <div class="mb-2" v-if="!formData.id">{{ $t('service.serviceType') }}</div>

                <v-btn-toggle v-if="!formData.id" v-model="formData.serviceType" mandatory color="info" divided class="d-flex gap-2">
                    <v-btn v-for="serv in serviceTypes" :key="serv.serviceType" :value="serv.serviceType"
                        class="only-border d-flex justify-center flex-column align-center pa-5" rounded width="200">
                        <v-icon :icon="serv.icon"></v-icon>
                        <div class="text-h5 text-medium-emphasis ps-2">
                            {{ EServiceType[serv.serviceType] }}
                        </div>
                    </v-btn>
                </v-btn-toggle>

                <div class="mb-2">{{ $t('service.name') }}</div>
                <v-text-field v-model="formData.name" class="mb-2" rows="2" variant="outlined"
                    :placeholder="$t('service.namePlaceholder')" density="compact" counter="25" persistent-counter :readonly="formData.id"
                    :rules="[v => !v || v.length <= 25]"></v-text-field>

                <div class="mb-2">{{ $t('service.description') }}</div>
                <v-text-field v-model="formData.description" class="mb-2" rows="2" variant="outlined"
                    density="compact"></v-text-field>

                <div class="mb-2" v-if="!formData.id">{{ $t('service.storageSize') }}</div>
                <v-card class="only-border" v-if="!formData.id">
                    <v-slider v-model="formData.storageSize" class="pa-4 mt-2" :min="0.05" :max="5" :step="0.01" :readonly="formData.id"
                        hide-details>
                    </v-slider>

                    <div class="text-center text-h6">
                        {{ formattedStorageSize }}
                    </div>
                </v-card>
            </v-form>
        </v-card-text>

        <v-card-actions class="ma-4 d-flex justify-end">
            <v-btn class="text-none" :text="$t('button.cancel')" @click="onCancel"></v-btn>

            <v-btn class="text-none" color="primary" :text="$t('button.save')" variant="flat" :disabled="!isFormValid || (formData.serviceType == undefined && !formData.id)" :loading="loading"
                @click="onSave"></v-btn>
        </v-card-actions>
    </v-card>
</template>