<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7d <span class="text-blue-500">ENTREVISTE A LA UBICACIÓN QUE REPRESENTA LA MAYOR PROPORCIÓN DE LA PRODUCCIÓN O VENTAS</span></label>
            <div>
                <label for="direccion" class="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                <input id="direccion" type="text" v-model="direccion_val" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ingrese la dirección">
            </div>
            <div>
                <label for="nombreEstab" class="block text-gray-700 text-sm font-bold mb-2">Nombre del establecimiento:</label>
                <input id="nombreEstab" type="text" v-model="nombreEstab_val" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ingrese el nombre del establecimiento">
            </div>
            <div class="flex justify-center">
                <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Siguiente</button>
            </div>
        </form>
        <!-- <p>dir: {{ direccion_val }}/ nom: {{ nombreEstab_val }}</p> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            direccion_val: '',
            nombreEstab_val: '',
        };
    },
    mounted() {
    },
}
</script>