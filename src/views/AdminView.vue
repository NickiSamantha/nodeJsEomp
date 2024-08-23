<template>
  <div class="container-fluid">
    <div class="row">
      <h2 class="display-2 mt-3">ADMIN DASHBOARD</h2>
    </div>

    <div class="container mt-3">
      <!-- Manage Users Section -->
      <h1>Manage Users</h1>

      <!-- add user -->
      <div class="row mb-3">
        <div class="col-sm-4">
          <button
            type="button"
            class="btn btn-light mt-3 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#addModal"
          >
            Add New User
          </button>
          <!-- Add user modal -->
          <div
            class="modal fade"
            id="addModal"
            tabindex="-1"
            aria-labelledby="addModallLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="addModalLabel">Add user</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form @submit.prevent="addUser">
                  <div class="form-group">
                    <label for="firstName">First Name:</label>
                    <input
                      v-model="userPayload.firstName"
                      type="text"
                      id="firstName"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="lastName">Last Name:</label>
                    <input
                      v-model="userPayload.lastName"
                      type="text"
                      id="lastName"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="age">Age:</label>
                    <input
                      v-model="userPayload.userAge"
                      type="number"
                      id="age"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="gender">Gender:</label>
                    <input
                      v-model="userPayload.Gender"
                      type="text"
                      id="gender"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="role">User role:</label>
                    <input
                      v-model="userPayload.userRole"
                      type="text"
                      id="role"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                      v-model="userPayload.userAdd"
                      type="email"
                      id="email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                      v-model="userPayload.userPass"
                      type="password"
                      id="password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="profile">Profile:</label>
                    <input
                      v-model="userPayload.userProfile"
                      type="url"
                      id="profile"
                      required
                    />
                  </div>
                  <button class="m-2" type="submit">Save User</button>
                  <button class="m-2" type="reset">Clear</button>
                </form>
                <div class="modal-footer">
                  <button
                    type="reset"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Edit User Modal -->

      <div class="table-responsive" v-if="users && users.length">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
              <th>User Profile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.userID">
              <td>{{ user.userID }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.userAge }}</td>
              <td>{{ user.Gender }}</td>
              <td>{{ user.userAdd }}</td>
              <td>
                <img
                  :src="user.userProfile"
                  loading="lazy"
                  class="img-fluid user"
                  :alt="user.userProfile"
                />
              </td>
              <td>{{ user.userRole }}</td>
              <td>
                <button
                  class="btn btn-secondary btn-sm m-2 mt-2"
                  data-bs-toggle="modal"
                  :data-bs-target="`#editUserModal${user.userID}`"
                >
                  Edit
                </button>
                <div
                  class="modal fade"
                  :id="`editUserModal${user.userID}`"
                  tabindex="-1"
                  aria-labelledby="editUserModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editUserModalLabel">
                          Update user
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="updateUser(user)">
                          <div class="form-group">
                            <label for="firstName">First Name:</label>
                            <input
                              v-model="userPayload.firstName"
                              :placeholder="user.firstName"
                              type="text"
                              id="firstName"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="lastName">Last Name:</label>
                            <input
                              v-model="userPayload.lastName"
                              type="text"
                              id="lastName"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="age">Age:</label>
                            <input
                              v-model="userPayload.userAge"
                              type="number"
                              id="age"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="gender">Gender:</label>
                            <input
                              v-model="userPayload.Gender"
                              type="text"
                              id="gender"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="role">User role:</label>
                            <input
                              v-model="userPayload.userRole"
                              type="text"
                              id="role"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="email">Email:</label>
                            <input
                              v-model="userPayload.userAdd"
                              type="email"
                              id="email"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="password">Password:</label>
                            <input
                              v-model="userPayload.userPass"
                              type="password"
                              id="password"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="profile">Profile:</label>
                            <input
                              v-model="userPayload.userProfile"
                              type="url"
                              id="profile"
                              required
                            />
                          </div>
                          <button class="m-2" type="submit">Save User</button>
                          <button class="m-2" type="reset">Cancel</button>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                       
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-danger btn-sm mt-2 m-2"
                  @click="deleteUser(user.userID)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
      <Spinner />
    </div>

      <!-- Manage Products Section -->
      <h1>Manage Products</h1>
      <!-- sort -->
      <div class="row mb-3">
        <div class="col-sm-4">
          <button class="btn btn-secondary mb-2" @click="sortProductsByAmount">
            Sort by amount
          </button>
        </div>
        <div class="col-sm-4">
          <button
            class="btn btn-secondary mb-2"
            @click="searchProductsByCategory(searchCategory)"
          >
            Search
          </button>

          <input
            type="text"
            v-model="searchCategory"
            placeholder="Search by category"
            class="form-control"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-sm-4">
          <button
            type="button"
            class="btn btn-light mt-3 mb-3"
             data-bs-toggle="modal"
            data-bs-target="#addProdModal"
          >
            Add New Product
          </button>
          <!-- Add User Modal  -->
          <div
            class="modal fade"
            id="addProdModal"
            tabindex="-1"
            aria-labelledby="addProdModallLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="addProdModalLabel">Add Product</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <form @submit.prevent="addProduct">
                  <div class="form-group">
                    <label for="prodName">Product Name:</label>
                    <input
                      v-model="productPayload.prodName"
                      type="text"
                      id="prodName"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="category">Category:</label>
                    <input
                      v-model="productPayload.category"
                      type="text"
                      id="category"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input
                      v-model="productPayload.quantity"
                      type="number"
                      id="quantity"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="amount">Amount:</label>
                    <input
                      v-model="productPayload.amount"
                      type="number"
                      id="amount"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="prodDescription">Product Description:</label>
                    <input
                      v-model="productPayload.prodDescription"
                      type="text"
                      id="prodDescription"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="prodUrl">Image:</label>
                    <input
                      v-model="productPayload.prodUrl"
                      type="url"
                      id="prodUrl"
                      required
                    />
                  </div>
                  <button class=" m-2" type="submit">Save Product</button>
                  <button class="m-2" type="reset">Clear</button>
                </form>
                <div class="modal-footer">
                  <button
                    type="reset"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


        </div>
      </div>
      <div class="table-responsive pb-5 m-4" v-if="products && products.length">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Product Image</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.prodID">
              <td>{{ product.prodID }}</td>
              <td>{{ product.prodName }}</td>
              <td>{{ product.prodDescription }}</td>
              <td>
                <img
                  :src="product.prodUrl"
                  loading="lazy"
                  class="img-fluid user"
                  :alt="product.prodUrl"
                />
              </td>
              <td>{{ product.category }}</td>
              <td>{{ product.quantity }}</td>
              <td>{{ product.amount }}</td>

              <td>
                <button
                  class="btn btn-secondary btn-sm mt-2 m-2"
                  data-bs-toggle="modal"
                  :data-bs-target="`#editProdModal${product.prodID}`"
                >
                  Edit
                </button>
