<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from "../components/Header.vue"
import ScrollTopComp from "../components/ScrollTop.vue"

</script>

<template>
  <HeaderComp />
  <div class="top ">
    <RouterView />
    <ScrollTopComp />
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap/dist/js/bootstrap.js"

</script>

<style>
@import '@/assets/css/base.css';
</style>
