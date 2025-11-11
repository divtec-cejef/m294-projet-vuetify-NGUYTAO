<template>
  <v-card @click="handleClick" class="cursor-pointer">
    <v-card-title class="d-flex justify-space-between align-center">
      {{ personnage.name }}
      <v-btn
        :color="isFavorite(personnage) ? 'red' : 'grey'"
        icon
        variant="text"
        @click.stop="toggleFavorite(personnage)"
      >
        <v-icon>{{ isFavorite(personnage) ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle>Genre : {{ personnage.gender }}</v-card-subtitle>
    <v-card-text>Taille : {{ personnage.height }} cm</v-card-text>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  personnage: Object,
  favorites: Array,
})

const emits = defineEmits(['toggle-favorite', 'select-personnage'])

function isFavorite(person) {
  return props.favorites.some(fav => fav.name === person.name)
}

function toggleFavorite(person) {
  emits('toggle-favorite', person)
}

function handleClick() {
  emits('select-personnage', props.personnage)
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.v-card {
  transition: transform 0.2s ease;
}
.v-card:hover {
  transform: scale(1.03);
}
</style>
