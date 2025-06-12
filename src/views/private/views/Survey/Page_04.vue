<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">S.7 ¿Cuántos trabajadores tiene este
                establecimiento?</label>
            <label class="block text-gray-700 text-sm mb-2">Número de trabajadores:</label>
            <div class="flex items-center">
                <!-- <label class="block text-gray-700 text-sm mb-2">Número de trabajadores:</label> -->
                <input type="number" id="S7" class="form-input mt-1 block w-full" placeholder="0"
                    v-model="survey.Q_S7" />
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
    watch: {
        // Escucha cambios en S9 y actualiza buttonNext
        "survey.Q_S7"(newValue) {
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