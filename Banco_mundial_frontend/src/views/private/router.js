const statistics = ()=>import('./views/Statistics.vue')
const users = ()=>import('./views/Users.vue')
const companies = ()=>import('./views/Companies.vue')
const contact = ()=>import('./views/Contact.vue')

//Survey
const survey_P00 = ()=>import('./views/Survey/Page_00.vue')
const survey_P01 = ()=>import('./views/Survey/Page_01.vue')
const survey_P02 = ()=>import('./views/Survey/Page_02.vue')
const survey_P03 = ()=>import('./views/Survey/Page_03.vue')


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
    
    
    //survey paths
    {
        path: '/survey',
        component: survey_P00, // Un contenedor si es necesario
        meta: {
            title: 'survey',
            menu: 'survey',
            requiredRole: ['Administrador']
        },
        children: [
            {
                path: '1',
                component: survey_P01
            },
            {
                path: '2',
                component: survey_P02
            },
            {
                path: '3',
                component: survey_P03
            }
        ]
    }
]