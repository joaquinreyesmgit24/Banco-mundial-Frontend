<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7d <span class="text-blue-500">ENTREVISTE A LA UBICACIÓN QUE REPRESENTA LA MAYOR PROPORCIÓN DE LA PRODUCCIÓN O VENTAS</span></label>
            <div>
                <label for="direccion" class="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                <input id="direccion" type="text" v-model="survey.Q_A7D_address" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ingrese la dirección">
            </div>
            <div>
                <label for="nombreEstab" class="block text-gray-700 text-sm font-bold mb-2">Nombre del establecimiento:</label>
                <input id="nombreEstab" type="text" v-model="survey.Q_A7D_estab_name" :disabled="isA7D_estab_nameDisabled" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ingrese el nombre del establecimiento">
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
    props: {
        buttonNext: Boolean
    },
    data() {
        return {
            localButtonNext: this.buttonNext // Creamos una variable local basada en el prop
        };
    },
    mounted() {
        this.$emit('update:buttonNext', true);
    },
    computed: {
        ...mapGetters(["getSurvey"]),
        survey: {
            get() {
                return this.getSurvey; // Obtiene el estado desde Vuex
            },
            set(value) {
                this.updateStateSurvey(value); // Lo actualiza en Vuex
            },
        },
        isA7D_estab_nameDisabled() {
            return this.survey.Q_A7D_address === ""; // Si S10 es "No" (2), deshabilita S8
        },
    },
    watch: {
        // Escucha cambios en S9 y actualiza buttonNext
        "survey.Q_A7D_estab_name"(newValue) {
            if (newValue != "") {
                this.$emit("update:buttonNext", false);
            }
        }
    },
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
}
</script>