import { createI18n } from 'vue-i18n';
import en from '../locales/en'; // Importe as traduções em inglês
import pt from '../locales/pt'; // Importe as traduções em português
import { en as vuetifyEn, pt as vuetifyPt } from 'vuetify/locale'; // Traduções do Vuetify

const messages = {
    en: {
        ...en, // Traduções personalizadas em inglês
        $vuetify: vuetifyEn, // Traduções do Vuetify em inglês
    },
    pt: {
        ...pt, // Traduções personalizadas em português
        $vuetify: vuetifyPt, // Traduções do Vuetify em português
    },
};

const i18n = createI18n({
    legacy: false, // Use a API de composição (recomendado para Vue 3)
    locale: 'en', // Idioma padrão
    fallbackLocale: 'en', // Idioma de fallback
    messages, // Mensagens de tradução
});

export default i18n;