<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center" @submit.prevent="createSurvey(this.survey)">
            <label class="block text-gray-700 text-sm font-bold mb-2"><span class="text-blue-500">ACTUALICE LA HOJA DE
                    INFORMACIÓN SI LOS DATOS DE CONTACTO SON DIFERENTES A LOS LISTADOS</span></label>
            <div class="flex justify-center">
                <button type="submit"
                    class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Terminar</button>
            </div>
        </form>
    </div>
</template>

<script>
import GlobalService from "../../../../services/GlobalServices";
import { mapActions, mapGetters } from "vuex";
import { useToast } from "vue-toastification";
export default {
    data(){
        return{
            toast: useToast(),
        }
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
    methods: {
        ...mapActions(["updateStateSurvey"]),
        createSurvey(survey) {
            GlobalService.createData("/survey/create-survey", survey)
                .then((response) => {
                    this.toast.success(response.data.msg);
                    this.calls = response.data.calls
                })
                .catch((e) => {
                    this.toast.error("No se ha podido guardar la encuesta");
                
                })
        }

    },
}
</script>