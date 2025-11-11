import axios from 'axios'

// Récupération de l'URL de base depuis les variables d'environnement
const baseURL = import.meta.env.VITE_API_URL

// Création d'une instance Axios personnalisée
const api = axios.create({
  baseURL, // URL de base pour toutes les requêtes
  timeout: 10_000, // Temps maximum d'attente pour une requête (10 secondes)
})

// Export de l'instance pour l'utiliser dans toute l'application
export default api
