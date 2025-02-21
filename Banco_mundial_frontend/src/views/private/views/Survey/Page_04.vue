<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">S.7 ¿Cuántos trabajadores tiene este establecimiento?</label>
            <label class="block text-gray-700 text-sm mb-2">Número de trabajadores:</label>
            <div class="flex items-center">
                <!-- <label class="block text-gray-700 text-sm mb-2">Número de trabajadores:</label> -->
                <input type="number" id="S7" class="form-input mt-1 block w-full" placeholder="0" v-model="S7_val"/>
            </div>
            <div class="flex justify-center">
                <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Siguiente</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            S7_val: '',
        };
    },
    mounted() {
    },
}
</script>