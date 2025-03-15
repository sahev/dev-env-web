import { defineStore } from 'pinia';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: {}
  }),
  actions: {
    fetchProject () {

    },
    setProject (project) {
      this.project = project
    }
  }, persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});