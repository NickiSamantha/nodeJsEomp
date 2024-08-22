<template>
  <div class="container">
    <div class="row">
      <div class="hero"
      data-aos="fade-right"
        data-aos-duration="1500"
        data-aos-delay="300"
      >
      <div class="hero-content">
        <h1 class="display-2"
          data-aos="fade-right"
          data-aos-duration="1500"
          data-aos-delay="300"
        >Welcome to Pretty Simple Printz 
        </h1>
        <i>where style meets simplicity, and every print tells a story.</i>
        <router-link to="/products" class="btn btn-secondary shop-now">Shop Now</router-link>
    
      </div>
     </div>
   </div>

  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
   
  },
  computed: {
  
  },
  mounted() {
}
}
</script>
<style>
.hero {
  background: url('https://nickisamantha.github.io/allImages/images/pspplp.png') no-repeat center center;
  background-size: cover ;
  height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(9, 9, 9);
  text-align: center;
  transition : opacity 1s ease-in-out;
}
.hero-content{
  text-align: center;
}

.hero h1 , .hero i {
  background-color: rgba(209, 186, 186, 0.5);
  padding: 20px;
  transition : opacity 1s ease-in-out;
  display:block;
  margin: 0;
  padding: 0;
}
.shop-now {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hero {
    padding: 0;
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
  }

  .container {
    padding: 0;
    margin: 0;
  }

  .row {
    margin: 0;
  }
}
</style>
