<template>
    <div>
        <h1 class="text-4xl font-bold mb-2 text-center">BANCO MUNDIAL</h1>
        <h2 class="text-2xl text-gray-600 text-center mb-5">Cuestionario de selección de la Encuesta Empresarial a nivel
            de empresa</h2>
        <hr class="mb-5">

        <form class="w-full max-w-lg mx-auto">
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="technicalid">S.1 ID DE LA EMPRESA</label>
                <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="S1" type="text" disabled v-model="survey.code" />
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="info_M">Información de muestreo</label>
                <table class="min-w-full bg-white">
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">Sector de la muestra</td>
                            <td class="py-2 px-4 border-b border-gray-200">a4a</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">Tamaño de la muestra</td>
                            <td class="py-2 px-4 border-b border-gray-200">a6a</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">Ubicación de la muestra</td>
                            <td class="py-2 px-4 border-b border-gray-200">a2</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">Panel</td>
                            <td class="py-2 px-4 border-b border-gray-200">panel</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="info_M">S.3 INFORMACIÓN DE
                    CONTACTO</label>
                <table class="min-w-full bg-white">
                    <tbody>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">NOMBRE DE EMPRESA</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.name }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">NÚMERO DE CASA/PISO/PUERTA:</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.floorNumber }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">CALLE</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.street }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">CIUDAD</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.city }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">ESTADO/PROVINCIA</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.state }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">NÚMERO DE TELÉFONO</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.phoneNumberOne }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">NÚMERO DE FAX</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.faxNumber }}</td>
                        </tr>
                        <tr>
                            <td class="py-2 px-4 border-b border-gray-200">DIRECCIÓN DE CORREO ELECTRÓNICO</td>
                            <td class="py-2 px-4 border-b border-gray-200">{{ randomCompany.emailAddress }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
    props: {
        randomCompany: Object
    },
    mounted() {
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
    },
    methods: {
        ...mapActions(["updateStateSurvey"]),
    },
    watch: {
    randomCompany: {
        handler(newVal) {
            this.survey.companyId = newVal.id;
            this.survey.code = newVal.code;
        },
        deep: true,
        immediate: true
    }
}
};
</script>