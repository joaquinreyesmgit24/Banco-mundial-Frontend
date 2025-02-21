<template>
    <div class="flex justify-center">
        <form class="space-y-4 text-center">
            <label class="block text-gray-700 text-sm font-bold mb-2">S.12. INFORMACIÓN DE LA CITA:</label>
            <label class="block text-gray-700 text-sm mb-2">Nos gustaría programar una cita para una entrevista. El propósito de esta encuesta es comprender mejor las condiciones de las empresas privadas y cómo afectan la productividad y el crecimiento. Sus respuestas y las de otros líderes empresariales ayudarán a diseñar nuevas políticas y programas para mejorar el entorno empresarial. Toda la información que proporcione será anónima y ni su nombre ni el nombre de su establecimiento se utilizarán en ningún documento basado en esta encuesta. Si lo desea, puede ver los resultados de encuestas anteriores y el tipo de indicadores generados a partir de estos datos visitando el sitio web del Banco Mundial: <a href="http://www.enterprisesurveys.org/" target="_blank">http://www.enterprisesurveys.org/</a></label>
            
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="fechaC">FECHA DE LA CITA:</label>
                <input type="date" id="fechaC" v-model="fechaC" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="horaC">HORA:</label>
                <input type="time" id="horaC" v-model="horaC" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="nombreE">NOMBRE DEL ENTREVISTADO:</label>
                <input type="text" id="nombreE" v-model="nombreE" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre">
            </div>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="cargoE">CARGO DEL ENTREVISTADO:</label>
                <input type="text" id="cargoE" v-model="cargoE" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Cargo">
            </div>

            <div class="flex justify-center">
                <button type="submit" class="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Siguiente</button>
            </div>
        </form>
        <!-- <p>fecha: {{ fechaC }} / hora: {{ horaC }} / nom: {{ nombreE }} / cargo: {{ cargoE }}</p> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            fechaC: '',
            horaC: '',
            nombreE: '',
            cargoE: '',
        };
    },
    mounted() {
    },
}
</script>