<!-- Edit Prod Modal -->
                  <div
                  class="modal fade"
                  :id="`editProdModal${product.prodID}`"
                  tabindex="-1"
                  aria-labelledby="editProdModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editProdModalLabel">
                          Update Product
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form @submit.prevent="updateProduct(product)">
                          <div class="form-group">
                            <label for="productName">Product Name:</label>
                            <input
                              v-model="productPayload.prodName"
                              :placeholder="product.prodName"
                              type="text"
                              id="prodName"
                              required
                            />
                          </div>
                          <div class="form-group">
                            <label for="category">Category:</label>
                            <input
                              v-model="productPayload.category"
                              type="text"
                              id="category"
                              required
                            />
                          </div>
                          <div class="form-group">
                    <label for="quantity">Quantity</label>
                    <input
                      v-model="productPayload.quantity"
                      type="number"
                      id="quantity"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="amount">Amount:</label>
                    <input
                      v-model="productPayload.amount"
                      type="number"
                      id="amount"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="prodDescription">Product Description:</label>
                    <input
                      v-model="productPayload.prodDescription"
                      type="text"
                      id="prodDescription"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="prodUrl">Image:</label>
                    <input
                      v-model="productPayload.prodUrl"
                      type="url"
                      id="prodUrl"
                      required
                    />
                  </div>
                          <button class="m-2" type="submit">Save Product</button>
                          <button class="m-2" type="reset">Clear</button>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
              
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  class="btn btn-danger btn-sm mt-2 m-2"
                  @click="deleteProduct(product.prodID)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
      <Spinner />
    </div>

    <!-- Add/Edit Product Modal -->
    <div v-if="showAddProductModal" class="custom-modal">
      <div class="modal-overlay" @click="showAddProductModal = false"></div>
      <div class="modal-content">
        <h3>{{ isEditingProduct ? "Edit Product" : "Add New Product" }}</h3>
        <form @submit.prevent="addOrUpdateProduct">
          <div class="form-group">
            <label for="productName">Product Name:</label>
            <input
              v-model="productPayload.prodName"
              type="text"
              id="productName"
              required
            />
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <input
              v-model="productPayload.category"
              type="text"
              id="category"
              required
            />
          </div>
          <div class="form-group">
            <label for="amount">Price:</label>
            <input
              v-model="productPayload.amount"
              type="number"
              id="amount"
              required
            />
          </div>
          <button class=" m-2" type="submit">Save Product</button>
          <button type="reset" >
            Clear
          </button>
        </form>
      </div>
    </div>
    
  <!-- </div> -->
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { Spinner } from "@/components/Spinner.vue";

