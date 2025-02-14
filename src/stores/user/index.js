import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      id: '1234user',
      name: 'John Doe',
      email: 'email@1.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});