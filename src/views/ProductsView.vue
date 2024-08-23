<template>
  <div class="container">
    <div class="row">
      <h2 class="display-2">Products</h2>
    </div>
    <div class="row gap-2 justify-content-center prod" v-if="products">
      <Card v-for="product  in products" :key="product.prodID">
        <template #cardHeader>
          <img
            :src="product.prodUrl"
            loading="lazy"
            class="img-fluid"
            :alt="product.prodName"
          />
        </template>
        <template #cardBody>
          <h5 class="card-title fw-bold">{{ product.prodName }}</h5>
          <p class="lead">
            <span class="text-tertiary fw-bold">Amount</span>: R{{
              product.amount
            }}
          </p>
          <div class="button-wrapper">
<router-link
              :to="{ name: 'product', params: { id: product.prodID } }"
              class="btn btn-dark"
              > 
              View Product
          </router-link>
          </div>
        </template>
      </Card>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import Spinner from "@/components/Spinner.vue";
import Card from "@/components/Card.vue";
const store = useStore();
const products = computed(() => store.state.products);
onMounted(() => {
  store.dispatch("fetchProducts")
  console.log("fetchProducts");
});
</script>

<style scoped>


.card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.button-wrapper button,
.card {
  transition: all 0.3s ease-in-out;
}


</style>
