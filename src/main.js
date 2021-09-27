// import Vue from 'vue'     ;
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { createApp  } from 'vue';
 
import App from './App.vue';
library.add(faPlus)
library.add(faEdit)
library.add(faTrash)
// Vue.component('font-awesome-icon', FontAwesomeIcon);
createApp(App).mount('#app');
 
