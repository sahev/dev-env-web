<script setup lang="ts">
import router from '@/plugins/router';
import { projectService, serviceService } from '@/services';
import { EServiceType } from '@/types/EServiceType';
import { computed, onMounted, ref } from 'vue';
import ServiceForm from '../components/ServiceForm.vue';
import { getRandomName } from '@/utils/global';
import { ServiceType } from '@/models/ServiceTypeModel';
import { useUserStore } from '@/stores/user';
import ServiceDetails from '@/views/project/components/ServiceDetails.vue';
import { Project } from '@/models/ProjectModel';

const project = ref<Project>()

const { user } = useUserStore()

async function getProject () {
    project.value = await projectService.get(router.currentRoute.value.params.id)
}

onMounted(() => {
    getProject()
})

const filteredServices = computed(() => {
    const databaseServices = [EServiceType.Postgres, EServiceType.Redis]

    return project.value?.services?.filter(x => databaseServices.includes(x.serviceType))
})

const headers = computed(() => [
    { title: "project.database.table.name", value: 'name', sortable: true },
    { title: "project.database.table.serviceType", value: 'serviceType', sortable: true },
    { title: "project.database.table.storageSize", value: 'storageSize', sortable: true },
    { title: "project.database.table.createdAt", value: 'createdAt', sortable: true },
    { title: "project.database.table.createdBy", value: 'createdBy' },
    { value: "actions" }
]);

const showServiceForm = ref()

async function onSave (service) {
    if (service.id) {
        await serviceService.update(service)

        const idx = project.value.services.findIndex(x => x.id === service.id);

        if (idx !== -1) {
            project.value.services[idx] = service;
        }

        showSnackBar.value = true
        showServiceForm.value = false
        service.value = null
        return
    }

    service.projectId = project.value.id
    service.userId = user.id

    if (!service.name) {
        service.name = getRandomName()
    }

    var res = await serviceService.post(service)

    project.value.services.unshift(res);

    showSnackBar.value = true
    showServiceForm.value = false
    service.value = null
}

const showSnackBar = ref()
const snackBarText = ref("Done")

const serviceTypes: ServiceType[] = [
    {
        serviceType: EServiceType.Postgres,
        icon: 'mdi-database',

    },
    {
        serviceType: EServiceType.Redis,
        icon: 'mdi-cards-variant',
    },
]

const showServiceDetailsDialog = ref()

function onDelete (data) {
    const idx = project.value.services.findIndex(x => x.id === data.id);
    if (idx !== -1) {
        project.value.services.splice(idx, 1);
    }

    showServiceDetailsDialog.value = false
}

const service = ref()

function viewDetails (evt, data) {
    console.log(data.item, 'cli');

    service.value = data.item
    showServiceDetailsDialog.value = true
}

function onEdit (item) {
    service.value = item
    showServiceForm.value = true
}

function onCancel() {
    showServiceForm.value = false
    service.value = null
}

function newDatabase() {
    service.value = null
    showServiceForm.value = true
}
</script>
<template>
    <v-card class="mb-2 border-none text-lg-h5 font-weight-bold mx-auto" max-width="900">
        <span class="text-lg-h5 font-weight-bold">
            {{ $t('project.database.title') }}
        </span>
        <v-btn class="float-right" color="primary" @click="newDatabase"
            :text="$t('button.newDatabase')"></v-btn>
    </v-card>
    <v-card class="only-border mx-auto" max-width="900">

        <v-data-table :headers="headers" :items="filteredServices" @click:row="viewDetails">
            <template v-slot:[`header.name`]="{ column }">
                {{ $t(column.title) }}
            </template>
            <template v-slot:[`header.serviceType`]="{ column }">
                {{ $t(column.title) }}
            </template>
            <template v-slot:[`header.storageSize`]="{ column }">
                {{ $t(column.title) }}
            </template>
            <template v-slot:[`header.createdAt`]="{ column }">
                {{ $t(column.title) }}
            </template>
            <template v-slot:[`header.createdBy`]="{ column }">
                {{ $t(column.title) }}
            </template>

            <template #item.serviceType="{ value }">
                {{ EServiceType[value] }}
            </template>

            <template #item.createdAt="{ value }">
                {{ new Date(value).toLocaleString() }}
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon class="me-2" size="small" @click.stop="onEdit(item)">
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>
    </v-card>

    <v-dialog v-model="showServiceForm" width="auto">
        <ServiceForm :service="service" :service-types="serviceTypes" @on-save="onSave"
            @on-cancel="onCancel"></ServiceForm>
    </v-dialog>

    <v-snackbar v-model="showSnackBar" :timeout="2000" color="info">
        {{ snackBarText }}
    </v-snackbar>

    <v-dialog v-model="showServiceDetailsDialog" width="auto">
        <ServiceDetails :service="service" :project-name="project.name" @on-delete="onDelete" />
    </v-dialog>
</template>