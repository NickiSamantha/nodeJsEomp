<template>
  <div class="container vh-100">
    <div class="row">
      <h2 class="display-2">Products</h2>
    </div>
    <div class="row gap-2 justify-content-center my-2" v-if="products">
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
          <div class="button-wrapper d-md-flex d-block justify-content-between">
           <router-link
              :to="{ name: 'product', params: { id: product.prodID } }"
            > 
              <button class="btn btn-light">View</button>
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

</style>
