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
      id: 'GTM-58VTNG5',
    },
  })
  .mount('#app');
