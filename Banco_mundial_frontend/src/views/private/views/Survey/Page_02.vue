<template>
    <div>
        <h2 class="font-bold mb-4 text-center">A. INFORMACIÓN DE CONTROL DEL CUESTIONARIO DE SELECCIÓN</h2>
        <p class="text-gray-600 text-center mb-5">
            <span class="text-blue-500">[Buenos días/Buenas tardes/Buenas noches]</span>. Le llamo de <span
                class="text-blue-500">[insertar contratista implementador]</span>, en nombre del Banco Mundial. Estamos
            llevando a cabo una encuesta del sector privado en <span class="text-blue-500">[insertar nombre del
                país]</span> para comprender mejor el entorno empresarial y las restricciones que enfrentan empresas
            como la suya.
        </p>
        <p class="text-gray-600 text-center mb-5">
            ¿Podría hablar por favor con la persona que más a menudo representa al establecimiento para fines oficiales,
            es decir, la persona que más a menudo trata con bancos o agencias o instituciones gubernamentales?
        </p>
        <p class="text-gray-600 text-center mb-5 font-bold">
            <span class="text-blue-500">SI LA PERSONA NO ESTÁ DISPONIBLE, PREGUNTE SI LA PERSONA AL TELÉFONO PUEDE
                RESPONDER ALGUNAS PREGUNTAS ACERCA DEL NEGOCIO O COORDINAR UNA HORA CONVENIENTE PARA VOLVER A
                LLAMAR.</span>
        </p>
        <p class="text-gray-600 text-center mb-5 font-bold">
            <span class="text-blue-500">SI LLAMADA AVANZA, CONTINÚE</span>
        </p>
        <p class="text-gray-600 text-center mb-8">
            <span class="text-blue-500">[Buenos días/Buenas tardes/Buenas noches]</span>. Le llamo de <span
                class="text-blue-500">[insertar contratista implementador]</span>. Junto con el Banco Mundial, estamos
            realizando una encuesta sobre las experiencias y opiniones de los líderes empresariales en <span
                class="text-blue-500">[insertar nombre del país]</span>. ¿Hay alguna persona disponible, puede ser
            usted, para contestar unas breves preguntas sobre este establecimiento para determinar si es elegible para
            la encuesta?
        </p>
        <p class="text-gray-600 text-center mb-5">
            <span class="text-blue-500">POR FAVOR CODIFIQUE LO SIGUIENTE. SI LAS RESPUESTAS NO SON CLARAS, POR FAVOR
                CONFIRME CON LA EMPRESA O ESTABLECIMIENTO ENCUESTADO</span>
        </p>
        <form class="text-center">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">S.10 ESTÁ REGISTRADO FORMALMENTE CON [AGENCIA
                    DE REGISTRO]</label>
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
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">S.8 ES DE PROPIEDAD TOTAL DEL GOBIERNO
                    CENTRAL, REGIONAL O MUNICIPAL</label>
                <div class="flex justify-center">
                    <label class="inline-flex items-center mr-4">
                        <input type="radio" class="form-radio" name="S8" v-model="survey.Q_S8" value="1">
                        <span class="ml-2">Sí</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" class="form-radio" name="S8" v-model="survey.Q_S8" value="2">
                        <span class="ml-2">No</span>
                    </label>
                </div>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">S.9 ES UNA COOPERATIVA O COLECTIVO PROPIEDAD
                    DE LOS TRABAJADORES</label>
                <div class="flex justify-center">
                    <label class="inline-flex items-center mr-4">
                        <input type="radio" class="form-radio" name="S9" v-model="survey.Q_S9" value="1">
                        <span class="ml-2">Sí</span>
                    </label>
                    <label class="inline-flex items-center">
                        <input type="radio" class="form-radio" name="S9" v-model="survey.Q_S9" value="2">
                        <span class="ml-2">No</span>
                    </label>
                </div>
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