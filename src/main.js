import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router';
import i18n from './plugins/i18n';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n);

app.mount('#app')
