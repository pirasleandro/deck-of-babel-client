<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Deck of Babel </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/" label="Home" />
          <q-route-tab to="/game" label="Game" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
</script>
