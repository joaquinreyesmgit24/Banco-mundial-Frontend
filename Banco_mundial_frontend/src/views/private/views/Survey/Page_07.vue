<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7b	¿Es este establecimiento la ubicación de la sede central?</label>
            <div class="flex items-center">
                <input id="Si" name="A7B" type="radio" value="1" v-model="survey.Q_A7B" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="Si" class="ml-3 block text-sm font-medium text-gray-700">Sí</label>
            </div>
            <div class="flex items-center">
                <input id="No" name="A7B" type="radio" value="2" v-model="survey.Q_A7B" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="No" class="ml-3 block text-sm font-medium text-gray-700">No</label>
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
    },
    watch: {
        // Escucha cambios en S9 y actualiza buttonNext
        "survey.Q_A7B"(newValue) {
            if (newValue != "") {
                if(newValue==2){
                this.$router.push({ path: "/contact/survey/11"}); 
              }
              this.$emit("update:buttonNext", false);
            }
      
        }
    },
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
}
</script>