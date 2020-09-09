import Vue from "vue";
import App from "./App.vue";
import store from "./store/index.js"
import '@/assets/css/tailwind.css'

const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $eventHub: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
