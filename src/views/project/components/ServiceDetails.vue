<script setup lang="ts">
import { EServiceType } from '@/types/EServiceType';
import { useClipboard } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'vue-prism-component';
import "prismjs/components/prism-json";
import "prismjs/components/prism-ini"; // Para .env (similar a INI)
import "prismjs/components/prism-javascript"; // Para connection string
import { serviceService } from '@/services';
import { Service } from '@/models/ServiceModel';
import { EContainerStatusType } from '@/types/EContainerStatusType';

const props = defineProps<{
    service: Service,
    projectName: any
}>()

const emit = defineEmits(['onDelete'])

const { copy } = useClipboard();

const copyToClipboard = async (text) => {
    try {
        await copy(text);
    } catch (error) {
    }
};

function formatDate (date) {
    return new Date(date).toLocaleString("pt-BR");
}

const connectionString = ref(`Host=${props.service.host};Database=${props.service.name.replaceAll(' ', '_').replaceAll('-', '_')};User=${props.service.user};Password=${props.service.password};`);

const envFile = ref(`DB_HOST=${props.service.host}
DB_NAME=${props.service.name.replaceAll(' ', '_').replaceAll('-', '_')}
DB_USER=${props.service.user}
DB_PASS=${props.service.password}`);

const appsettings = ref(`{
  "ConnectionStrings": {
    "DefaultConnection": "Host=${props.service.host};Database=${props.service.name.replaceAll(' ', '_').replaceAll('-', '_')};User=${props.service.user};Password=${props.service.password};"
  }
}`);

const prismLanguage = computed(() => {
    if (tab.value === "envFile") return "ini";
    if (tab.value === "appsettings") return "json";
    return "javascript"; // Para string de conexão
});

// Computed para exibir o conteúdo correto
const displayedContent = computed(() => {
    if (tab.value === "envFile") return envFile.value;
    if (tab.value === "appsettings") return appsettings.value;
    return connectionString.value; // Padrão
});

const tab = ref('connectionString')

const loading = ref()

async function onDelete () {
    loading.value = true
    await serviceService.delete(props.service.id)
    emit('onDelete', props.service)
}

const isPasswordVisible = ref(false);

const getStatusColor = (status: EContainerStatusType) => {
    if (status == undefined) {
        status = EContainerStatusType.Waiting
    }

    switch (status) {
        case EContainerStatusType.Running:
            return "success"
        case EContainerStatusType.Terminated:
            return "none"
        case EContainerStatusType.Waiting:
            return "warning"
        default:
            return "error"
    }
};


function convertToGigabytes (value: number): string {
    const number = (value / 1024 ** 3).toFixed(2);

    return number.endsWith("0") ? parseFloat(number).toString() : number;
}

function humanizeMetrics (metrics) {
    return {
        cpu: formatCPU(metrics.usage.cpu),
        memory: convertToGigabytes(metrics.usage.memory),
        upTime: metrics.upTime.toFixed(2)
    };
}

function formatCPU (cpu) {
    return cpu < 1 ?
        {
            value: (cpu * 1000).toFixed(0),
            unit: "m"
        } :
        {
            value: cpu.toFixed(2).endsWith(".00") ? cpu.toFixed(0) : cpu.toFixed(2),
            unit: "cores"
        }
}


