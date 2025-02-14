import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa os estilos do Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Importa os ícones
import { useI18n } from 'vue-i18n'; // Importe o useI18n

export default createVuetify({
  theme: {
    defaultTheme: 'dark', // Tema escuro como padrão
    locale: {
      useI18n,
    },
    themes: {
      dark: {
        dark: true, // Ativa o tema escuro
        fonts: {
          body: 'Inter, sans-serif', // Definindo a fonte principal para o corpo
        },
        colors: {
          primary: '#4CAF50', // Verde
          secondary: '#7fe583', // verde claro
          background: '#121212', // Fundo escuro
          surface: '#1E1E1E', // Superfície escura
          error: '#CF6679', // Vermelho suave
          info: '#2196F3', // Azul
          success: '#4CAF50', // Verde (pode ser o mesmo que primary)
          warning: '#FB8C00', // Laranja
          'on-primary': '#FFFFFF', // Texto sobre a cor primária (branco)
          'on-secondary': '#000000', // Texto sobre a cor secundária (preto)
          'on-background': '#FFFFFF', // Texto sobre o fundo (branco)
          'on-surface': '#FFFFFF', // Texto sobre a superfície (branco)
          'on-error': '#FFFFFF', // Texto sobre a cor de erro (branco)
          'on-info': '#FFFFFF', // Texto sobre a cor de informação (branco)
          'on-success': '#FFFFFF', // Texto sobre a cor de sucesso (branco)
          'on-warning': '#000000', // Texto sobre a cor de aviso (preto)
        },
      },
    },
  },
});