<template>
    <div class="grid grid-cols-1 gap-6 mb-6">

        <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <h2 v-if="randomCompany.length == 0" class="text-center">
                No hay empresas disponibles para contactar
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
                    <div class="col-span-2 mb-3" v-if="call.incidenceId == 2">
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900">
                            Comentario:</label>
                        <textarea name="comentarios" rows="5" cols="165" v-model="call.comment"></textarea>
                    </div>
                </div>
                <div class="col-span-2 mb-7" v-if="call.incidenceId == 3">
                    <label for="reschedulingDate" class="block mb-2 text-sm font-medium text-gray-900">Fecha de
                        reprogramación de llamado:</label>
                    <input type="date" name="reschedulingDate" id="reschedulingDate"
                    v-model="call.rescheduled.date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500" />
                </div>
                <div class="col-span-2 mb-7" v-if="call.incidenceId == 3">
                    <label for="reschedulingTime" class="block mb-2 text-sm font-medium text-gray-900">Hora de
                        reprogramación de llamado:</label>
                    <input type="time" name="reschedulingTime" id="reschedulingTime"
                    v-model="call.rescheduled.time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500" />
                </div>
                <button type="submit" v-if="call.incidenceId == 1"
                    class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                    Desplegar formulario de contactación
                </button>
                <button type="submit" v-if="call.incidenceId == 2"
                    class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                    Agregar incidencia
                </button>
                <button type="submit" v-if="call.incidenceId == 3"
                    class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                    Reprogramar llamado
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
            call: {
                phone: "",
                comment: "",
                date: new Date().toISOString().slice(0, 19).replace('T', ' '),
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
        this.getDataRandomCompany(this.getUserID)
    },
    methods: {
        createCall(call) {
            GlobalService.createData("/call/create-call", call)
                .then((response) => {
                    this.toast.success(response.data.msg);
                    this.calls = response.data.calls
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
        ...mapGetters(["getUserID"]),
    }
};
</script>

<style></style>