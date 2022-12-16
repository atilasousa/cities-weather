import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faTimes,
  faTemperatureHalf,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faTemperatureHalf, faTrash);

Vue.component("font-awesome-icon", FontAwesomeIcon);
