<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7c ¿Esta sede (la sede central) se dedica a la producción o ventas en esta ubicación?</label>
            <div class="flex items-center">
                <input id="Si" name="A7C" type="radio" value="1" v-model="survey.Q_A7C" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="Si" class="ml-3 block text-sm font-medium text-gray-700">Sí</label>
            </div>
            <div class="flex items-center">
                <input id="No" name="A7C" type="radio" value="2" v-model="survey.Q_A7C" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="No" class="ml-3 block text-sm font-medium text-gray-700">No</label>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
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
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
}
</script>