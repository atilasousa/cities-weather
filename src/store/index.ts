import Vue from "vue";
import Vuex from "vuex";
import { IWeatherInfo } from "@/interfaces/Weather";
import { baseApiService } from "@/services/BaseApiService";
import axios from "axios";
import { ICityPositionAndTime } from "@/interfaces/CityPosition";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: Array<IWeatherInfo>(),
  },
  getters: {
    getCities(state) {
      return state.cities;
    },
  },
  mutations: {
    setCities(state, Cities) {
      state.cities = Cities;
    },
    addCity(state, city) {
      state.cities.push(city);
    },
    deleteCity(state, city) {
      const copy = [...state.cities];
      const index = copy.indexOf(city);

      if (index !== -1) {
        copy.splice(index, 1);
      }
      state.cities = copy;
    },
  },
  actions: {
    async getInitialCities(context) {
      return await axios
        .get(
          `${baseApiService.getUrl()}/group?id=2240449,3448439,524901,703448,2643743&appid=${baseApiService.getApiKey()}&units=metric&lang=pt`
        )
        .then((res) => {
          context.commit("setCities", res.data.list);
          console.log(res.data.list);
        });
    },
    async getSpecificCity(context, city: string) {
      return await axios.get(
        `${baseApiService.getUrl()}/weather?q=${city}&appid=${baseApiService.getApiKey()}&units=metric`
      );
    },
    async getLastFiveDaysTemp(context, cityInfo: ICityPositionAndTime) {
      const dayInTimeStamp = 60 * 60 * 24;

      const data = await Promise.all(
        Array.from({ length: 5 }, (_, index) =>
          axios.get(
            `${baseApiService.getUrlV3()}/onecall/timemachine?lat=${
              cityInfo.lat
            }&lon=${cityInfo.lon}&dt=${
              cityInfo.time - dayInTimeStamp * index
            }&appid=${baseApiService.getApiKey()}&units=metric`
          )
        )
      );

      return data
        .map((el) => ({
          dt: el.data.data[0].dt,
          temp: el.data.data[0].temp,
        }))
        .reverse();
    },
    addCityToList(context, city) {
      context.commit("addCity", city);
    },
    deleteCity(context, city) {
      context.commit("deleteCity", city);
    },
  },
});
