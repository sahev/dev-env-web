<script setup lang="ts">
import ProfileDD from './ProfileDD.vue';
import Navigations from './Navigations.vue';
import LogoComponent from '../components/LogoComponent.vue';

</script>

<template>
    <v-app-bar elevation="0" :priority="0" height="70" class="">

        <v-sheet class="ml-2" width="160">
            <LogoComponent></LogoComponent>
        </v-sheet>

        <div>
            <Navigations />
        </div>

        <v-spacer />
<!--
        <v-sheet>
            test2
        </v-sheet>

        <v-sheet>
            test3
        </v-sheet> -->

        <div class="mr-4">
            <ProfileDD />
        </div>
    </v-app-bar>
</template>