<template>
  <!-- Carte représentant un personnage -->
  <v-card @click="handleClick" class="cursor-pointer">

    <!-- Titre de la carte avec le nom et le bouton favoris -->
    <v-card-title class="d-flex justify-space-between align-center">
      {{ personnage.name }} <!-- Affichage du nom du personnage -->

      <!-- Bouton pour ajouter/supprimer des favoris -->
      <v-btn
        :color="isFavorite(personnage) ? 'red' : 'grey'" <!-- Rouge si favori, gris sinon -->
      icon
      variant="text"
      @click.stop="toggleFavorite(personnage)" <!-- stop empêche la propagation du click au card -->
      >
      <v-icon>
        {{ isFavorite(personnage) ? 'mdi-heart' : 'mdi-heart-outline' }} <!-- Icône cœur rempli ou vide -->
      </v-icon>
      </v-btn>
    </v-card-title>

    <!-- Sous-titre affichant le genre -->
    <v-card-subtitle>
      Genre : {{ personnage.gender }}
    </v-card-subtitle>

    <!-- Texte affichant la taille du personnage -->
    <v-card-text>
      Taille : {{ personnage.height }} cm
    </v-card-text>

  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Définition des props reçues du parent
const props = defineProps({
  personnage: Object, // Données du personnage à afficher
  favorites: Array,   // Liste des personnages favoris
})

// Définition des événements émis vers le parent
const emits = defineEmits(['toggle-favorite', 'select-personnage'])

// Fonction pour vérifier si un personnage est dans la liste des favoris
function isFavorite(person) {
  return props.favorites.some(fav => fav.name === person.name)
}

// Fonction pour émettre l'événement de toggle favoris
function toggleFavorite(person) {
  emits('toggle-favorite', person)
}

// Fonction pour émettre l'événement de sélection du personnage (ouverture modal)
function handleClick() {
  emits('select-personnage', props.personnage)
}
</script>

<style scoped>
/* Curseur pointeur pour indiquer que la carte est cliquable */
.cursor-pointer {
  cursor: pointer;
}

/* Animation douce au survol des cartes */
.v-card {
  transition: transform 0.2s ease;
}
.v-card:hover {
  transform: scale(1.03); /* Agrandissement léger au survol */
}
</style>
