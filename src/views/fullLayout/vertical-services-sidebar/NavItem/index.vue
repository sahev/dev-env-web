<script setup lang="ts">
import Icon from '../Icon.vue';
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();
const isMobile = smAndDown.value;

const props = defineProps({ item: Object, level: Number });

</script>

<template>
    <!---Single Item-->
    <v-list-item :to="item.to.startsWith('/') ? item.to : `/project/${$route.params.id}/${item.to}`"
        :href="item.type === 'external' ? item.to : ''" rounded class="mb-1" :disabled="item.disabled"
        :target="item.type === 'external' ? '_blank' : ''">
        <!---If icon-->
        <template v-slot:prepend>
            <Icon :icon="item.icon" :level="level" />
        </template>
        <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        <!---If Caption-->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1">
            {{ item.subCaption }}
        </v-list-item-subtitle>
        <!---If any chip or label-->
        <template v-slot:append v-if="item.chip">
            <v-chip :color="item.chipColor" :class="'sidebarchip bg-' + item.chipBgColor"
                :size="item.chipIcon ? 'x-small' : 'x-small'" :variant="item.chipVariant" :prepend-icon="item.chipIcon">
                {{ $t(item.chip) }}
            </v-chip>
        </template>
        <!-- <template v-slot:append v-if="item.whatsappMessagesCounter && messagesNotReaded > 0">
            <v-chip
                :color="item.chipColor"
                :class="'sidebarchip hide-menu bg-' + item.chipBgColor"
                size="x-small"
                :variant="item.chipVariant"
                :prepend-icon="item.chipIcon"
            >
                {{ messagesNotReaded }}
            </v-chip>
        </template> -->
    </v-list-item>
</template>
