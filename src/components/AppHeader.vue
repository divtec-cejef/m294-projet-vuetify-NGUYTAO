<template>
  <v-app-bar app color="deep-purple accent-4" dark>
    <!-- Logo Star Wars -->
    <v-img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
      alt="Star Wars"
      max-height="40"
      contain
      class="me-4"
    ></v-img>

    <v-spacer></v-spacer>

    <!-- Exemple: bouton de profil ou menu futur -->
    <!-- <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script setup>
// Aucun script nécessaire pour l'instant
</script>

<style scoped>
.v-toolbar-title {
  font-family: 'Star Jedi', sans-serif;
  font-weight: bold;
}
</style>
