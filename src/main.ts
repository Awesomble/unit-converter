import { createApp } from 'vue';
import VueGtag from 'vue-gtag';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import store from './store';

createApp(App)
  .use(store)
  .use(vuetify)
  .use(VueGtag, {
    property: {
      id: 'G-6VWR11TPSP',
    },
  })
  .mount('#app');
