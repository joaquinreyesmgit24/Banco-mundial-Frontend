const statistics = () => import('./views/Statistics.vue')
const users = () => import('./views/Users.vue')
const companies = () => import('./views/Companies.vue')
const contact = () => import('./views/Contact.vue')
const calls = () => import('./views/Calls.vue')
const rescheduled = () => import('./views/Rescheduled.vue')
import { useRoute } from 'vue-router';
import { defineAsyncComponent, h,  watchEffect, ref } from 'vue';

const surveyComponents = {
    1: defineAsyncComponent(() => import('./views/Survey/Page_01.vue')),
    2: defineAsyncComponent(() => import('./views/Survey/Page_02.vue')),
    3: defineAsyncComponent(() => import('./views/Survey/Page_03.vue')),
    4: defineAsyncComponent(() => import('./views/Survey/Page_04.vue')),
    5: defineAsyncComponent(() => import('./views/Survey/Page_05.vue')),
    6: defineAsyncComponent(() => import('./views/Survey/Page_06.vue')),
    7: defineAsyncComponent(() => import('./views/Survey/Page_07.vue')),
    8: defineAsyncComponent(() => import('./views/Survey/Page_08.vue')),
    9: defineAsyncComponent(() => import('./views/Survey/Page_09.vue')),
    10: defineAsyncComponent(() => import('./views/Survey/Page_10.vue')),
    11: defineAsyncComponent(() => import('./views/Survey/Page_11.vue')),
    12: defineAsyncComponent(() => import('./views/Survey/Page_12.vue')),
    13: defineAsyncComponent(() => import('./views/Survey/Page_13.vue')),

};



const quotas = () => import('./views/Quotas.vue')

export const PrivateRoutes = [
    {
        path: '',
        redirect: '/statistics',
    },
    {
        path: '/statistics',
        component: statistics,
        name: 'statistics',
        meta: {
            title: 'statistics',
            menu: 'statistics',
            requiredRole: ['Administrador']
        }
    },
    {
        path: '/users',
        component: users,
        name: 'users',
        meta: {
            title: 'users',
            menu: 'users',
            requiredRole: ['Administrador']
        }
    },
    {
        path: '/companies',
        component: companies,
        name: 'companies',
        meta: {
            title: 'companies',
            menu: 'companies',
            requiredRole: ['Administrador']
        }
    },
    {
        path: '/contact/:companyId?',
        component: contact,
        name:'contact',
        props:true,
        children: [
            {
                path: 'survey/:page',
                component: {
                    setup() {
                        const route = useRoute();
                        const currentComponent = ref(surveyComponents[1]); // Estado reactivo del componente
    
                        // Función reactiva para cambiar el componente cuando cambia la URL
                        watchEffect(() => {
                            const pageNum = Number(route.params.page) || 1;
                            currentComponent.value = surveyComponents[pageNum] || surveyComponents[1];
                        });
    
                        return () => h(currentComponent.value);
                    }
                }
            }
        ],
        meta: {
            title: 'contact',
            menu: 'contact',
            requiredRole: ['Contactador']
        }
    },    
    {
        path: '/quotas',
        component: quotas,
        name: 'quotas',
        meta: {
            title: 'quotas',
            menu: 'quotas',
            requiredRole: ['Administrador']
        }
    },
    {
        path: '/calls',
        component: calls,
        name: 'calls',
        meta: {
            title: 'calls',
            menu: 'calls',
            requiredRole: ['Administrador']
        }
    },
    {
        path: '/rescheduled',
        component: rescheduled,
        name: 'rescheduled',
        meta: {
            title: 'rescheduled',
            menu: 'rescheduled',
            requiredRole: ['Contactador']
        }
    },
]