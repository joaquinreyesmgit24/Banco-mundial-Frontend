<template>
    <div class="grid grid-cols-1 gap-6 mb-6">
        <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <form @submit.prevent="updateCompany(editedCompany.id, editedCompany)"
                class="border border-neutral-200 rounded-md p-4 md:p-5 bg-neutral-50">
                <div class="grid gap-2 mb-4 grid-cols-2">
                    <div class="col-span-2 mb-3">
                        <label for="code" class="block mb-2 text-sm font-medium text-gray-900">Seleccionar
                            número:</label>
                        <div class="flex">
                            <div class="mr-4">
                                <input type="radio" name="number" value="1" v-model="selectedNumber">
                                972167008
                            </div>
                            <div>
                                <input type="radio" name="number" value="2" v-model="selectedNumber">
                                976516751
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 mb-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Rut de la
                            empresa:</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                            placeholder="Nombre" disabled />
                    </div>
                    <div class="col-span-2 mb-3">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre de la
                            empresa:</label>
                        <input type="text" name="name" id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                            placeholder="Nombre" disabled />
                    </div>
                    <div class="col-span-2 mb-3">
                        <label for="role" class="block mb-2 text-sm font-medium text-gray-900">Incidencia:</label>
                        <select id="role"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500">
                            <option value="" disabled selected>
                                Seleccionar incidencia
                            </option>
                            <option v-for="incidence in incidents" :key="incidence.id" :value="incidence.id">
                                {{ incidence.description }}
                            </option>
                        </select>
                    </div>
                </div>
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
                        <tr class="border-t border-gray-300">
                            <td class="py-2 px-4 border border-gray-300">972167008</td>
                            <td class="py-2 px-4 border border-gray-300">No contesta</td>
                            <td class="py-2 px-4 border border-gray-300">No respondió a la solicitud</td>
                            <td class="py-2 px-4 border border-gray-300">10-02-2025</td>
                        </tr>
                    </tbody>
                    <button type="button"
                        class="w-full text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm py-2.5 mb-6 text-center">
                        Agregar incidencia
                    </button>
                </table>
            </form>
            <div v-if="1 == 2" class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity" @click="" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <button class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form @submit.prevent="createUser(createdUser)" class="p-4 md:p-5">
                            <div class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">
                                        Comentario:</label>
                                    <textarea name="comentarios" rows="10"
                                        cols="40">Escribe aquí tus comentarios</textarea>
                                </div>
                            </div>
                            <button type="submit"
                                class="text-white inline-flex items-center bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Cerrar
                            </button>
                        </form>
                    </div>
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
            incidents: []
        }
    },
    mounted() {
        this.getDataIncidents()
        // this.getDataRandomCompany()
    },
    methods: {
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
            GlobalService.getData(`/company/get-random-company/${userId}`)
                .then((response) => {
                    this.incidents = response.incidents
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