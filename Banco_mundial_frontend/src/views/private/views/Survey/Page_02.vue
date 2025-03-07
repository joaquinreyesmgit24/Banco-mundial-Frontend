<template>
    <div>
        <h2 class="font-bold mb-4 text-center">A. INFORMACIÓN DE CONTROL DEL CUESTIONARIO DE SELECCIÓN</h2>
        <p class="text-gray-600 text-center mb-5">
            <span class="text-blue-500">[Buenos días/Buenas tardes/Buenas noches]</span>. Le llamo de <span
                class="text-blue-500">[insertar contratista implementador]</span>, en nombre del Banco Mundial. Estamos
            llevando a cabo una encuesta del sector privado en <span class="text-blue-500">[insertar nombre del
                país]</span>
            para comprender mejor el entorno empresarial y las restricciones que enfrentan empresas como la suya.
        </p>

        <p class="text-gray-600 text-center mb-8">
            <span class="text-blue-500">[Buenos días/Buenas tardes/Buenas noches]</span>. Le llamo de <span
                class="text-blue-500">[insertar contratista implementador]</span>. Junto con el Banco Mundial, estamos
            realizando una encuesta sobre las experiencias y opiniones de los líderes empresariales en <span
                class="text-blue-500">[insertar nombre del país]</span>. ¿Hay alguna persona disponible, puede ser
            usted,
            para contestar unas breves preguntas sobre este establecimiento para determinar si es elegible para la
            encuesta?
        </p>

        <form class="text-center">
            <!-- Pregunta S10 -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    S.10 ESTÁ REGISTRADO FORMALMENTE CON [AGENCIA DE REGISTRO]
                </label>
                <div class="flex justify-center">
                    <label class="inline-flex items-center mr-4">
                        <input type="radio" class="form-radio" name="S10" value="1" v-model="survey.Q_S10">
                        <span class="ml-2">Sí</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" class="form-radio" name="S10" value="2" v-model="survey.Q_S10">
                        <span class="ml-2">No</span>
                    </label>
                </div>
            </div>

            <!-- Pregunta S8 (Deshabilitada si S10 = "No") -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    S.8 ES DE PROPIEDAD TOTAL DEL GOBIERNO CENTRAL, REGIONAL O MUNICIPAL
                </label>
                <div class="flex justify-center">
                    <label class="inline-flex items-center mr-4">
                        <input type="radio" class="form-radio" name="S8" v-model="survey.Q_S8" value="1"
                            :disabled="isS8Disabled">
                        <span class="ml-2">Sí</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" class="form-radio" name="S8" v-model="survey.Q_S8" value="2"
                            :disabled="isS8Disabled">
                        <span class="ml-2">No</span>
                    </label>
                </div>
            </div>

            <!-- Pregunta S9 (Deshabilitada si S8 = "No") -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">
                    S.9 ES UNA COOPERATIVA O COLECTIVO PROPIEDAD DE LOS TRABAJADORES
                </label>
                <div class="flex justify-center">
                    <label class="inline-flex items-center mr-4">
                        <input type="radio" class="form-radio" name="S9" v-model="survey.Q_S9" value="1"
                            :disabled="isS9Disabled">
                        <span class="ml-2">Sí</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" class="form-radio" name="S9" v-model="survey.Q_S9" value="2"
                            :disabled="isS9Disabled">
                        <span class="ml-2">No</span>
                    </label>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
        if(this.survey.Q_S9!=""){
            this.$emit('update:buttonNext', false);
        }else{
            this.$emit('update:buttonNext', true);
        }
    },
    beforeUnmount() { // O "beforeDestroy" en Vue 2
        this.$emit('update:buttonNext', false);
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
        // Computed para deshabilitar S8 si S10 es "No"
        isS8Disabled() {
            return this.survey.Q_S10 === ""; // Si S10 es "No" (2), deshabilita S8
        },
        // Computed para deshabilitar S9 si S8 es "No"
        isS9Disabled() {
            return this.survey.Q_S8 === ""; // Si S8 es "No" (2), deshabilita S9
        },
    },
    watch: {
        // Escucha cambios en S9 y actualiza buttonNext
        "survey.Q_S9"(newValue) {
            if (newValue!="") {
                this.$emit("update:buttonNext", false);
            }
        }
    },
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
}
</script>
