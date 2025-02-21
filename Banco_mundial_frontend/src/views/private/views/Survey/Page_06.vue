<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7a	¿Cuántos establecimientos forman parte de la empresa?</label>
            <div class="flex items-center">
                <input id="nro" name="A7A" type="radio" value="1" v-model="A7A_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="nro" class="ml-3 block text-sm font-medium text-gray-700">Número de establecimientos:</label>
            </div>
            <div class="flex items-center" v-if="A7A_val == '1'">
                <input type="number" id="A7A_cantidad" class="form-input mt-1 block w-full" v-model="A7A_cant_val" placeholder="0"/>
            </div>
            <div class="flex items-center">
                <input id="NS" name="A7A" type="radio" value="-9" v-model="A7A_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="NS" class="ml-3 block text-sm font-medium text-gray-700"><span class="text-blue-500">NO SABE (ESPONTÁNEO)</span></label>
            </div>
            <div class="flex justify-center">
                <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Siguiente</button>
            </div>
        </form>
        <!-- <p>1= {{ A7A_val }} / 2= {{ A7A_cant_val }}</p> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            A7A_val: '',
            A7A_cant_val: '',
        };
    },
    mounted() {
    },
}
</script>