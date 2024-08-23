import { createStore } from "vuex";
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css" ;
// import router from "../router";

const apiURL = "https://nodejseomp-vow4.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    recentProducts: null,
    product: null
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setProducts(state, value) {
      state.products = value;
    },
    setRecentProducts(state, value) {
      state.recentProducts = value;
    },
    setProduct(state, value) {
      state.product = value;
    },
  },
  actions: {
    //search products
    async searchProductsByCategory(context, category) {
      try {
        const products = await axios.get(`${apiURL}products`);
        const filteredProducts = products.data.filter(products => products.category.includes(category));
        context.commit('setProducts', filteredProducts);
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    // sort by amount 
    async sortProductsByAmount(context) {
      try {
        const products = await axios.get(`${apiURL}products`);
        const sortedProducts = products.data.sort((a, b) => a.amount - b.amount);
        context.commit('setProducts', sortedProducts);
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    // ==== User ========
    async fetchUsers(context) {
      try {
        const  results = await (await axios.get(`${apiURL}users`)).data
        if (results) {
          context.commit('setUsers', results)
        } 
        // else {
        //   toast.error(`${msg}`, {
        //     autoClose: 2000,
        //     position: toast.POSITION.BOTTOM_CENTER
        //   })
        // }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async fetchUser(context, id) {
      try {
        const  result = await (await axios.get(`${apiURL}users/${id}`)).data
        if (result) {
          context.commit('setUser', result)
        } 
        // else {
        //   toast.error(`${msg}`, {
        //     autoClose: 2000,
        //     position: toast.POSITION.BOTTOM_CENTER
        //   })
        // }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async register(context, payload) {
      try {
        const msg = await (await axios.post(`${apiURL}users/register`, payload)).data
        if (msg) {
          context.dispatch('fetchUsers')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
         
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async updateUser(context, payload) {
      try {
        const msg = await (await axios.patch(`${apiURL}users/update/${payload.userID}`, payload)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async deleteUser(context, id) {
      try {
        const msg = await (await axios.delete(`${apiURL}users/delete/${id}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },

// ==========PRODUCTS =============
    async fetchProducts(context) {
      try {
        const  results   = await (await axios.get(`${apiURL}products`)).data;
        if (results) {
          console.log(results)
          context.commit("setProducts", results);
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async fetchProduct(context, id) {
      try {
        const result  = await (
          await axios.get(`${apiURL}products/${id}`)
        ).data;
        if (result) {
          context.commit("setProduct", result);
        } 
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addAProduct(context, payload) {
      try {
        const msg  = await (
          await axios.post(`${apiURL}products/addProduct`, payload)
        ).data;
        if (msg) {
          context.dispatch("fetchProducts");
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async updateProduct(context, payload) {
      try {
        const { msg } = await (
          await axios.patch(`${apiURL}products/update/${payload.productID}`, payload)
        ).data;
        if (msg) {
          context.dispatch("fetchProducts");
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async deleteProduct(context, id) {
      try {
        const { msg } = await (
          await axios.delete(`${apiURL}products/delete/${id}`)
        ).data;
        if (msg) {
          context.dispatch("fetchProducts");
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
  },
  modules: {},
});
