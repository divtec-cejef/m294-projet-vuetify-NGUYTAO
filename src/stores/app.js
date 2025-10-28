import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    personnage: [],
    film: [],
  }),

  actions: {
    async trouverPersonnage () {
      try {
        const reponse = await api.get('/people')
        this.personnage = reponse.data.results
      } catch (error) {
        console.error('Erreur API:', error)
      }
    },
    async init() {
      await this.trouverPersonnage();
    }
  },
})
