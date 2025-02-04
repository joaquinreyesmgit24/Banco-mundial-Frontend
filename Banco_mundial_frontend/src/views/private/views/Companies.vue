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
                            <h3 class="text-lg font-medium">¿Estás seguro que deseas eliminar a la empresa {{userDeleted.username}}?</h3>
                        </div>
                        <div class="mt-2 mb-4 text-sm">
                            Este elemento se eliminará permanentemente. Esta acción no se puede revertir.
                        </div>
                        <div class="flex">
                            <button @click="deleteUser(this.userDeleted.id)" type="button"
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
                        <form @submit.prevent="updateUser(editedUser.id, editedUser)" class="p-4 md:p-5">
                            <div v-show="nextCompanyUpdateModal" class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Id:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de casa/piso/puerta:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Calle:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Ciudad:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Estado/provincia:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 1:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
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
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 2:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de preferencia:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de fax:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Dirección de correo electrónico:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="role"
                                        class="block mb-2 text-sm font-medium text-gray-900">Sector de la muestra:</label>
                                    <select id="role"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedUser.roleId">
                                        <option value="" disabled selected>
                                            Seleccionar rol
                                        </option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-1">
                                    <label for="role"
                                        class="block mb-2 text-sm font-medium text-gray-900">Tamaño de la muestra:</label>
                                    <select id="role"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedUser.roleId">
                                        <option value="" disabled selected>
                                            Seleccionar rol
                                        </option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Ubicación de la muestra:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="role"
                                        class="block mb-2 text-sm font-medium text-gray-900">Panel de la muestra:</label>
                                    <select id="role"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedUser.roleId">
                                        <option value="" disabled selected>
                                            Seleccionar rol
                                        </option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
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
                        <form @submit.prevent="updateUser(editedUser.id, editedUser)" class="p-4 md:p-5">
                            <div v-show="nextCompanyCreateModal" class="grid gap-2 mb-4 grid-cols-2">
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Id:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Nombre:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de casa/piso/puerta:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Calle:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Ciudad:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Estado/provincia:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 1:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
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
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de teléfono 2:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de preferencia:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Número de fax:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Dirección de correo electrónico:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="role"
                                        class="block mb-2 text-sm font-medium text-gray-900">Sector de la muestra:</label>
                                    <select id="role"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedUser.roleId">
                                        <option value="" disabled selected>
                                            Seleccionar rol
                                        </option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-1">
                                    <label for="role"
                                        class="block mb-2 text-sm font-medium text-gray-900">Tamaño de la muestra:</label>
                                    <select id="role"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedUser.roleId">
                                        <option value="" disabled selected>
                                            Seleccionar rol
                                        </option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
                                        </option>
                                    </select>
                                </div>
                                <div class="col-span-2">
                                    <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Ubicación de la muestra:</label>
                                    <input type="text" name="username" id="username"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        placeholder="Nombre de usuario" v-model.trim="editedUser.username" />
                                </div> 
                                <div class="col-span-1">
                                    <label for="role"
                                        class="block mb-2 text-sm font-medium text-gray-900">Panel de la muestra:</label>
                                    <select id="role"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 placeholder-gray-400 focus:ring-primary-500"
                                        v-model="editedUser.roleId">
                                        <option value="" disabled selected>
                                            Seleccionar rol
                                        </option>
                                        <option v-for="role in roles" :key="role.id" :value="role.id">
                                            {{ role.name }}
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
                        label: "Nombre de usuario",
                        field: "username",
                    },
                    {
                        label: "Rol",
                        field: "role",
                    },
                    {
                        label: "Fecha de creación",
                        field: "date",
                        type: "date",
                        dateInputFormat: "dd-MM-yyyy HH:mm:ss",
                        dateOutputFormat: "dd-MM-yyyy",
                    },
                    {
                        label: "Estado",
                        field: "status",
                    },
                    {
                        label: "Acciones",
                        field: "acciones",
                        type: "slots",
                    },
                ],
                rows: [],
                roles: [],
                editedUser: {
                    id:"",
                    username: "",
                    password: "",
                    repeat_password: "",
                    roleId: "",
                    file:null,
                    status: "",
                },
                createdUser: {
                    username: "",
                    password: "",
                    repeat_password: "",
                    roleId: "",
                    file:null,
                    status: false,
                },
                userDeleted:{
                    id:"",
                    username: "",
                    password: "",
                    repeat_password: "",
                    roleId: "",
                    status: "",
                }
                
            };
        },
        mounted() {
            this.getDataUsers();
            this.getDataRoles();
        },
        methods: {
            openUpdateCompanyModal(item) {
                this.editedUser = { ...item, roleId: item.role.id,file:'', password: '', repeat_password: '' };
                this.showCompanyUpdateModal = true;
                if (item.status === "Activo") {
                    this.editedUser.status = true;
                } else {
                    this.editedUser.status = false;
                }
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
                this.userDeleted={...item}
                this.showCompanyDeleteAlert = true;
            },
            closeDeleteCompanyAlert(){
                this.showCompanyDeleteAlert = false;
            },
            getDataUsers() {
                GlobalService.getData("/auth/list-users")
                    .then((response) => {
                        this.rows = response.users.map((user) => ({
                            id: user.id,
                            username: user.username,
                            role: user.role,
                            date: dayjs(user.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                            status: user.status ? "Activo" : "Inactivo",
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            getDataRoles() {
                GlobalService.getData("/auth/list-roles")
                    .then((response) => {
                        this.roles = response.roles.map((role) => ({
                            id: role.id,
                            name: role.name,
                        }));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            createUser(createdUser) {
                const formData = new FormData();
                formData.append('username', createdUser.username)
                formData.append('password', createdUser.password)
                formData.append('repeat_password', createdUser.repeat_password)
                formData.append('roleId', createdUser.roleId)
                formData.append('status', createdUser.status)
                if (createdUser.file) {
                    formData.append('file', createdUser.file);
                }
                GlobalService.createDataImage("/auth/create-user", formData)
                    .then((response) => {
                        this.toast.success(response.data.msg);
                        this.rows = response.data.users.map((user) => ({
                            id: user.id,
                            username: user.username,
                            role: user.role,
                            date: dayjs(user.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                            status: user.status ? "Activo" : "Inactivo",
                        }));
                        this.closeCreateUserModal()
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
            updateUser(userId, editedUser) {
                const formData = new FormData();
                formData.append('username', editedUser.username)
                formData.append('password', editedUser.password)
                formData.append('repeat_password', editedUser.repeat_password)
                formData.append('roleId', editedUser.roleId)
                formData.append('status', editedUser.status)
                if(editedUser.file){
                    formData.append('file', editedUser.file);
                }
                GlobalService.setDataImage("/auth/update-user", userId, formData)
                    .then((response) => {
                        console.log(editedUser)
                        this.toast.success(response.msg);
                        this.rows = response.users.map((user) => ({
                            id: user.id,
                            username: user.username,
                            role: user.role,
                            date: dayjs(user.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                            status: user.status ? "Activo" : "Inactivo",
                        }));
                        this.closeUpdateUserModal()
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
            deleteUser(userId) {
                GlobalService.deleteDataById("/auth/delete-user", userId)
                    .then((response) => {
                        this.toast.success(response.msg);
                        this.rows = response.users.map((user) => ({
                            id: user.id,
                            username: user.username,
                            role: user.role,
                            date: dayjs(user.createdAt).format("DD-MM-YYYY HH:mm:ss"),
                            status: user.status ? "Activo" : "Inactivo",
                        }));
                        this.closeDeleteUserAlert()
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