import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import VueSmoothScroll from "vue3-smooth-scroll";
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(VueSmoothScroll);
app.mount("#app");

// createApp(App).use(createPinia()).mount("#app");
