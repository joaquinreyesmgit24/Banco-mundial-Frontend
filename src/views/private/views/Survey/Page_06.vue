<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7a	¿Cuántos establecimientos forman parte de la empresa?</label>
            <div class="flex items-center">
                <input id="nro" name="A7A" type="radio" value="1" v-model="survey.Q_A7A" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="nro" class="ml-3 block text-sm font-medium text-gray-700">Número de establecimientos:</label>
            </div>
            <div class="flex items-center" v-if="survey.Q_A7A == '1'">
                <input type="number" id="A7A_cantidad" class="form-input mt-1 block w-full" v-model="survey.A7A_cant_val" placeholder="0"/>
            </div>
            <div class="flex items-center">
                <input id="NS" name="A7A" type="radio" value="-9" v-model="survey.Q_A7A" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="NS" class="ml-3 block text-sm font-medium text-gray-700"><span class="text-blue-500">NO SABE (ESPONTÁNEO)</span></label>
            </div>
        </form>
        {{ survey.A7A_cant_val }}
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
    },
    watch:{
   "survey.Q_A7A"(newValue) {
        if (newValue === "1") {
            // Si Q_A7A es 1, chequea si A7A_cant_val tiene un valor
            if (this.survey.A7A_cant_val <= 0) {
                this.$emit("update:buttonNext", true); // Desactiva el botón
            } else {
                this.$emit("update:buttonNext", false); // Activa el botón
            }
        } else {
            this.$emit("update:buttonNext", false); // Si Q_A7A no es 1, activa el botón
        }
    },
    "survey.A7A_cant_val"(newValue) {
        if (this.survey.Q_A7A === "1") {
            // Valida el campo A7A_cant_val cuando Q_A7A es 1
            if (!newValue || newValue <= 0) {
                this.$emit("update:buttonNext", true); // Desactiva el botón
            } else {
                this.$emit("update:buttonNext", false); // Activa el botón
            }
        }
    }
    },
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
}
</script>