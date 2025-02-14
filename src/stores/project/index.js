import { defineStore } from 'pinia';

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    project: {},
    id: null
  }),
  actions: {
    fetchProject () {

    },
    setProject (project) {
      this.project = project
      this.id = project.id
    }
  }
});