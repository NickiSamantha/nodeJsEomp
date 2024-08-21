<template>
<div class="container vh-100 ">
  <p>
          Join us in the journey of self-expression and creativity. Together,
          let's make every piece of clothing a canvas for your imagination.</p>
          <h5 class="text-tertiary"><i>Welcome to Pretty Simple Printz, where 
            style meets simplicity, and
            every print tells a story.</i></h5>
        
        <div class="" 
        data-aos="fade-down"
    data-aos-anchor-placement="top-bottom"
    data-aos-delay="index * 1000">
          <h4 class="shadow" >OUR VISON</h4>
          <p>
              At Pretty Simple Printz, we believe in the power of self-expression
              through fashion. We're not just a custom print on apparel company;
              we're creators of wearable art that reflects your unique style and
              personality.
            </p>
            <p>
              At Pretty Simple Printz, creativity knows no bounds. Whether you're a
              small business looking to promote your brand, a group of friends
              celebrating a special occasion, or an individual looking to stand out
              from the crowd, we're here to make your vision a reality.
            </p>
            <h4 class="shadow "> OUR STORY</h4>
            <p>
              Our journey began with a simple idea: to make custom apparel
              accessible to everyone. We understand that each person has their own
              story to tell, and what better way to share it than through
              custom-designed clothing? Whether you're looking to make a bold
              statement, showcase your creativity, or simply add a personal touch to
              your wardrobe, Pretty Simple Printz is here to bring your vision to
              life.
            </p>
            <h4 class="shadow">OUR PRODUCTS AND SERVICES</h4>
            <p>
              We use only the finest materials and the latest printing techniques to
              ensure that every garment we produce is of the highest standard. From
              T-shirts and hoodies to hats and tote bags, our products are not only
              stylish but also durable and comfortable to wear.
              We pride ourselves on providing exceptional customer service every
              step of the way. Our team of passionate designers and customer care
              specialists are here to assist you in bringing your ideas to fruition,
              from concept to creation.
            </p>
            </div>

</div>
</template>

<script>
export default {
  name: "AboutComp",

  computed: {
    about() {
      return this.$store.state.about;
    },
  },
  created() {
    this.$store.dispatch("fetchAbout");
  },
  components: {
   
  },
  mounted() {
},
methods: {

}
};
</script>

<style scoped>

</style>
