<template>

  <v-locale-provider>
    <v-app :class="['mini-sidebar']">
      <!-- Navbar -->
      <!-- <v-app-bar elevation="2">
        <v-container class="d-flex align-center">
          <v-app-bar-title>Logo&DevEnv</v-app-bar-title>

          <v-btn icon="mdi-menu" @click="drawer = !drawer">project-1</v-btn>

          <v-spacer></v-spacer>

          <v-avatar>
            <v-img :src="userStore.user.avatar" alt="User Avatar"></v-img>
          </v-avatar>
        </v-container>
      </v-app-bar> -->

      <VerticalHeader />
      <!-- Navigation Drawer -->
      <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item title="Dashboard" to="overview" prepend-icon="mdi-view-dashboard"></v-list-item>
        <v-list-item title="Configurações" to="settings" prepend-icon="mdi-cog"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->
      <VerticalSidebar></VerticalSidebar>
      <!-- Conteúdo principal -->
      <v-main>
        <v-container>
          <router-view name="sidebar"></router-view>

          <router-view />
        </v-container>
      </v-main>
    </v-app>

  </v-locale-provider>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import VerticalSidebar from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeader from './vertical-header/VerticalHeader.vue';

const userStore = useUserStore()
const drawer = ref(true);
</script>
