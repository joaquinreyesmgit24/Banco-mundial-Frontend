<template>
    <div class="grid grid-cols-1 gap-6 mb-6">
        <div class="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div class="flex">
                <button type="button"
                    class="text-white bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto"
                    data-bs-toggle="modal" data-bs-target="#modalCreateCompany" @click="openCreateCompanyModal()">
                    Agregar
                </button>
            </div>
            <div class="text-2xl font-semibold mb-4">Empresa</div>
            <VueGoodTable :columns="columns" :rows="rows" :search-options="searchOptions"
                :pagination-options="paginationOptions" max-height="450px" :fixed-header="true">
                <template v-slot:table-row="props">
                    <span v-if="props.column.field == 'acciones'">
                        <button type="button"
                            class="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3"
                            data-bs-toggle="modal" data-bs-target="#modalUpdateCompany"
                            @click="openUpdateCompanyModal(props.row)">
                            Editar
                        </button>
                        <button type="button"
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            @click="openDeleteCompanyAlert(props.row)">
                            Eliminar
                        </button>
                    </span>
                    <span v-if="props.column.field == 'role'">
                        {{ props.row.role.name }}
                    </span>
                </template>
                <template v-slot:emptystate>
                    <div style="text-align: center">No hay datos disponibles</div>
                </template>
            </VueGoodTable>
            <div v-if="showCompanyDeleteAlert" class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity" @click="closeDeleteCompanyAlert" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full p-4 mb-4"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <div class="flex items-center">
                            <h3 class="text-lg font-medium">¿Estás seguro que deseas eliminar a la empresa {{companyDeleted.name}}?</h3>
                        </div>
                        <div class="mt-2 mb-4 text-sm">
                            Este elemento se eliminará permanentemente. Esta acción no se puede revertir.
                        </div>
                        <div class="flex">
                            <button @click="deleteCompany(this.companyDeleted.id)" type="button"
                                class="text-white inline-flex items-center bg-red-700 hover:bg-red-800 border border-red-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                                Eliminar
                            </button>
                            <button @click="closeDeleteCompanyAlert()" type="button"
                                class="text-red-800 bg-transparent inline-flex items-center hover:bg-red-800 hover:text-white border border-red-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="showCompanyUpdateModal" class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity" @click="closeUpdateCompanyModal" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <button @click="closeUpdateCompanyModal"
                            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form @submit.prevent="updateCompany(editedCompany.id,editedCompany)" class="p-4 md:p-5">
                            <div v-show="nextCompanyUpdateModal" class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="code" class="block mb-2 text-sm font-medium text-gray-900">Código:</label>
                                    <input type="text" name="code" id="code"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Código" v-model.trim="editedCompany.code" />
                                </div>
                                <div class="col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
                                    <input type="text" name="name" id="name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre" v-model.trim="editedCompany.name" />
                                </div>
                                <div class="col-span-2">
                                    <label for="floorNumber" class="block mb-2 text-sm font-medium text-gray-900">Número de casa/piso/puerta:</label>
                                    <input type="text" name="floorNumber" id="floorNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de casa/Piso/Puerta" v-model.trim="editedCompany.floorNumber" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="street" class="block mb-2 text-sm font-medium text-gray-900">Calle:</label>
                                    <input type="text" name="street" id="street"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Calle" v-model.trim="editedCompany.street" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="city" class="block mb-2 text-sm font-medium text-gray-900">Ciudad:</label>
                                    <input type="text" name="city" id="city"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Ciudad" v-model.trim="editedCompany.city" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="state" class="block mb-2 text-sm font-medium text-gray-900">Estado/provincia:</label>
                                    <input type="text" name="state" id="state"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Estado/Provincia" v-model.trim="editedCompany.state" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="phoneNumberOne" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 1:</label>
                                    <input type="text" name="phoneNumberOne" id="phoneNumberOne"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de teléfono 1" v-model.trim="editedCompany.phoneNumberOne" />
                                </div> 
                            </div>
                            <div class="flex justify-end mt-4" v-show="nextCompanyUpdateModal">
                                <button type="button" @click="nextUpdateModal"
                                    class="text-white inline-flex items-center bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Siguiente
                                </button>
                            </div>
                            <div v-show="!nextCompanyUpdateModal" class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="phoneNumberSecond" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 2:</label>
                                    <input type="text" name="phoneNumberSecond" id="phoneNumberSecond"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de teléfono 2" v-model.trim="editedCompany.phoneNumberSecond" />
                                </div>
                                <div class="col-span-2">
                                    <label for="preferenceNumber" class="block mb-2 text-sm font-medium text-gray-900">Número de preferencia:</label>
                                    <input type="text" name="preferenceNumber" id="preferenceNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de preferencia" v-model.trim="editedCompany.preferenceNumber" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="faxNumber" class="block mb-2 text-sm font-medium text-gray-900">Número de fax:</label>
                                    <input type="text" name="faxNumber" id="faxNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de fax" v-model.trim="editedCompany.faxNumber" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="emailAddress" class="block mb-2 text-sm font-medium text-gray-900">Dirección de correo electrónico:</label>
                                    <input type="text" name="emailAddress" id="emailAddress"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Correo de la empresa" v-model.trim="editedCompany.emailAddress" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="sampleSector"
                                        class="block mb-2 text-sm font-medium text-gray-900">Sector de la muestra:</label>
                                    <select id="sampleSector"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedCompany.sampleSectorId">
                                        <option value="" disabled selected>
                                            Seleccionar sector de la muestra
                                        </option>
                                        <option v-for="sampleSector in sampleSectors" :key="sampleSector.id" :value="sampleSector.id">
                                            {{ sampleSector.description }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-1">
                                    <label for="sampleSize"
                                        class="block mb-2 text-sm font-medium text-gray-900">Tamaño de la muestra:</label>
                                    <select id="SampleSize"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedCompany.sampleSizeId">
                                        <option value="" disabled selected>
                                            Seleccionar tamaño de la muestra
                                        </option>
                                        <option v-for="sampleSize in sampleSizes" :key="sampleSize.id" :value="sampleSize.id">
                                            {{ sampleSize.description }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Ubicación de la muestra:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedCompany.sampleLocation" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="panel"
                                        class="block mb-2 text-sm font-medium text-gray-900">Panel de la muestra:</label>
                                    <select id="panel"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedCompany.panelId">
                                        <option value="" disabled selected>
                                            Seleccionar panel de la muestra
                                        </option>
                                        <option v-for="panel in panels" :key="panel.id" :value="panel.id">
                                            {{ panel.description }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex justify-between mt-4" v-show="!nextCompanyUpdateModal">
                                <button type="button" @click="returnUpdateModal"
                                    class="text-white inline-flex items-center bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Volver
                                </button>
                                <button type="submit"
                                    class="text-white inline-flex items-center bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Actualizar estudio
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
            <div v-if="showCompanyCreateModal" class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="fixed inset-0 transition-opacity" @click="closeCreateCompanyModal" aria-hidden="true">
                        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full"
                        role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                        <button @click="closeCreateCompanyModal"
                            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <form @submit.prevent="createCompany(createdCompany)" class="p-4 md:p-5">
                            <div v-show="nextCompanyCreateModal" class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="code" class="block mb-2 text-sm font-medium text-gray-900">Código:</label>
                                    <input type="text" name="code" id="code"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Código" v-model.trim="createdCompany.code" />
                                </div>
                                <div class="col-span-2">
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
                                    <input type="text" name="name" id="name"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre" v-model.trim="createdCompany.name" />
                                </div>
                                <div class="col-span-2">
                                    <label for="floorNumber" class="block mb-2 text-sm font-medium text-gray-900">Número de casa/piso/puerta:</label>
                                    <input type="text" name="floorNumber" id="floorNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de casa/Piso/Puerta" v-model.trim="createdCompany.floorNumber" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="street" class="block mb-2 text-sm font-medium text-gray-900">Calle:</label>
                                    <input type="text" name="street" id="street"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Calle" v-model.trim="createdCompany.street" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="city" class="block mb-2 text-sm font-medium text-gray-900">Ciudad:</label>
                                    <input type="text" name="city" id="city"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Ciudad" v-model.trim="createdCompany.city" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="state" class="block mb-2 text-sm font-medium text-gray-900">Estado/provincia:</label>
                                    <input type="text" name="state" id="state"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Estado/Provincia" v-model.trim="createdCompany.state" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="phoneNumberOne" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 1:</label>
                                    <input type="text" name="phoneNumberOne" id="phoneNumberOne"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de teléfono 1" v-model.trim="createdCompany.phoneNumberOne" />
                                </div> 
                            </div>
                            <div class="flex justify-end mt-4" v-show="nextCompanyCreateModal">
                                <button type="button" @click="nextCreateModal"
                                    class="text-white inline-flex items-center bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Siguiente
                                </button>
                            </div>
                            <div v-show="!nextCompanyCreateModal" class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="phoneNumberSecond" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 2:</label>
                                    <input type="text" name="phoneNumberSecond" id="phoneNumberSecond"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de teléfono 2" v-model.trim="createdCompany.phoneNumberSecond" />
                                </div>
                                <div class="col-span-2">
                                    <label for="preferenceNumber" class="block mb-2 text-sm font-medium text-gray-900">Número de preferencia:</label>
                                    <input type="text" name="preferenceNumber" id="preferenceNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de preferencia" v-model.trim="createdCompany.preferenceNumber" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="faxNumber" class="block mb-2 text-sm font-medium text-gray-900">Número de fax:</label>
                                    <input type="text" name="faxNumber" id="faxNumber"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Número de fax" v-model.trim="createdCompany.faxNumber" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="emailAddress" class="block mb-2 text-sm font-medium text-gray-900">Dirección de correo electrónico:</label>
                                    <input type="text" name="emailAddress" id="emailAddress"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Correo de la empresa" v-model.trim="createdCompany.emailAddress" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="sampleSector"
                                        class="block mb-2 text-sm font-medium text-gray-900">Sector de la muestra:</label>
                                    <select id="sampleSector"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="createdCompany.sampleSectorId">
                                        <option value="" disabled selected>
                                            Seleccionar sector de la muestra
                                        </option>
                                        <option v-for="sampleSector in sampleSectors" :key="sampleSector.id" :value="sampleSector.id">
                                            {{ sampleSector.description }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-1">
                                    <label for="sampleSize"
                                        class="block mb-2 text-sm font-medium text-gray-900">Tamaño de la muestra:</label>
                                    <select id="SampleSize"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="createdCompany.sampleSizeId">
                                        <option value="" disabled selected>
                                            Seleccionar tamaño de la muestra
                                        </option>
                                        <option v-for="sampleSize in sampleSizes" :key="sampleSize.id" :value="sampleSize.id">
                                            {{ sampleSize.description }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Ubicación de la muestra:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="createdCompany.sampleLocation" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="panel"
                                        class="block mb-2 text-sm font-medium text-gray-900">Panel de la muestra:</label>
                                    <select id="panel"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="createdCompany.panelId">
                                        <option value="" disabled selected>
                                            Seleccionar panel de la muestra
                                        </option>
                                        <option v-for="panel in panels" :key="panel.id" :value="panel.id">
                                            {{ panel.description }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="flex justify-between mt-4" v-show="!nextCompanyCreateModal">
                                <button type="button" @click="returnCreateModal"
                                    class="text-white inline-flex items-center bg-zinc-500 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Volver
                                </button>
                                <button type="submit"
                                    class="text-white inline-flex items-center bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    Crear estudio
                                </button>
                            </div>
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
    export default {
        name: "list-users",
        components: {
            VueGoodTable,
        },
        data() {
            return {
                showCompanyUpdateModal: false,
                showCompanyCreateModal: false,
                showCompanyDeleteAlert: false,
                nextCompanyCreateModal: true,
                nextCompanyUpdateModal: true,
                searchOptions: {
                    enabled: true,
                    placeholder: "Buscar",
                },
                paginationOptions: {
                    enabled: true,
                    perPage: 5,
                    nextLabel: "Siguiente",
                    prevLabel: "Anterior",
                    rowsPerPageLabel: "Filas por página",
                    paginationComplete: false,
                    ofLabel: "de",
                    allLabel: 'Todo',
                },
                toast: useToast(),
                columns: [
                    {
                        label: "Empresa",
                        field: "name",
                    },
                    {
                        label: "Ubicación de la muestra",
                        field: "sampleLocation",
                    },
                    {
                        label: "Número de teléfono 1",
                        field: "phoneNumberOne",
                    },
                    {
                        label: "Correo",
                        field: "emailAddress",
                    },
                    {
                        label: "Acciones",
                        field: "acciones",
                        type: "slots",
                    },
                ],
                rows: [],
                sampleSizes: [],
                sampleSectors:[],
                panels:[],
                editedCompany: {
                    id:"",
                    code:"",
                    name:"",
                    sampleLocation:"",
                    floorNumber:"",
                    street:"",
                    city:"",
                    state:"",
                    phoneNumberOne:"",
                    phoneNumberSecond:"",
                    faxNumber:"",
                    preferenceNumber:"",
                    emailAddress:"",
                    sampleSectorId:"",
                    sampleSizeId:"",
                    panelId:""
                },
                createdCompany: {
                    code:"",
                    name:"",
                    sampleLocation:"",
                    floorNumber:"",
                    street:"",
                    city:"",
                    state:"",
                    phoneNumberOne:"",
                    phoneNumberSecond:"",
                    faxNumber:"",
                    preferenceNumber:"",
                    emailAddress:"",
                    sampleSectorId:"",
                    sampleSizeId:"",
                    panelId:""
                },
                 companyDeleted:{
                    id:"",
                    code:"",
                    name:"",
                    sampleLocation:"",
                    floorNumber:"",
                    street:"",
                    city:"",
                    state:"",
                    phoneNumberOne:"",
                    phoneNumberSecond:"",
                    faxNumber:"",
                    preferenceNumber:"",
                    emailAddress:"",
                    sampleSectorId:"",
                    sampleSizeId:"",
                    panelId:""
                }
                
            };
        },
        mounted() {
            this.getDataCompanies();
            this.getDataSampleSectors();
            this.getDataSampleSizes();
            this.getDataPanels();
        },
        methods: {
            openUpdateCompanyModal(item) {
                console.log(item)
                this.editedCompany = { ...item };
                this.showCompanyUpdateModal = true;
            },
            openCreateCompanyModal() {
                this.showCompanyCreateModal = true;
            },
            closeUpdateCompanyModal() {
                this.showCompanyUpdateModal = false;
            },
            closeCreateCompanyModal() {
                this.showCompanyCreateModal = false;
            },
            openDeleteCompanyAlert(item){
                this.companyDeleted={...item}
                this.showCompanyDeleteAlert = true;
            },
            closeDeleteCompanyAlert(){
                this.showCompanyDeleteAlert = false;
            },
            getDataCompanies() {
                GlobalService.getData("/company/list-companies")
                    .then((response) => {
                        this.rows = response.companies.map((company) => ({
                            id: company.id,
                            code: company.code,
                            name: company.name,
                            sampleLocation: company.sampleLocation,
                            floorNumber: company.floorNumber,
                            street: company.street,
                            city: company.city,
                            state:company.state,
                            phoneNumberOne: company.phoneNumberOne,
                            phoneNumberSecond: company.phoneNumberSecond,
                            faxNumber: company.faxNumber,
                            preferenceNumber: company.preferenceNumber,
                            emailAddress: company.emailAddress,
                            sampleSectorId: company.sampleSectorId,
                            sampleSizeId: company.sampleSizeId,
                            panelId: company.panelId
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getDataPanels() {
                GlobalService.getData("/company/list-panels")
                    .then((response) => {
                        this.panels = response.panels.map((panel) => ({
                            id: panel.id,
                            description: panel.description,
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getDataSampleSectors() {
                GlobalService.getData("/company/list-sample-sectors")
                    .then((response) => {
                        this.sampleSectors = response.sampleSectors.map((sampleSector) => ({
                            id: sampleSector.id,
                            description: sampleSector.description,
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getDataSampleSizes() {
                GlobalService.getData("/company/list-sample-sizes")
                    .then((response) => {
                        this.sampleSizes = response.sampleSizes.map((sampleSize) => ({
                            id: sampleSize.id,
                            description: sampleSize.description,
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            createCompany(createdCompany) {
                GlobalService.createData("/company/create-company", createdCompany)
                    .then((response) => {
                        this.toast.success(response.data.msg);
                        this.rows = response.data.companies.map((company) => ({
                            id: company.id,
                            code: company.code,
                            name: company.name,
                            sampleLocation: company.sampleLocation,
                            floorNumber: company.floorNumber,
                            street: company.street,
                            city: company.city,
                            state:company.state,
                            phoneNumberOne: company.phoneNumberOne,
                            phoneNumberSecond: company.phoneNumberSecond,
                            faxNumber: company.faxNumber,
                            preferenceNumber: company.preferenceNumber,
                            emailAddress: company.emailAddress,
                            sampleSectorId: company.sampleSectorId,
                            sampleSizeId: company.sampleSizeId,
                            panelId: company.panelId
                        }));
                        this.closeCreateCompanyModal()
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
                    });
            },
            updateCompany(companyId, editedCompany) {
                console.log(companyId,editedCompany )
                GlobalService.setData("/company/update-company", companyId, editedCompany)
                    .then((response) => {
                        this.toast.success(response.msg);
                        this.rows = response.companies.map((company) => ({
                            id: company.id,
                            code: company.code,
                            name: company.name,
                            sampleLocation: company.sampleLocation,
                            floorNumber: company.floorNumber,
                            street: company.street,
                            city: company.city,
                            state:company.state,
                            phoneNumberOne: company.phoneNumberOne,
                            phoneNumberSecond: company.phoneNumberSecond,
                            faxNumber: company.faxNumber,
                            preferenceNumber: company.preferenceNumber,
                            emailAddress: company.emailAddress,
                            sampleSectorId: company.sampleSectorId,
                            sampleSizeId: company.sampleSizeId,
                            panelId: company.panelId
                        }));
                        this.closeUpdateCompanyModal()
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
                    });
            },
            deleteCompany(companyId) {
                console.log(companyId)
                GlobalService.deleteDataById("/company/delete-company", companyId)
                    .then((response) => {
                        this.toast.success(response.msg);
                        this.rows = response.companies.map((company) => ({
                            id: company.id,
                            code: company.code,
                            name: company.name,
                            sampleLocation: company.sampleLocation,
                            floorNumber: company.floorNumber,
                            street: company.street,
                            city: company.city,
                            state:company.state,
                            phoneNumberOne: company.phoneNumberOne,
                            phoneNumberSecond: company.phoneNumberSecond,
                            faxNumber: company.faxNumber,
                            preferenceNumber: company.preferenceNumber,
                            emailAddress: company.emailAddress,
                            sampleSectorId: company.sampleSectorId,
                            sampleSizeId: company.sampleSizeId,
                            panelId: company.panelId
                        }));
                        this.closeDeleteCompanyAlert()
                    })
                    .catch((e) => {
                        let errors = e.response.data.errors;
                        let error = e.response.data.error;
                        if (errors) {
                            errors.forEach((error_element) => {
                                this.toast.error(error_element.msg);
                            });
                        } else {
                            this.toast.error(error);
                        }
                    });
            },
            nextCreateModal() {
                this.nextCompanyCreateModal = false;
            },
            returnCreateModal() {
                this.nextCompanyCreateModal = true;
            },
            nextUpdateModal() {
                this.nextCompanyUpdateModal = false;
            },
            returnUpdateModal() {
                this.nextCompanyUpdateModal = true;
            },
        },
    };
</script>

<style>
</style>