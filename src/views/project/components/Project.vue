<script setup lang="ts">
import router from '@/plugins/router';
import { projectService } from '@/services';
import { EServiceType } from '@/types/EServiceType';
import { StatusType } from '@/types/StatusType';
import { onMounted, ref } from 'vue';
import { useClipboard } from "@vueuse/core";
import ServiceDetails from './ServiceDetails.vue';
import { Project } from '@/models/ProjectModel';
import { EContainerStatusType } from '@/types/EContainerStatusType';
// import VerticalSidebar from '@/views/fullLayout/';

const project = ref<Project>()

async function getProject () {
    project.value = await projectService.get(router.currentRoute.value.params.id)
    console.log(project.value);

}

onMounted(() => {
    getProject()
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

function showServiceDetails(data) {
    service.value = data
    showServiceDialog.value = true
}

function onDelete(data) {
    const idx = project.value.services.findIndex(x => x.id === data.id);
    if (idx !== -1) {
        project.value.services.splice(idx, 1);
    }

    showServiceDialog.value = false
}

</script>
<template>
    <!-- <VerticalSidebar></VerticalSidebar> -->

    <router-view></router-view>

    <v-card class="only-border mb-3">
        <v-card-title class="text-lg-h5 font-weight-bold">
            Project Info
        </v-card-title>
        <v-card-text>
            {{ project?.name }}
        </v-card-text>
        <v-card-text>
            {{ project?.description }}
        </v-card-text>

    </v-card>

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
                    <v-badge :color="getStatusColor(service.containerStatusType)" :content="EContainerStatusType[service.containerStatusType]" inline />
                </div>
            </v-card-text>
        </v-card>
    </v-card>

    <v-dialog v-model="showServiceDialog" width="auto">
            <ServiceDetails :service="service" :project-name="project.name" @on-delete="onDelete"/>
    </v-dialog>
</template>