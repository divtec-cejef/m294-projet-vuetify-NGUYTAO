<template>
  <v-app-bar app color="deep-purple accent-4" dark>
    <!-- Logo Star Wars -->
    <v-img
      alt="Star Wars"
      class="me-4"
      contain
      max-height="40"
      src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
    />

    <!-- Spacer pour pousser le contenu restant à droite -->
    <v-spacer />

  </v-app-bar>
</template>

<script setup>
</script>

<style scoped>
/* Style pour le titre si nécessaire (police Star Wars) */
.v-toolbar-title {
  font-family: 'Star Jedi', sans-serif; /* Police thématique Star Wars */
  font-weight: bold; /* Texte en gras */
}
</style>
