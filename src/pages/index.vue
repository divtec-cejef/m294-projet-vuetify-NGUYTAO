<template>
  <v-container>
    <!-- Barre de recherche et filtres -->
    <v-row align="center" class="mb-4" justify="space-between">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          clearable
          label="Rechercher un personnage"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="sortOption"
          clearable
          :items="sortOptions"
          label="Trier par"
        />
      </v-col>

      <v-col cols="12" md="4">
        <v-checkbox
          v-model="showFavoritesOnly"
          label="Afficher uniquement les favoris"
        />
      </v-col>
    </v-row>

    <!-- Liste des personnages -->
    <v-row>
      <v-col
        v-for="(person, index) in filteredPeople"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between align-center">
            {{ person.name }}
            <v-btn
              :color="isFavorite(person) ? 'red' : 'grey'"
              icon
              variant="text"
              @click="toggleFavorite(person)"
            >
              <v-icon>{{ isFavorite(person) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-subtitle>Genre : {{ person.gender }}</v-card-subtitle>
          <v-card-text>Taille : {{ person.height }} cm</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-if="filteredPeople.length === 0" class="text-center mt-4" type="warning">
      Aucun personnage ne correspond à votre recherche.
    </v-alert>

  </v-container>
</template>

<script setup>
  import axios from 'axios'
  import { computed, onMounted, ref } from 'vue'

  // Données principales
  const people = ref([])

  // Recherche, tri et favoris
  const search = ref('')
  const sortOption = ref(null)
  const showFavoritesOnly = ref(false)
  const favorites = ref([])

  const sortOptions = [
    { title: 'ordre alphabétique (A → Z)', value: 'az' },
    { title: 'ordre alphabétique (Z → A)', value: 'za' },
    { title: 'Favoris', value: 'fav' },
  ]

  // Charger les personnages
  onMounted(async () => {
    try {
      const res = await axios.get('https://swapi.dev/api/people/')
      people.value = res.data.results
    } catch (error) {
      console.error(error)
    }
  })

  // Vérifie si un personnage est favori
  function isFavorite (person) {
    return favorites.value.some(fav => fav.name === person.name)
  }

  // Ajoute ou retire un favori
  function toggleFavorite (person) {
    if (isFavorite(person)) {
      favorites.value = favorites.value.filter(fav => fav.name !== person.name)
    } else {
      favorites.value.push(person)
    }
  }

  // Liste filtrée et triée
  const filteredPeople = computed(() => {
    let list = [...people.value]

    // Filtrer par recherche
    if (search.value) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.value.toLowerCase()),
      )
    }

    // Filtrer les favoris si demandé
    if (showFavoritesOnly.value) {
      list = list.filter(p => isFavorite(p))
    }

    // Trier selon l'option
    switch (sortOption.value) {
      case 'az': {
        list.sort((a, b) => a.name.localeCompare(b.name))

        break
      }
      case 'za': {
        list.sort((a, b) => b.name.localeCompare(a.name))

        break
      }
      case 'fav': {
        list.sort((a, b) => {
          const aFav = isFavorite(a)
          const bFav = isFavorite(b)
          return aFav === bFav ? 0 : (aFav ? -1 : 1)
        })

        break
      }
    }
    return list
  })
</script>

<style scoped>
.v-card {
  transition: transform 0.2s ease;
}
.v-card:hover {
  transform: scale(1.03);
}
</style>
