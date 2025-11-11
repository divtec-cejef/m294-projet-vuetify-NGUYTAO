<template>
  <v-app>
    <!-- Header -->
    <AppHeader />

    <!-- Contenu principal -->
    <v-main>
      <v-container>
        <!-- Barre de recherche / tri / filtres -->
        <BarreFiltre
          v-model:search="search"
          v-model:sortOption="sortOption"
          v-model:showFavoritesOnly="showFavoritesOnly"
          :sortOptions="sortOptions"
        />

        <!-- Liste des personnages -->
        <v-row>
          <v-col
            v-for="(person, index) in filteredPeople"
            :key="index"
            cols="12"
            md="4"
            sm="6"
          >
            <PersonnageCard
              :personnage="person"
              :favorites="favorites"
              @toggle-favorite="toggleFavorite"
              @select-personnage="openDetail"
            />
          </v-col>
        </v-row>

        <!-- Message si aucun résultat -->
        <v-alert
          v-if="filteredPeople.length === 0"
          class="text-center mt-4"
          type="warning"
        >
          Aucun personnage ne correspond à votre recherche.
        </v-alert>

        <!-- Modal de détail -->
        <v-dialog v-model="detailDialog" max-width="500">
          <v-card v-if="selectedPerson">
            <v-card-title class="text-h6">{{ selectedPerson.name }}</v-card-title>
            <v-card-text>
              <p>Genre : {{ selectedPerson.gender }}</p>
              <p>Taille : {{ selectedPerson.height }} cm</p>
              <p>Cheveux : {{ selectedPerson.hair_color }}</p>
              <p>Peau : {{ selectedPerson.skin_color }}</p>
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
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app.js'
import AppHeader from '@/components/AppHeader.vue'
import BarreFiltre from '@/components/BarreFiltre.vue'
import PersonnageCard from '@/components/PersonnageCard.vue'

// Pinia store
const store = useAppStore()

// États principaux
const people = ref([])
const search = ref('')
const sortOption = ref(null)
const showFavoritesOnly = ref(false)
const favorites = ref([])

// Modal et personnage sélectionné
const selectedPerson = ref(null)
const detailDialog = ref(false)

// Options de tri
const sortOptions = [
  { title: 'ordre alphabétique (A → Z)', value: 'az' },
  { title: 'ordre alphabétique (Z → A)', value: 'za' },
  { title: 'Favoris', value: 'fav' },
]

// Initialisation store et chargement des personnages
onMounted(async () => {
  await store.init()
  people.value = store.personnage
})

// Gestion favoris
function isFavorite(person) {
  return favorites.value.some(fav => fav.name === person.name)
}

function toggleFavorite(person) {
  if (isFavorite(person)) {
    favorites.value = favorites.value.filter(fav => fav.name !== person.name)
  } else {
    favorites.value.push(person)
  }
}

// Filtrage et tri
const filteredPeople = computed(() => {
  let list = [...people.value]

  if (search.value) {
    list = list.filter(p => p.name.toLowerCase().includes(search.value.toLowerCase()))
  }

  if (showFavoritesOnly.value) {
    list = list.filter(p => isFavorite(p))
  }

  switch (sortOption.value) {
    case 'az':
      list.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'za':
      list.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'fav':
      list.sort((a, b) => {
        const aFav = isFavorite(a)
        const bFav = isFavorite(b)
        return aFav === bFav ? 0 : aFav ? -1 : 1
      })
      break
  }

  return list
})

// Ouvrir le détail via le store
async function openDetail(person) {
  const speciesNames = await store.trouverRace(person)
  selectedPerson.value = { ...person, speciesNames }
  detailDialog.value = true
}
</script>

<style scoped>
/* Animation douce au survol des cartes */
.v-card {
  transition: transform 0.2s ease;
}
.v-card:hover {
  transform: scale(1.03);
}
.cursor-pointer {
  cursor: pointer;
}
</style>
