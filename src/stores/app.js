import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    personnage: [],
    film: [],
  }),

  actions: {
    async trouverPersonnage() {
      try {
        const reponse = await axios.get('https://swapi.dev/api/people/')
        this.personnage = reponse.data.results
      } catch (error) {
        console.error('Erreur API:', error)
      }
    },

    async trouverRace(person) {
      if (!person.species || person.species.length === 0) {
        // Si species vide, considérer que c'est un humain
        return ['Human']
      }

      const nomsRaces = await Promise.all(
        person.species.map(async url => {
          const res = await axios.get(url)
          return res.data.name
        })
      )
      return nomsRaces
    },

    async init() {
      await this.trouverPersonnage()
    },
  },
})
