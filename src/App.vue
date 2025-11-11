<template>
  <v-app>
    <!-- Header de l'application -->
    <AppHeader />

    <!-- Contenu principal de la page -->
    <v-main>
      <v-container>
        <!-- Barre de recherche, tri et filtres -->
        <BarreFiltre
          v-model:search="search"                <!-- Liaison de la valeur de recherche -->
        v-model:sortOption="sortOption"        <!-- Liaison de l'option de tri -->
        v-model:showFavoritesOnly="showFavoritesOnly" <!-- Filtrer uniquement les favoris -->
        :sortOptions="sortOptions"             <!-- Options disponibles pour le tri -->
        />

        <!-- Liste des personnages sous forme de grille -->
        <v-row>
          <v-col
            v-for="(person, index) in filteredPeople" <!-- Parcours des personnages filtrés -->
          :key="index"
          cols="12"
          md="4"
          sm="6"
          >
          <!-- Carte individuelle pour chaque personnage -->
          <PersonnageCard
            :personnage="person"           <!-- Données du personnage -->
          :favorites="favorites"         <!-- Liste des favoris -->
          @toggle-favorite="toggleFavorite" <!-- Gestion des favoris -->
          @select-personnage="openDetail"   <!-- Ouvrir le détail du personnage -->
          />
          </v-col>
        </v-row>

        <!-- Message affiché si aucun personnage ne correspond -->
        <v-alert
          v-if="filteredPeople.length === 0"
          class="text-center mt-4"
          type="warning"
        >
          Aucun personnage ne correspond à votre recherche.
        </v-alert>

        <!-- Modal affichant les détails d'un personnage sélectionné -->
        <v-dialog v-model="detailDialog" max-width="500">
          <v-card v-if="selectedPerson">
            <v-card-title class="text-h6">{{ selectedPerson.name }}</v-card-title>
            <v-card-text>
              <p>Genre : {{ selectedPerson.gender }}</p>
              <p>Taille : {{ selectedPerson.height }} cm</p>
              <p>Cheveux : {{ selectedPerson.hair_color }}</p>
              <p>Peau : {{ selectedPerson.skin_color }}</p>
              <!-- Vérifie si le personnage a une race connue -->
              <p v-if="selectedPerson.speciesNames && selectedPerson.speciesNames.length > 0">
                Race : {{ selectedPerson.speciesNames.join(', ') }}
              </p>
              <p v-else>Race : Inconnue</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="detailDialog = false">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'           // Import des fonctionnalités de Vue
import { useAppStore } from '@/stores/app.js'           // Import du store Pinia
import AppHeader from '@/components/AppHeader.vue'      // Import du composant Header
import BarreFiltre from '@/components/BarreFiltre.vue'  // Import de la barre de filtre
import PersonnageCard from '@/components/PersonnageCard.vue' // Import de la carte personnage

// Utilisation du store Pinia
const store = useAppStore()

// Déclarations des états réactifs
const people = ref([])               // Liste de tous les personnages
const search = ref('')               // Valeur de recherche
const sortOption = ref(null)         // Option de tri sélectionnée
const showFavoritesOnly = ref(false) // Filtrer uniquement les favoris
const favorites = ref([])            // Liste des personnages favoris

// Gestion du modal et du personnage sélectionné
const selectedPerson = ref(null)     // Personnage actuellement sélectionné
const detailDialog = ref(false)      // Ouverture/fermeture du modal

// Options de tri disponibles pour l'utilisateur
const sortOptions = [
  { title: 'ordre alphabétique (A → Z)', value: 'az' },
  { title: 'ordre alphabétique (Z → A)', value: 'za' },
  { title: 'Favoris', value: 'fav' },
]

// Initialisation du store et récupération des personnages à l'affichage
onMounted(async () => {
  await store.init()                 // Appel de la fonction d'initialisation du store
  people.value = store.personnage    // Chargement des personnages depuis le store
})

// Fonction pour vérifier si un personnage est dans les favoris
function isFavorite(person) {
  return favorites.value.some(fav => fav.name === person.name)
}

// Fonction pour ajouter ou retirer un personnage des favoris
function toggleFavorite(person) {
  if (isFavorite(person)) {
    // Retirer des favoris si déjà présent
    favorites.value = favorites.value.filter(fav => fav.name !== person.name)
  } else {
    // Ajouter aux favoris si absent
    favorites.value.push(person)
  }
}

// Filtrage et tri des personnages affichés
const filteredPeople = computed(() => {
  let list = [...people.value] // Copie de la liste originale

  // Filtrage par recherche
  if (search.value) {
    list = list.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
  }

  // Filtrage pour ne garder que les favoris
  if (showFavoritesOnly.value) {
    list = list.filter(p => isFavorite(p))
  }

  // Tri selon l'option choisie
  switch (sortOption.value) {
    case 'az': // Tri alphabétique A → Z
      list.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'za': // Tri alphabétique Z → A
      list.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'fav': // Tri par favoris (favoris en premier)
      list.sort((a, b) => {
        const aFav = isFavorite(a)
        const bFav = isFavorite(b)
        return aFav === bFav ? 0 : aFav ? -1 : 1
      })
      break
  }

  return list
})

// Fonction pour ouvrir le modal de détail d'un personnage
async function openDetail(person) {
  const speciesNames = await store.trouverRace(person) // Récupère la race via le store
  selectedPerson.value = { ...person, speciesNames }   // Enregistre le personnage sélectionné
  detailDialog.value = true                             // Ouvre le modal
}
</script>

<style scoped>
/* Animation douce au survol des cartes */
.v-card {
  transition: transform 0.2s ease; /* Transition pour effet zoom */
}
.v-card:hover {
  transform: scale(1.03);         /* Agrandissement léger au survol */
}
.cursor-pointer {
  cursor: pointer;                /* Curseur pointeur pour les éléments cliquables */
}
</style>
