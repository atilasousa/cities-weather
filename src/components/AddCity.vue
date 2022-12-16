<template>
  <div :class="addCityClass()">
    <v-col md="6" sm="10" xs="10" class="row mb-5">
      <input
        v-model="city"
        :class="addCityClass('search-input')"
        placeholder="Digite aqui o nome da cidade"
        class="mr-3 mb-2 col-md-8 col-sm-6 col-xs-4"
      />
      <v-btn :class="addCityClass('button')" large @click="getCity"
        >Adicionar</v-btn
      >
    </v-col>
  </div>
</template>
<script lang="ts">
import bem from "bem-ts";
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default defineComponent({
  name: "AddCity",
  data() {
    return {
      addCityClass: bem("add-city", { strict: false }),
      city: "",
    };
  },
  methods: {
    ...mapActions({
      getSpecificCity: "getSpecificCity",
      addCityToList: "addCityToList",
    }),
    getCity():void {
      this.getSpecificCity(this.city).then((res) => {
        this.addCityToList(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cidade adicionada!",
          showConfirmButton: false,
          timer: 1500,
        });
        this.city = "";
      });
    },
  },
});
</script>
<style lang="scss">
.add-city {
  display: flex;

  &__search-input {
    height: 44px;
    outline: none;
    border-radius: 1.3rem;
    padding: 0 19.5555555556px;
    background-color: white !important;
  }

  &__button {
    border-radius: 1.2rem !important;
  }
}
</style>
