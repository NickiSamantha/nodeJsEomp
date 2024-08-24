<template>
      <footer class="bottom footer container-fluid sticky-bottom ">
      <div class="row">
          <p class="lead">Nicki Abels & Mahmud Isaacs Copyright &copy;
              <span>{{cYear}}</span>
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