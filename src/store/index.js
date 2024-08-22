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
        const  result = await (await axios.get(`${apiURL}user/${id}`)).data
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
        const { msg, err, token } = await (await axios.post(`${apiURL}user/register`, payload)).data
        if (token) {
          context.dispatch('fetchUsers')
          toast.success(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          // router.push({ name: 'login' })
        } else {
          toast.error(`${err}`, {
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
        const { msg, err } = await (await axios.patch(`${apiURL}user/${payload.userID}`, payload)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${err}`, {
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
        const { msg, err } = await (await axios.delete(`${apiURL}user/${id}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${err}`, {
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
        //  else {
        //   toast.error(`${}`, {
        //   autoClose: 2000,
        //   position: toast.POSITION.BOTTOM_CENTER,
        // });
        //  }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async recentProducts(context) {
      try {
        const  results  = await (
          await axios.get(`${apiURL}product/recent`)
        ).data;
        if (results) {
          context.commit("setRecentProducts", results);
        }
        //  else {
        //   toast.error(`${msg}`, {
        //     autoClose: 2000,
        //     position: toast.POSITION.BOTTOM_CENTER,
        //   });
        // }
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
        // else {
        //   toast.error(`${msg}`, {
        //     autoClose: 2000,
        //     position: toast.POSITION.BOTTOM_CENTER,
        //   });
        // }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    },
    async addAProduct(context, payload) {
      try {
        const { msg } = await (
          await axios.post(`${apiURL}product/addProduct`, payload)
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
