import { defineStore } from 'pinia'
import axios from 'axios'

// Définition du store Pinia pour gérer les données de l'application
export const useAppStore = defineStore('app', {

  // État du store : contient les données principales
  state: () => ({
    personnage: [], // Liste des personnages récupérés depuis l'API
    film: [],       // Liste des films (non utilisée dans ton code actuel)
  }),

  // Actions pour modifier ou récupérer les données
  actions: {

    // Récupérer la liste des personnages depuis l'API SWAPI
    async trouverPersonnage() {
      try {
        const reponse = await axios.get('https://swapi.dev/api/people/')
        this.personnage = reponse.data.results // Stockage des résultats dans l'état
      } catch (error) {
        console.error('Erreur API:', error)  // Gestion des erreurs
      }
    },

    // Récupérer le(s) nom(s) de la race d'un personnage
    async trouverRace(person) {
      // Si le personnage n'a pas de species définie, considérer "Human"
      if (!person.species || person.species.length === 0) {
        return ['Human']
      }

      // Pour chaque URL de species, récupérer le nom via l'API
      const nomsRaces = await Promise.all(
        person.species.map(async url => {
          const res = await axios.get(url)
          return res.data.name // Récupère le nom de la race
        })
      )
      return nomsRaces
    },

    // Initialisation du store : charge les personnages
    async init() {
      await this.trouverPersonnage()
    },
  },
})
