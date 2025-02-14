<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';

const userStore = useUserStore()

const profileDD = computed(() => [
    {
        avatar: userStore.user.avatar,
        title: 'myProfile',
    },
    {
        title: 'opt1',
        href: '/settings'
    }
]);


const menu = ref()

</script>
<template>
    <v-menu v-model="menu" close-on-content-click>
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img :src="userStore.user.avatar" width="35"/>
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="d-flex align-center mt-4 pb-6">
                <div class="ml-3">
                    <v-card-title>{{ userStore.user.name }}</v-card-title>
                    <v-card-subtitle>{{ userStore.user.email }}</v-card-subtitle>
                </div>
            </div>
            <v-divider></v-divider>
            <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
                <v-list class="theme-list" lines="two">
                    <v-list-item v-for="item in profileDD" :key="item.title" class="custom-text-primary" :to="item.href"
                        density="compact">
                        <!-- <template v-slot:prepend>
                            <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                                <component :is="item.avatar" color="primary"/>
                            </v-avatar>
                        </template> -->
                        <div>
                            <h6 class="text-subtitle-1 font-weight-bold custom-title">{{ $t('profile.menuItems.' +
                                item.title +
                                '.title') }}</h6>
                        </div>
                        <!-- <p class="text-subtitle-1 font-weight-regular textSecondary">
                            {{ $t('profile.menuItems.' + item.title + '.subtitle') }}
                        </p> -->
                    </v-list-item>
                </v-list>
            </perfect-scrollbar>
            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" block @click="">{{ $t('button.logout') }}</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>