<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">A.7b	¿Es este establecimiento la ubicación de la sede central?</label>
            <div class="flex items-center">
                <input id="Si" name="A7B" type="radio" value="1" v-model="A7B_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="Si" class="ml-3 block text-sm font-medium text-gray-700">Sí</label>
            </div>
            <div class="flex items-center">
                <input id="No" name="A7B" type="radio" value="2" v-model="A7B_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="No" class="ml-3 block text-sm font-medium text-gray-700">No</label>
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
            A7B_val: '',
        };
    },
    mounted() {
    },
}
</script>