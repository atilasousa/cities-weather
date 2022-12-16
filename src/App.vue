<template>
  <v-app>
    <v-container class="py-9">
      <AddCity />
      <v-main>
        <div class="row">
          <CityItem
            v-for="(city, index) in getCities"
            :weatherInfo="city"
            @removeCity="removeCity(city)"
            @cityClicked="cityClicked(city)"
            :key="index"
          />
        </div>
      </v-main>
      <SideBar
        v-if="showSideBar"
        :cityLastFiveDaysTemp="cityLastFiveDaysTemp"
        :cityMetaInfo="cityMetaInfo"
        @closeSideBar="showSideBar = false"
      />
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddCity from "./components/AddCity.vue";
import SideBar from "./components/SideBar.vue";
import CityItem from "./components/CityItem.vue";
import { mapActions, mapGetters } from "vuex";
import { IWeatherInfo } from "./interfaces/Weather";
import { ICityDayTemp } from "./interfaces/cityDayTemp";
import { ICityMetaInfo } from "./interfaces/cityMetaInfo";
import Swal from "sweetalert2";

export default defineComponent({
  name: "App",
  components: {
    AddCity,
    SideBar,
    CityItem,
  },
  data() {
    return {
      showSideBar: false,
      cityLastFiveDaysTemp: Array<ICityDayTemp>(),
      cityMetaInfo: Object() as ICityMetaInfo,
    };
  },
  created() {
    this.getInitialCities();
  },
  computed: {
    ...mapGetters({
      getCities: "getCities",
    }),
  },
  methods: {
    ...mapActions({
      getInitialCities: "getInitialCities",
      getLastFiveDaysTemp: "getLastFiveDaysTemp",
      deleteCity: "deleteCity",
    }),
    async cityClicked(city: IWeatherInfo): Promise<void> {
      this.showSideBar = !this.showSideBar;

      this.cityMetaInfo = { name: city.name, country: city.sys.country };

      this.cityLastFiveDaysTemp = await this.getLastFiveDaysTemp({
        lat: city.coord.lat,
        lon: city.coord.lon,
        time: city.dt,
      });
    },
    removeCity(city: IWeatherInfo) {
      Swal.fire({
        title: "Tem a certeza que deseja apagar esta cidade?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Não",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteCity(city);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Cidade Apagada!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
  },
});
</script>

<style lang="scss">
@import "@/assets/styles/style.scss";
</style>
