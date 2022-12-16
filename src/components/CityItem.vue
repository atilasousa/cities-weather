<template>
  <v-col md="4" sm="6" xs="12" :class="cityItemClass()">
    <v-card class="px-4 pt-4 pb-6 text-center">
      <header :class="cityItemClass('header')" class="mb-3">
        <div :class="cityItemClass('deleteButton')">
          <v-btn @click="$emit('removeCity')" icon>
            <font-awesome-icon icon="fa-solid fa-trash" class="text-left" />
          </v-btn>
        </div>
        <h2 :class="cityItemClass('city-name')">
          {{ weatherInfo?.name }}, {{ weatherInfo?.sys.country }}
        </h2>
      </header>
      <div :class="cityItemClass('content')" class="mb-8">
        <span :class="cityItemClass('temperature')">
          {{ weatherInfo?.main.temp }}°C
        </span>
        <div :class="cityItemClass('clime')">
          <img :src="`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`">
          <span>
            {{weatherInfo.weather[0].description}}
          </span>
        </div>
        <small>
          Max: {{ weatherInfo?.main.temp_max }}°C / Min:
          {{ weatherInfo?.main.temp_min }}°C
        </small>
      </div>
      <div :class="cityItemClass('details')" class="row px-4 mb-4">
        <div :class="cityItemClass('detail')">
          <small>Vento</small>
          <span>{{ weatherInfo?.wind.speed }}Km</span>
        </div>
        <div :class="cityItemClass('detail')">
          <small>Humidade</small>
          <span>{{ weatherInfo?.main.humidity }}%</span>
        </div>
        <div :class="cityItemClass('detail')">
          <small>Visibilidade</small>
          <span>{{ visibility }}Km</span>
        </div>
      </div>
      <div class="w-100 text-left">
        <v-btn :class="cityItemClass('button-details')" color="indigo" @click="$emit('cityClicked')">Detalhes</v-btn>
      </div>
    </v-card>
  </v-col>
</template>
<script lang="ts">
import bem from "bem-ts";
import { defineComponent } from "vue";
import { IWeatherInfo } from "@/interfaces/Weather";
import { PropType } from "vue";

export default defineComponent({
  props: {
    weatherInfo: {
      type: Object as PropType<IWeatherInfo>,
      required: true,
    },
  },
  data() {
    return {
      cityItemClass: bem("city-item", { strict: false }),
    };
  },
  computed: {
    speed():number {
      return this.weatherInfo.wind.speed * 3.6;
    },
    visibility():number {
      return this.weatherInfo.visibility / 1000;
    },
  },
});
</script>
<style lang="scss">
.city-item {
  .v-card{
    color: white;
    background-color: #7e7e7e !important;
  }

  &__header {
    display: flex;
    flex-direction: column;
  }

  &__deleteButton {
    width: 100%;
    display: flex;
    justify-content: right;

    .fa-trash {
      cursor: pointer;
      color: #ee2c2c;
      font-size: 1.2rem;
    }
  }

  &__city-name {
    font-weight: 500;
  }

  &__clime{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__temperature {
    font-size: 2rem;
  }

  &__content {
    display: flex;
    flex-direction: column !important;
  }

  &__details {
    justify-content: space-between;
  }

  &__button-details{
    color: white !important;
  }

  &__detail {
    display: flex;
    flex-direction: column;
  }
}
</style>
