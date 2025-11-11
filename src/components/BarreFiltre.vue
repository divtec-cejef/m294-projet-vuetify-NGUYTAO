<template>
  <!-- Ligne contenant les filtres et le tri -->
  <v-row align="center" class="mb-4" justify="space-between">

    <!-- Champ de recherche pour filtrer les personnages par nom -->
    <v-col cols="12" md="4">
      <v-text-field
        :model-value="search"  <!-- Liaison avec la valeur de recherche -->
      @update:model-value="$emit('update:search', $event)" <!-- Émet l'événement vers le parent -->
      clearable               <!-- Permet de vider le champ facilement -->
      label="Rechercher un personnage" <!-- Label du champ -->
      prepend-inner-icon="mdi-magnify" <!-- Icône de loupe à l'intérieur du champ -->
      />
    </v-col>

    <!-- Menu déroulant pour trier la liste des personnages -->
    <v-col cols="12" md="4">
      <v-select
        :model-value="sortOption" <!-- Valeur actuelle du tri -->
      @update:model-value="$emit('update:sortOption', $event)" <!-- Émet l'événement vers le parent -->
      clearable                  <!-- Permet de réinitialiser le tri -->
      :items="sortOptions"       <!-- Options de tri disponibles -->
      label="Trier par"          <!-- Label du menu -->
      />
    </v-col>

    <!-- Case à cocher pour afficher uniquement les favoris -->
    <v-col cols="12" md="4">
      <v-checkbox
        :model-value="showFavoritesOnly" <!-- Valeur actuelle de la case à cocher -->
      @update:model-value="$emit('update:showFavoritesOnly', $event)" <!-- Émet l'événement vers le parent -->
      label="Afficher uniquement les favoris" <!-- Label de la case -->
      />
    </v-col>

  </v-row>
</template>

<script setup>
import { defineProps } from 'vue'

// Définition des props reçues du parent
const props = defineProps({
  search: String,            // Texte de recherche
  sortOption: String,        // Option de tri sélectionnée
  showFavoritesOnly: Boolean,// Filtre pour ne montrer que les favoris
  sortOptions: Array         // Liste des options de tri disponibles
})
</script>
