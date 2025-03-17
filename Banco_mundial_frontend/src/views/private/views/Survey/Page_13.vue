<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center" @submit.prevent="createSurvey(this.survey)">
            <label class="block text-gray-700 text-sm font-bold mb-2"><span class="text-blue-500">ACTUALICE LA HOJA DE
                    INFORMACIÓN SI LOS DATOS DE CONTACTO SON DIFERENTES A LOS LISTADOS</span></label>
            <div>
                <label for="mainSelect" v-if="(survey.Q_S10 != 2 && survey.Q_S8 !=1 && 
                survey.Q_S9 != 1 &&  survey.Q_S4 != -9 && (survey.Q_S7 !== null && survey.Q_S7>=5) 
                && (survey.Q_A11 != 1 && survey.Q_A7C != 2) && survey.Q_A9 !=2) || rejection">Seleccione una opción:</label>
                <select v-model="survey.selectedMainStatus" id="mainSelect" v-if="(survey.Q_S10 != 2 && survey.Q_S8 !=1 && 
                survey.Q_S9 != 1 &&  survey.Q_S4 != -9 && (survey.Q_S7 !== null && survey.Q_S7>=5) 
                && (survey.Q_A11 != 1 && survey.Q_A7C != 2) && survey.Q_A9 !=2) || rejection">
                    <option v-for="option in mainOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
                <div v-if="survey.selectedMainStatus === 3">
                    <label for="subSelect">Motivo del rechazo:</label>
                    <select v-model="survey.selectedSubStatus" id="subSelect">
                        <option v-for="subOption in subOptions" :key="subOption.value" :value="subOption.value">
                            {{ subOption.label }}
                        </option>
                    </select>
                </div>
            </div>
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
    props: {
        showRejectButton: Boolean
    },
    data() {
        return {
            rejection:"",
            toast: useToast(),
            mainOptions: [],
            subOptions: [],
        }
    },
    beforeUnmount() { // O "beforeDestroy" en Vue 2
        this.$emit('update:showRejectButton', true);
    },
    mounted(){
        this.$emit('update:showRejectButton', false);
        this.rejection =this.$route.query.rejection
        if(this.$route.query.rejection){
            this.mainOptions= [
                { label: "Entrevista efectiva incompleta", value: 2 },
                { label: "Rechazo a la entrevista", value: 3 },
            ]
            this.subOptions=[
            { label: "No desea participar", value: 1 },
                { label: "No tiene tiempo para participar", value: 2 },
                { label: "Lejos de la ciudad/de viaje", value: 3 },
                { label: "No le interesa el tema", value: 4 },
                { label: "No responder a ninguna encuesta como norma general", value: 5 },
                { label: "Otros", value: 6 },
            ]
        }else{
            this.mainOptions=[
                { label: "Entrevista completa con implementación presencial", value: 1 },
                { label: "Entrevista completa con implementación en video", value: 5 },
                { label: "Entrevista completa con implementación mixta", value: 6 },
                { label: "Elegible en proceso para hacer una cita", value: 4 },
            ]
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