</script>
<template>
    <v-card class="pa-4 rounded-lg mx-auto" width="900">
        <v-card-title class="text-h6 font-weight-bold">
            {{ $t('service.detailsTitle') }}
        </v-card-title>

        <v-divider></v-divider>

        <v-list density="compact">
            <v-list-item>
                <v-row no-gutters>

                    <v-col cols="3">
                        <v-list-item-title class="font-weight-bold"> {{ $t('service.type') }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ EServiceType[service.serviceType] }}
                        </v-list-item-subtitle>
                    </v-col>

                    <v-col cols="3">
                        <v-list-item-title class="font-weight-bold"> {{ $t('service.storageSize') }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ service.storageSize }}
                        </v-list-item-subtitle>
                    </v-col>

                    <v-col cols="3">
                        <v-list-item-title class="font-weight-bold"> {{ $t('service.cpuSizeTitle') }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ humanizeMetrics(service.containerMetrics).cpu.value }} {{
                                humanizeMetrics(service.containerMetrics).cpu.unit }}
                        </v-list-item-subtitle>
                    </v-col>

                    <v-col cols="3">
                        <v-list-item-title class="font-weight-bold"> {{ $t('service.memorySizeTitle') }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ convertToGigabytes(service.containerMetrics.usage.memory) }} GB
                        </v-list-item-subtitle>
                    </v-col>
                </v-row>
            </v-list-item>

            <v-list-item>
                <v-list-item-title class="font-weight-bold"> {{ $t('service.host') }} </v-list-item-title>
                <v-list-item-subtitle class="d-flex align-center">
                    {{ service.host }}
                    <v-icon icon="mdi-content-copy" variant="text" size="small" class="ml-2"
                        @click="copyToClipboard(service.host)" />
                    <v-badge :color="getStatusColor(service.containerStatusType)" :content="service.containerStatusType != undefined ? EContainerStatusType[service.containerStatusType] :
                        EContainerStatusType[EContainerStatusType.Waiting]" inline>
                    </v-badge>
                </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="service.user">
                <v-list-item-title class="font-weight-bold"> {{ $t('service.user') }} </v-list-item-title>
                <v-list-item-subtitle class="d-flex align-center">
                    {{ service.user }}
                    <v-icon icon="mdi-content-copy" variant="text" size="small" class="ml-2"
                        @click="copyToClipboard(service.user)" />
                </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="service.password">
                <v-list-item-title class="font-weight-bold">
                    {{ $t('service.password') }}
                </v-list-item-title>
                <v-list-item-subtitle class="d-flex align-center">
                    {{ isPasswordVisible ? service.password : '******' }}

                    <!-- Ícone para alternar visibilidade -->
                    <v-icon :icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" class="ml-2" size="small"
                        @click="isPasswordVisible = !isPasswordVisible" />

                    <!-- Ícone para copiar -->
                    <v-icon icon="mdi-content-copy" class="ml-2" size="small"
                        @click="copyToClipboard(service.password)" />
                </v-list-item-subtitle>
            </v-list-item>


            <v-list-item>
                <v-list-item-title class="font-weight-bold"> {{ $t('service.createdAt') }} </v-list-item-title>
                <v-list-item-subtitle>{{ formatDate(service.createdAt) }} - {{ service.createdBy
                    }}</v-list-item-subtitle>
            </v-list-item>



            <v-list-item v-if="service.description">
                <v-list-item-title class="font-weight-bold"> {{ $t('service.description') }} </v-list-item-title>

                <v-textarea variant="outlined" rows="2" no-resize readonly v-model="service.description">
                </v-textarea>
            </v-list-item>

        </v-list>

        <v-tabs v-model="tab" class="mt-4">
            <v-tab value="connectionString">{{ $t("service.parametersOnly") }}</v-tab>
            <v-tab value="envFile">.env</v-tab>
            <v-tab value="appsettings">appsettings.json</v-tab>
        </v-tabs>

        <!-- PrismJS para exibição de código formatado -->
        <v-card class="code-container mt-4">
            <v-btn icon="mdi-content-copy" class="copy-button" @click="copyToClipboard">
            </v-btn>
            <prism :key="tab" :language="prismLanguage" class="code-snippet" style="white-space: pre-wrap;">{{
                displayedContent }}</prism>
        </v-card>

        <v-card-actions class="ma-2 d-flex justify-end">
            <v-btn class="text-none" color="error" :text="$t('button.delete')" variant="flat" :loading="loading"
                @click="onDelete"></v-btn>
        </v-card-actions>

    </v-card>
</template>
<style scoped>
.code-container {
    position: relative;
    border-radius: 8px;
    background: #2d2d2d;
    /* Cor do tema Prism */
}

.copy-button {
    position: absolute;
    top: 10px;
    right: 10px;
    color: white;
}
</style>