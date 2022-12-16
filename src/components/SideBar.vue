<template>
  <div :class="sideBarClass()">
    <v-container class="content py-10 px-8">
      <div :class="sideBarClass('close-button-holder')">
        <v-btn
          @click="$emit('closeSideBar')"
          :class="sideBarClass('close-button')"
          small
          icon
        >
          <font-awesome-icon icon="fa-solid fa-times" />
        </v-btn>
      </div>
      <h1 class="mb-3">{{ cityMetaInfo.name }}, {{ cityMetaInfo.country }}</h1>
      <div class="graphic">
        <apex-charts
          type="line"
          height="350"
          :options="chartOptions"
          :series="[{ name: 'Temperatura', data: temps }]"
        />
      </div>
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import bem from "bem-ts";
import VueApexCharts from "vue-apexcharts";
import { ICityDayTemp } from "@/interfaces/cityDayTemp";
import { ICityMetaInfo } from "@/interfaces/cityMetaInfo";
import { PropType } from "vue";

export default defineComponent({
  name: "SideBar",
  components: {
    ApexCharts: VueApexCharts,
  },
  props: {
    cityLastFiveDaysTemp: {
      type: Array as PropType<Array<ICityDayTemp>>,
      required: true,
    },
    cityMetaInfo: {
      type: Object as PropType<ICityMetaInfo>,
      required: true,
    },
  },
  computed: {
    temps() {
      return this.cityLastFiveDaysTemp.map((el) => el.temp);
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },

        stroke: {
          curve: "straight",
        },
        title: {
          text: "Temperatura nos últimos 5 dias",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.cityLastFiveDaysTemp.map((el) =>
            new Date(el.dt * 1000).toLocaleDateString()
          ),
        },
      };
    },
  },

  data() {
    return {
      sideBarClass: bem("side-bar", { strict: false }),
    };
  },
});
</script>
<style lang="scss">
.side-bar {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 31.25rem;
  max-width: 86%;
  background-color: white;
  box-shadow: 0 0 10px black;

  &__close-button-holder {
    text-align: right;
  }

  &__close-button {
    color: white;
    svg {
      color: #d62828;
      font-size: 2rem;
    }
    width: 100%;
  }
}
</style>
