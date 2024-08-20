<template>
  <div class="wrapper">
  <NavComp/>
  <main>
    <router-view />
  </main>
</div>
  <Footer/>
</template>
<script>
import NavComp from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    NavComp,
    Footer
    
  }
}
</script>
<style src="./assets/CSS/style.css">
</style>
