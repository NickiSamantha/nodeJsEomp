<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <h2 class="display-2 mt-3">ADMIN DASHBOARD</h2>
      </div>
  
      <div class="container mt-3">
        <h1>Manage Products</h1>
  
        <div class="row mb-3">
          <div class="col-sm-4">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control mt-3 mb-3"
              placeholder="Search Products"
            />
            <div v-if="searchError" class="invalid-feedback">
              {{ searchError }}
            </div>
          </div>
  
          <div class="col-sm-4">
            <button class="btn btn-light mt-3 mb-3" @click="sortProducts">
              Sort by Amount
            </button>
          </div>
  
          <div class="col-sm-4 text-right">
            <button
              type="button"
              class="btn btn-light mt-3 mb-3"
              @click="showAddProductModal = true"
            >
              Add New Product
            </button>
          </div>
        </div>
  
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in filteredProducts" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.productName }}</td>
                <td>
                  <img
                    :src="product.img_url"
                    :alt="product.productName"
                    class="img-fluid"
                    style="max-width: 100px;"
                  />
                </td>
                <td>{{ product.category }}</td>
                <td>R{{ product.amount.toFixed(2) }}</td>
                <td>
                  <button
                    class="btn btn-dark btn-sm mb-2 mt-2"
                    @click="editProduct(index)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm mb-2 mt-2"
                    @click="deleteProduct(index)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="filteredProducts.length === 0">
                <td colspan="6">No products found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
   <!-- User Management -->
   <div class="container mt-5">
      <h1>Manage Users</h1>
      <div class="row mb-3">
        <div class="col-sm-4 text-right">
          <button
            type="button"
            class="btn btn-light mt-3 mb-3"
            @click="showAddUserModal = true"
          >
            Add New User
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button
                  class="btn btn-dark btn-sm mb-2 mt-2"
                  @click="editUser(index)"
                >
                  Edit
                </button>
                <button
                  class="btn btn-danger btn-sm mb-2 mt-2"
                  @click="deleteUser(index)"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td colspan="4">No users found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
      <!-- Add/Edit Product Modal -->
      <b-modal
        v-model="showAddProductModal"
        title="Add New Product"
        @hide="resetForm"
      >
        <form @submit.prevent="addProduct">
          <b-form-group label="Product Name" label-for="productName">
            <b-form-input
              id="productName"
              v-model="productForm.productName"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="Category" label-for="productCategory">
            <b-form-input
              id="productCategory"
              v-model="productForm.category"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="Description" label-for="productDescription">
            <b-form-textarea
              id="productDescription"
              v-model="productForm.description"
              required
            ></b-form-textarea>
          </b-form-group>
  
          <b-form-group label="Price" label-for="productAmount">
            <b-form-input
              id="productAmount"
              v-model="productForm.amount"
              type="number"
              step="0.01"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-form-group label="Image URL" label-for="productImage">
            <b-form-input
              id="productImage"
              v-model="productForm.img_url"
              required
            ></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="dark">Save Product</b-button>
        </form>
      </b-modal>
    </div>

    <!-- Add/Edit User Modal -->
    <b-modal
      v-model="showAddUserModal"
      title="Add New User"
      @hide="resetUserForm"
    >
      <form @submit.prevent="addUser">
        <b-form-group label="Username" label-for="username">
          <b-form-input
            id="username"
            v-model="userForm.username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Email" label-for="email">
          <b-form-input
            id="email"
            v-model="userForm.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="dark">Save User</b-button>
      </form>
    </b-modal>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: JSON.parse(localStorage.getItem("products")) || [],
        searchQuery: "",
        sortAscending: true,
        showAddProductModal: false,
        productForm: {
          id: null,
          productName: "",
          category: "",
          description: "",
          amount: null,
          img_url: "",
        },
        searchError: "",

         // User management data
      users: JSON.parse(localStorage.getItem("users")) || [],
      showAddUserModal: false,
      userForm: {
        id: null,
        username: "",
        email: "",
      },
      };
    },
    computed: {
      filteredProducts() {
        if (!this.searchQuery) return this.products;
  
        return this.products.filter((product) =>
          product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      addProduct() {
        const newProduct = {
          ...this.productForm,
          id: this.products.length + 1,
        };
  
        this.products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(this.products));
        this.showAddProductModal = false;
        this.resetForm();
      },
      editProduct(index) {
        this.productForm = { ...this.products[index] };
        this.showAddProductModal = true;
      },
      deleteProduct(index) {
        this.products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(this.products));
      },
      sortProducts() {
        this.products.sort((a, b) =>
          this.sortAscending ? a.amount - b.amount : b.amount - a.amount
        );
        this.sortAscending = !this.sortAscending;
      },
      resetProductForm() {
        this.productForm = {
          id: null,
          productName: "",
          category: "",
          description: "",
          amount: null,
          img_url: "",
        };
      },


    },
    mounted() {
      this.displayProducts();
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  