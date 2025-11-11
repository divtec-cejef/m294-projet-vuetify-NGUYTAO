<template>
  <v-row align="center" class="mb-4" justify="space-between">
    <!-- Champ de recherche -->
    <v-col cols="12" md="4">
      <v-text-field
        :model-value="search"
        @update:model-value="$emit('update:search', $event)"
        clearable
        label="Rechercher un personnage"
        prepend-inner-icon="mdi-magnify"
      />
    </v-col>

    <!-- Menu déroulant pour le tri -->
    <v-col cols="12" md="4">
      <v-select
        :model-value="sortOption"
        @update:model-value="$emit('update:sortOption', $event)"
        clearable
        :items="sortOptions"
        label="Trier par"
      />
    </v-col>

    <!-- Case à cocher pour filtrer uniquement les favoris -->
    <v-col cols="12" md="4">
      <v-checkbox
        :model-value="showFavoritesOnly"
        @update:model-value="$emit('update:showFavoritesOnly', $event)"
        label="Afficher uniquement les favoris"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  search: String,
  sortOption: String,
  showFavoritesOnly: Boolean,
  sortOptions: Array
})
</script>