export default {
  name: "AdminDashboard",
  components: {
    Spinner,
  },
  setup() {
    const store = useStore();

    // Local state
    const showAddUserModal = ref(false);
    const showAddProductModal = ref(false);
    const isEditingUser = ref(false);
    const isEditingProduct = ref(false);
    const userForm = ref({
      firstName: "",
      lastName: "",
      userAge: null,
      Gender: "",
      userRole: "",
      userAdd: "",
      userPass: "",
      userProfile:
        "https://codjoelmayer.github.io/projectImages/images/profile-Image.png",
    });
    const productForm = ref({
      // prodID: null,
      prodName: "",
      category: "",
      amount: null,
      quantity: "",
      prodDescription:"",
      prodUrl:"",
    
    });

    // Vuex state
    const users = computed(() => store.state.users);
    const products = computed(() => store.state.products);

    // Fetch users and products on mount
    onMounted(() => {
      store.dispatch("fetchUsers");
      store.dispatch("fetchProducts");
    });

    // Methods for handling users
    const addOrUpdateUser = () => {
      if (isEditingUser.value) {
        store.dispatch("updateUser", userForm.value);
      } else {
        alert(userForm.value);
        store.dispatch("register", userForm.value);
        // .then((newUser) => {
        //   store.commit("setUsers", [...store.state.users, newUser]);
        // });
      }
      showAddUserModal.value = false;
      resetUserForm();
    };

    const editUser = (user) => {
      userForm.value = {
        userID: user.userID,
        firstName: "",
        lastName: "",
        userAge: 0,
        Gender: "",
        userRole: "",
        userAdd: "",
        userPass: "",
        userProfile:
          "https://codjoelmayer.github.io/projectImages/images/profile-Image.png",
      };
      isEditingUser.value = true;
      showAddUserModal.value = true;
    };

    const deleteUser = (id) => {
      store.dispatch("deleteUser", id);
    };

    const resetUserForm = () => {
      userForm.value = {
        userID: null,
        userName: "",
        email: "",
        role: "",
      };
      isEditingUser.value = false;
    };

    // Methods for handling products

    const addOrUpdateProduct = () => {
      if (isEditingProduct.value) {
        store.dispatch("updateProduct", productForm.value);
      // } else {
      //   store.dispatch("addAProduct", productForm.value).then((newProduct) => {
      //     store.commit("setProducts", [...store.state.products, newProduct]);
      //   });
      }  else {
        alert(productForm.value);
        store.dispatch("addProduct", productForm.value); 
      }
      showAddProductModal.value = false;
      resetProductForm();
    };

    const editProduct = (product) => {
      productForm.value = {
        prodID: product.prodID,
        prodName: "",
        category: "",
        amount: 0,
        quantity: 0,
        prodDescription:"",
        prodUrl:"",
      };
      isEditingProduct.value = true;
      showAddProductModal.value = true;
    };

    const deleteProduct = (id) => {
      store.dispatch("deleteProduct", id);
    };

    const resetProductForm = () => {
      productForm.value = {
        prodID: null,
        productName: "",
        category: "",
        amount: null,
        quantity: null,
      };
      isEditingProduct.value = false;
    };

    return {
      users,
      products,
      showAddUserModal,
      showAddProductModal,
      addOrUpdateUser,
      userForm,
      productForm,
      isEditingUser,
      isEditingProduct,
      addOrUpdateProduct,
      editUser,
      editProduct,
      deleteUser,
      deleteProduct,
      resetUserForm,
      resetProductForm,
    };
  },
  data() {
    return {
      searchCategory: "",
      userPayload: {
        firstName: "",
        lastName: "",
        userAge: null,
        Gender: "",
        userRole: "",
        userAdd: "",
        userPass: "",
        userProfile:
          "https://codjoelmayer.github.io/projectImages/images/profile-Image.png",
      },
      productPayload: {
        prodName: "",
        quantity: null,
        categoty: "",
        amount: null,
        
      },
    };
  },

  methods: {
    searchProductsByCategory(category) {
      this.$store.dispatch("searchProductsByCategory", category);
    },

    sortProductsByAmount() {
      this.$store.dispatch("sortProductsByAmount");
    },
    addUser() {
      this.$store.dispatch("register", this.userPayload);

      //
    },
    updateUser(user) {
      Object.defineProperty(this.userPayload, "userID", { value: user.userID });
      console.log(this.userPayload);

      this.$store.dispatch("updateUser", this.userPayload);
    },
    addProduct() {
      this.$store.dispatch("addAProduct", this.productPayload);

      //
    },
    updateProduct(product) {
      Object.defineProperty(this.productPayload, "prodID", {
        value: product.ID,
      });
      console.log(this.productPayload);

      this.$store.dispatch("updateProduct", this.productPayload);
    },
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 20px;
}

.table-responsive {
  margin-top: 20px;
  border-radius: 5px;
}

.text-center {
  margin-top: 20px;
}

/* Modal overlay */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  z-index: 1050;
}

/* Modal content */
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

.user {
  width: 5rem;
}
.prod{
  width: 5rem;
}
.form-group{
  display:grid;
}
</style>
