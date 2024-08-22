import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);
AOS.init();
app.use(router);
app.use(store);
app.mount('#app');

// createApp(App).use(store).use(router).mount('#app')
