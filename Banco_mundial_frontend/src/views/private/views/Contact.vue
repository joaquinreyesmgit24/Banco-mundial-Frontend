<template>
    <div class="grid grid-cols-1 gap-6 mb-6">
        <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <h2 v-if="!randomCompany" class="text-center">
                <span v-if="this.$route.params.companyId">La empresa no se puede contactar debido a que no tiene llamados
                    disponibles o ya tiene un reporte</span>
                <span v-else>No hay empresas disponibles para contactar</span>
                <i class="ri-error-warning-fill ml-2"></i>
            </h2>
            <form v-else @submit.prevent="createCall(call)"
                class="border border-neutral-200 rounded-md p-4 md:p-5 bg-neutral-50">
                <div class="grid gap-2 mb-4 grid-cols-2">
                    <div class="col-span-2 mb-3">
                        <label for="code" class="block mb-2 text-sm font-medium text-gray-900">Seleccionar
                            número:</label>
                        <div class="flex">
                            <div class="mr-4">
                                <input type="radio" name="number" :value="randomCompany.phoneNumberOne"
                                    v-model="call.phone">
                                {{ randomCompany.phoneNumberOne }}
                            </div>
                            <div>
                                <input type="radio" name="number" :value="randomCompany.phoneNumberSecond"
                                    v-model="call.phone">
                                {{ randomCompany.phoneNumberSecond }}
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 mb-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Rut de la
                            empresa:</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                            placeholder="Rut" disabled v-model="randomCompany.rut" />
                    </div>
                    <div class="col-span-2 mb-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre de la
                            empresa:</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                            placeholder="Nombre" disabled v-model="randomCompany.name" />
                    </div>
                    <div class="col-span-2 mb-3">
                        <label for="role" class="block mb-2 text-sm font-medium text-gray-900">Incidencia:</label>
                        <select id="role"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                            v-model="call.incidenceId">
                            <option value="" disabled selected>
                                Seleccionar incidencia
                            </option>
                            <option v-for="incidence in incidents" :key="incidence.id" :value="incidence.id">
                                {{ incidence.description }}
                            </option>
                        </select>
                    </div>
                    <div class="col-span-2 mb-3"
                        v-if="call.incidenceId != '' && call.incidenceId != 1 && call.incidenceId != 2 && call.incidenceId != 3 && call.incidenceId != 4 && call.incidenceId != 7">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">
                            Comentario:</label>
                        <textarea name="comentarios" rows="5" cols="165" v-model="call.comment"></textarea>
                    </div>
                </div>
                <div class="col-span-2 mb-7" v-if="call.incidenceId == 7">
                    <label for="reschedulingDate" class="block mb-2 text-sm font-medium text-gray-900">Fecha de
                        reprogramación de llamado:</label>
                    <input type="date" name="reschedulingDate" id="reschedulingDate" v-model="call.rescheduled.date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500" />
                </div>
                <div class="col-span-2 mb-7" v-if="call.incidenceId == 7">
                    <label for="reschedulingTime" class="block mb-2 text-sm font-medium text-gray-900">Hora de
                        reprogramación de llamado:</label>
                    <input type="time" name="reschedulingTime" id="reschedulingTime" v-model="call.rescheduled.time"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500" />
                </div>
                <button type="submit"
                    v-if="call.incidenceId == 1 || call.incidenceId === 2 || call.incidenceId === 3 || call.incidenceId === 4"
                    @click="openModal"
                    class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                    Desplegar formulario de contactación
                </button>
                <button type="submit" v-if="call.incidenceId === 7"
                    class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                    Reprogramar llamado
                </button>
                <button type="submit"
                    v-if="call.incidenceId != 1 && call.incidenceId != 2 && call.incidenceId != 3 && call.incidenceId != 4 && call.incidenceId != 7"
                    class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                    Agregar incidencia
                </button>
                <table class="min-w-full bg-white border border-gray-300 text-sm text-left">
                    <thead class="bg-gray-50 text-gray-600 uppercase text-xs border-b border-gray-300">
                        <tr>
                            <th class="py-2 px-4 border border-gray-300">Teléfono</th>
                            <th class="py-2 px-4 border border-gray-300">Incidencia</th>
                            <th class="py-2 px-4 border border-gray-300">Comentario</th>
                            <th class="py-2 px-4 border border-gray-300">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="call in calls" :key="call.id" class="border-t border-gray-300">
                            <td class="py-2 px-4 border border-gray-300">{{ call.phone }}</td>
                            <td class="py-2 px-4 border border-gray-300">{{ call.incident.description }}</td>
                            <td class="py-2 px-4 border border-gray-300">{{ call.comment || 'Sin comentario' }}</td>
                            <td class="py-2 px-4 border border-gray-300">{{ new Date(call.date).toLocaleDateString() }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <button type="submit" @click="changeContact()"
                class="mt-5 px-3 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-3.5 mb-6 text-center">
                Cambiar de contacto
            </button>
        </div>
        <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-md w-5xl ml-20 max-h-[80vh] overflow-auto">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold">Encuesta</h2>
                    <!-- <button @click="closeModal" class="text-gray-500 hover:text-gray-800">✖</button> -->
                </div>
                <router-view :buttonNext="buttonNext" :showRejectButton="showRejectButton"
                    @update:buttonNext="buttonNext = $event" @update:showRejectButton="showRejectButton = $event"
                    :randomCompany="randomCompany"></router-view>
                <div class="flex justify-end space-x-4 mt-4">
                    <button v-if="showRejectButton" @click="rejectInterview"
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                        Terminar entrevista
                    </button>
                    <button v-if="currentPage < 13" @click="nextPage" :disabled="buttonNext"
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GlobalService from "../../../services/GlobalServices";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import { useToast } from "vue-toastification";
import dayjs from "dayjs"; // Importa dayjs
import { mapActions, mapGetters } from "vuex";
export default {
    name: "list-users",
    components: {
        VueGoodTable,
    },
    data() {
        return {
            calls: [],
            incidents: [],
            randomCompany: "",
            toast: useToast(),
            showRejectButton: true,
            buttonNext: false,
            call: {
                phone: "",
                comment: "",
                date: new Date().toLocaleString("sv-SE", { timeZone: "America/Santiago" }).replace("T", " "),
                companyId: "",
                incidenceId: "",
                rescheduled: {
                    date: "",
                    time: ""
                }
            },
        }
    },
    mounted() {
        this.getDataIncidents()
        this.getDataRandomCompany()
        if (this.$route.params.companyId) {
            this.getSelectCompanyToCallById(this.$route.params.companyId)
        }
        else {
            this.getDataRandomCompany(this.getUserID)
        }
    },
    methods: {
        ...mapActions(["resetSurveyInfo"]),
        resetSurvey() {
            this.resetSurveyInfo()
        },
        openModal() {
            this.isModalOpen = true;
            this.$router.push({ path: "/contact/survey/1" }); // Usa una ruta absoluta
        },
        closeModal() {
            this.isModalOpen = false;
            this.resetSurvey()
            this.getDataRandomCompany()
            this.$router.push({ path: "/contact" }); // Usa una ruta absoluta
        },
        rejectInterview() {
            this.$router.push({ path: "/contact/survey/13", query: { rejection: 3 } }); // Usa una ruta absoluta
        },
        nextPage() {
            let nextPage = this.currentPage + 1;
            if (nextPage <= 13) {
                if (this.survey.Q_A7D_estab_name != "") {
                    this.$router.push({ path: "/contact/survey/12" });
                } else if (this.survey.Q_S7 != "") {
                    if (this.survey.Q_S7 < 5) {
                        this.$router.push({ path: "/contact/survey/13" });
                    } else {
                        this.$router.push({ path: `/contact/survey/${nextPage}` });
                    }
                } else {
                    this.$router.push({ path: `/contact/survey/${nextPage}` });
                }
            }
        },
        changeContact(){
            window.location.reload()
        },  
        createCall(call) {
            GlobalService.createData("/call/create-call", call)
                .then((response) => {
                    console.log(response)
                    this.toast.success(response.data.msg);
                    this.calls = response.data.calls
                    if (call.incidenceId != 1 && call.incidenceId != 2 && call.incidenceId != 3 && call.incidenceId != 4) {
                        window.location.reload()
                    }
                })
                .catch((e) => {
                    let errors = e.response.data.errors;
                    let error = e.response.data.error;
                    console.log(errors)
                    if (errors) {
                        errors.forEach((error_element) => {
                            this.toast.error(error_element.msg);
                        });
                    } else {
                        this.toast.error(error);
                    }
                })
        },
        getDataIncidents() {
            GlobalService.getData("/call/list-incidents")
                .then((response) => {
                    this.incidents = response.incidents
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDataRandomCompany(userId) {
            this.calls = [],
                this.randomCompany = "",
                this.showRejectButton = true,
                this.buttonNext = false,
                this.calls = {
                    phone: "",
                    comment: "",
                    date: new Date().toLocaleString("sv-SE", { timeZone: "America/Santiago" }).replace("T", " "),
                    companyId: "",
                    incidenceId: "",
                    rescheduled: {
                        date: "",
                        time: ""
                    }
                }
            GlobalService.getData(`/call/get-random-company/${userId}`)
                .then((response) => {
                    this.randomCompany = response
                    this.call.companyId = response.id
                    this.call.phone = response.phoneNumberOne
                    this.getDataCalls(response.id)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getSelectCompanyToCallById(companyId) {
            GlobalService.getData(`/call/get-select-company-to-call-by-id/${companyId}`)
                .then((response) => {
                    this.randomCompany = response
                    this.call.companyId = response.id
                    this.call.phone = response.phoneNumberOne
                    this.getDataCalls(response.id)
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDataCalls(companyId) {
            GlobalService.getData(`/call/list-calls/${companyId}`)
                .then((response) => {
                    this.calls = response.calls
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    computed: {
        ...mapGetters(["getUserID", "getSurvey"]),
        survey: {
            get() {
                return this.getSurvey; // Obtiene el estado desde Vuex
            },
            set(value) {
                this.updateStateSurvey(value); // Lo actualiza en Vuex
            },
        },
        currentPage() {
            return Number(this.$route.params.page) || 1;
        }
    },
};
</script>

<style scoped>
.spinner {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>