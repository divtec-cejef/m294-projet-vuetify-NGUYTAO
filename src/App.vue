<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useAppStore } from '@/stores/app.js'

  const store = useAppStore()

  onMounted (() => {
    store.init()
    console.log('App mounted, store initialized')
  })

</script>
