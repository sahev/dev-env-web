<script setup lang="ts">
import { projectService } from '@/services';
import { EServiceType } from '@/types/EServiceType';
import { StatusType } from '@/types/StatusType';
import { computed, onMounted, ref, watch } from 'vue';
import { useClipboard } from "@vueuse/core";
import ServiceDetails from './ServiceDetails.vue';
import { Project } from '@/models/ProjectModel';
import { EContainerStatusType } from '@/types/EContainerStatusType';
import { useRoute } from 'vue-router';

const project = ref<Project>()
const route = useRoute()

async function getProject (projectId) {
    project.value = await projectService.get(projectId)
}

onMounted(() => {
    getProject(route.params.id)
})

const getStatusColor = (status: EContainerStatusType) => {
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

const getServiceIcon = (serviceType) => {
    switch (serviceType) {
        case EServiceType.Postgres: // Postgres
            return "mdi-database";
        case EServiceType.Redis: // Redis
            return "mdi-cards-variant";
        default:
            return "mdi-help-circle-outline"; // Ícone padrão caso o tipo não seja reconhecido
    }
};

const { copy } = useClipboard();

const copyToClipboard = async (text) => {
    try {
        await copy(text);
    } catch (error) {
    }
};

const service = ref()
const showServiceDialog = ref()

function showServiceDetails (data) {
    service.value = data
    showServiceDialog.value = true
}

function onDelete (data) {
    const idx = project.value.services.findIndex(x => x.id === data.id);
    if (idx !== -1) {
        project.value.services.splice(idx, 1);
    }

    showServiceDialog.value = false
}

function convertToBytes (value: string) {
    const units = { 'Mi': 1024 ** 2, 'Gi': 1024 ** 3 }
    const match = value.match(/(\d+(\.\d+)?)([MG]i)/);

    if (!match) return 0;

    const number = parseFloat(match[1]);
    const unit = match[3];

    return number * (units[unit] || 1);
}

function convertToGigabytes (value: number): string {
    const number = (value / 1024 ** 3).toFixed(2);

    return number.endsWith("0") ? parseFloat(number).toString() : number;
}


let getServicesSize = computed(() => project.value?.services?.reduce((sum, s) => convertToBytes(s.storageSize) + sum, 0))

let getProjectStorageSize = computed(() => {
    const match = project.value.storageSize.match(/(\d+(\.\d+)?)([MG]i)/);

    const number = match[1].endsWith(".0") ? parseInt(match[1]) : match[1];

    return `${number}${match[3]}`
})

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
    <router-view></router-view>

    <v-row justify="start" class="mb-2">
        <v-col cols="4">
            <v-card height="150">
                <v-skeleton-loader :loading="!project" type="heading, text" height="150">
                    <v-card-title class="text-lg-h5 font-weight-bold">
                        {{ project.name }}
                    </v-card-title>
                    <v-card-text class="d-flex justify-space-between align-center">
                        {{ project.description }}
                    </v-card-text>
                    <v-card-text class="d-flex align-center">
                        <v-icon icon="mdi-calendar-clock" class="mr-2">
                        </v-icon>

                        {{ new Date(project.createdAt).toLocaleString() }} - {{ project.createdBy }}
                    </v-card-text>
                </v-skeleton-loader>
            </v-card>
        </v-col>
        <!-- <v-col cols="2" class="">
            <v-card height="150">
                <v-skeleton-loader :loading="!project" type="heading, avatar, text">
                    <v-card-title class="text-lg-h5 font-weight-bold">
                        {{ $t('project.servicesRunningTitle') }}
                    </v-card-title>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <a><span class="text-h3">{{ getRunningServices }}</span></a>
                    </v-card-text>
                </v-skeleton-loader>
            </v-card>
        </v-col> -->
        <v-col cols="2" class="">
            <v-card height="150">
                <v-skeleton-loader :loading="!project" type="heading, avatar, text">
                    <v-card-title class="text-lg-h5 font-weight-bold">
                        {{ $t('project.upTimeTitle') }}
                    </v-card-title>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <a class="text-subtitle-1">
                            <span class="text-h3">{{ humanizeMetrics(project.containerMetrics).upTime }}</span>
                            h
                        </a>
                    </v-card-text>
                </v-skeleton-loader>
            </v-card>
        </v-col>
        <v-col cols="2" class="">
            <v-card height="150">
                <v-skeleton-loader :loading="!project" type="heading, avatar, text">
                    <v-card-title class="text-lg-h5 font-weight-bold">
                        {{ $t('project.storageTitle') }}
                    </v-card-title>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <a class="text-subtitle-1">
                            <span class="text-h3">{{ convertToGigabytes(getServicesSize) }}</span>
                            /{{ getProjectStorageSize }}
                        </a>

                    </v-card-text>
                </v-skeleton-loader>
            </v-card>

        </v-col>
        <v-col cols="2" class="">
            <v-card height="150">
                <v-skeleton-loader :loading="!project" type="heading, avatar, text">
                    <v-card-title class="text-lg-h5 font-weight-bold">
                        {{ $t('project.cpuUsageTitle') }}
                    </v-card-title>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <a class="text-subtitle-1">
                            <span class="text-h3">{{ humanizeMetrics(project.containerMetrics).cpu.value }}
                            </span>
                            {{ humanizeMetrics(project.containerMetrics).cpu.unit }}
                        </a>

                    </v-card-text>
                </v-skeleton-loader>
            </v-card>

        </v-col>
        <v-col cols="2" class="">
            <v-card height="150">
                <v-skeleton-loader :loading="!project" type="heading, avatar, text">
                    <v-card-title class="text-lg-h5 font-weight-bold">
                        {{ $t('project.memoryUsageTitle') }}
                    </v-card-title>
                    <v-card-text class="d-flex justify-space-between align-center">
                        <a class="text-subtitle-1">
                            <span class="text-h3">{{ humanizeMetrics(project.containerMetrics).memory }}
                            </span>
                            Gi
                        </a>
                    </v-card-text>
                </v-skeleton-loader>
            </v-card>

        </v-col>
    </v-row>

    <!-- <v-card class="only-border mb-3">
        <v-card-title class="text-lg-h5 font-weight-bold">
            Project Info
        </v-card-title>
        <v-card-text>
            {{ project?.name }}
        </v-card-text>
        <v-card-text>
            {{ project?.description }}
        </v-card-text>

    </v-card> -->

    <v-card class="only-border">
        <v-card-title class="text-lg-h5 font-weight-bold">
            Services
        </v-card-title>

        <v-card v-for="service in project?.services" class="ma-4" @click="showServiceDetails(service)">
            <v-card-text>
                <div class="d-flex align-center justify-space-between">
                    <!-- Ícone e informações do serviço -->
                    <div class="d-flex align-center">
                        <v-icon :icon="getServiceIcon(service.serviceType)" class="mr-3" />
                        <!-- Ícone do banco de dados -->
                        <div class="d-flex flex-column">
                            <span class="font-weight-bold">{{ EServiceType[service.serviceType] }}</span>
                            <span>{{ service.host }}
                                <v-icon size="15" icon="mdi-content-copy" class="font-weight-thin ml-2 cursor-pointer"
                                    @click.stop="copyToClipboard(service.host)" />

                            </span>

                        </div>
                    </div>

                    <!-- Badge de status -->
                    <v-badge :color="getStatusColor(service.containerStatusType)"
                        :content="EContainerStatusType[service.containerStatusType]" inline />
                </div>
            </v-card-text>
        </v-card>
    </v-card>

    <v-dialog v-model="showServiceDialog" width="auto">
        <ServiceDetails :service="service" :project-name="project.name" @on-delete="onDelete" />
    </v-dialog>
</template>
<style scoped>
.v-skeleton-loader {
    display: inline !important;
}
</style>