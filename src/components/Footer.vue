<template>
      <footer class="bottom footer container-fluid fixed-bottom">
      <div class="row">
          <p class="lead">Nicki Abels & Mahmud Isaacs Copyright &copy;
              <span currentYear></span>
          </p>
      </div>
  </footer>

</template>

<script>
 export default {
        name: "FooterComp",
        data () {
            return{
                cYear: new Date ().
                getUTCFullYear()
            }
        },

    }
</script>

<style scoped>

</style>