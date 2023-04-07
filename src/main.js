import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import VueSmoothScroll from "vue3-smooth-scroll";

createApp(App).use(createPinia(), VueSmoothScroll).mount("#app");
