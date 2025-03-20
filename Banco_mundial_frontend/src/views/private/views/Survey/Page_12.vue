<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">S.12. INFORMACIÓN DE LA CITA:</label>
            <label class="block text-gray-700 text-sm mb-2">Nos gustaría programar una cita para una entrevista. El
                propósito de esta encuesta es comprender <br>  mejor las condiciones de las empresas privadas y cómo
                afectan la productividad y el crecimiento. <br> Sus respuestas y las de otros líderes empresariales
                ayudarán a diseñar nuevas políticas y programas  <br> para mejorar el entorno empresarial. Toda la
                información que proporcione será anónima  y ni su nombre <br> ni el nombre de su establecimiento se
                utilizarán en ningún documento basado en esta encuesta. <br> Si lo desea, puede ver los resultados
                de encuestas anteriores y el tipo de indicadores generados a partir <br>  de estos datos visitando el
                sitio web del Banco Mundial:
                <a href="http://www.enterprisesurveys.org/"
                    target="_blank">http://www.enterprisesurveys.org/</a></label>

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="fechaC">FECHA DE LA CITA:</label>
                <input type="date" id="fechaC" v-model="survey.Q_S12_date"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="horaC">HORA:</label>
                <input type="time" id="horaC" v-model="survey.Q_S12_hour" :disabled="isS12_hourDisabled"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nombreE">NOMBRE DEL ENTREVISTADO:</label>
                <input type="text" id="nombreE" v-model="survey.Q_S12_inter_name"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :disabled="isS12_inter_nameDisabled" placeholder="Nombre">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="cargoE">CARGO DEL ENTREVISTADO:</label>
                <input type="text" id="cargoE" v-model="survey.Q_S12_inter_cargo"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :disabled="isS12_inter_cargoDisabled" placeholder="Cargo">
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        buttonNext: Boolean,
    },
    data() {
        return {
            localButtonNext: this.buttonNext, // Creamos una variable local basada en el prop
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
            }
        },
        isS12_hourDisabled() {
            return this.survey.Q_S12_date === ""; // Si S10 es "No" (2), deshabilita S8
        },
        isS12_inter_nameDisabled() {
            return this.survey.Q_S12_hour === ""; // Si S10 es "No" (2), deshabilita S8
        },
        isS12_inter_cargoDisabled() {
            return this.survey.Q_S12_inter_name === ""; // Si S10 es "No" (2), deshabilita S8
        },
    },
    watch: {
        "survey.Q_S12_inter_cargo"(newValue) {
            if (newValue != "") {
                this.$emit("update:buttonNext", false);
            }
        },
    },
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
}
</script>