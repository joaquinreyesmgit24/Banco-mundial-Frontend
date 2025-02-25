const statistics = ()=>import('./views/Statistics.vue')
const users = ()=>import('./views/Users.vue')
const companies = ()=>import('./views/Companies.vue')
const contact = ()=>import('./views/Contact.vue')
const calls = ()=>import('./views/Calls.vue')


//Survey
const survey_P00 = ()=>import('./views/Survey/Page_00.vue')
const survey_P01 = ()=>import('./views/Survey/Page_01.vue')
const survey_P02 = ()=>import('./views/Survey/Page_02.vue')
const survey_P03 = ()=>import('./views/Survey/Page_03.vue')
const survey_P04 = ()=>import('./views/Survey/Page_04.vue')
const survey_P05 = ()=>import('./views/Survey/Page_05.vue')
const survey_P06 = ()=>import('./views/Survey/Page_06.vue')
const survey_P07 = ()=>import('./views/Survey/Page_07.vue')
const survey_P08 = ()=>import('./views/Survey/Page_08.vue')
const survey_P09 = ()=>import('./views/Survey/Page_09.vue')
const survey_P10 = ()=>import('./views/Survey/Page_10.vue')
const survey_P11 = ()=>import('./views/Survey/Page_11.vue')
const survey_P12 = ()=>import('./views/Survey/Page_12.vue')
const survey_P13 = ()=>import('./views/Survey/Page_13.vue')

const quotas = ()=>import('./views/Quotas.vue')

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
        path: '/contact',
        component: contact,
        name: 'contact',
        meta: {
            title: 'contact',
            menu: 'contact',
            requiredRole: ['Administrador']
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
    
    
    //survey paths
    {
        path: '/survey',
        component: survey_P00,
        meta: {
            title: 'survey',
            menu: 'survey',
            requiredRole: ['Administrador']
        },
        children: [
            { path: '1', component: survey_P01 },
            { path: '2', component: survey_P02 },
            { path: '3', component: survey_P03 },
            { path: '4', component: survey_P04 },
            { path: '5', component: survey_P05 },
            { path: '6', component: survey_P06 },
            { path: '7', component: survey_P07 },
            { path: '8', component: survey_P08 },
            { path: '9', component: survey_P09 },
            { path: '10', component: survey_P10 },
            { path: '11', component: survey_P11 },
            { path: '12', component: survey_P12 },
            { path: '13', component: survey_P13 }
        ]
    }
]