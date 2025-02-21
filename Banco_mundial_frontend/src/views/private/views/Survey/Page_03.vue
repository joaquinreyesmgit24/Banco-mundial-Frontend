<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">S.4 Por favor dígame ¿qué actividad representa la mayor proporción de las ventas anuales?</label>
            <div class="flex items-center">
                <input id="fabricacion" name="S4" type="radio" value="1" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="fabricacion" class="ml-3 block text-sm font-medium text-gray-700">Fabricación</label>
            </div>
            <div class="flex items-center">
                <input id="impresion" name="S4" type="radio" value="11" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="impresion" class="ml-3 block text-sm font-medium text-gray-700">Impresión (y reproducción de grabaciones)</label>
            </div>
            <div class="flex items-center">
                <input id="comercio_minorista" name="S4" type="radio" value="2" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="comercio_minorista" class="ml-3 block text-sm font-medium text-gray-700">Comercio minorista</label>
            </div>
            <div class="flex items-center">
                <input id="comercio_mayorista" name="S4" type="radio" value="3" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="comercio_mayorista" class="ml-3 block text-sm font-medium text-gray-700">Comercio mayorista</label>
            </div>
            <div class="flex items-center">
                <input id="construccion" name="S4" type="radio" value="4" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="construccion" class="ml-3 block text-sm font-medium text-gray-700">Construcción</label>
            </div>
            <div class="flex items-center">
                <input id="hotel" name="S4" type="radio" value="51" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="hotel" class="ml-3 block text-sm font-medium text-gray-700">Hotel</label>
            </div>
            <div class="flex items-center">
                <input id="restaurante" name="S4" type="radio" value="52" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="restaurante" class="ml-3 block text-sm font-medium text-gray-700">Restaurante</label>
            </div>
            <div class="flex items-center">
                <input id="transporte" name="S4" type="radio" value="61" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="transporte" class="ml-3 block text-sm font-medium text-gray-700">Transporte, almacenamiento, servicios de mensajería</label>
            </div>
            <div class="flex items-center">
                <input id="publicacion" name="S4" type="radio" value="62" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="publicacion" class="ml-3 block text-sm font-medium text-gray-700">Actividades de publicación</label>
            </div>
            <div class="flex items-center">
                <input id="telecomunicaciones" name="S4" type="radio" value="63" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="telecomunicaciones" class="ml-3 block text-sm font-medium text-gray-700">Telecomunicaciones, programación informática</label>
            </div>
            <div class="flex items-center">
                <input id="servicios_profesionales" name="S4" type="radio" value="64" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="servicios_profesionales" class="ml-3 block text-sm font-medium text-gray-700">Servicios profesionales legales, de arquitectura, publicidad, veterinaria u otros</label>
            </div>
            <div class="flex items-center">
                <input id="reparacion" name="S4" type="radio" value="65" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="reparacion" class="ml-3 block text-sm font-medium text-gray-700">Reparación de computadores o artículos del hogar</label>
            </div>
            <div class="flex items-center">
                <input id="agencia_viajes" name="S4" type="radio" value="66" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="agencia_viajes" class="ml-3 block text-sm font-medium text-gray-700">Agencia de viajes u operador de tures</label>
            </div>
            <div class="flex items-center">
                <input id="ninguno" name="S4" type="radio" value="-9" v-model="S4_val" class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500">
                <label for="ninguno" class="ml-3 block text-sm font-medium text-gray-700">NINGUNO DE LOS ANTERIORES</label>
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
            S4_val: '',
        };
    },
    mounted() {
    },
}
</script>