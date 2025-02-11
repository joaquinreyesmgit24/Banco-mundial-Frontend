const statistics = ()=>import('./views/Statistics.vue')
const users = ()=>import('./views/Users.vue')
const companies = ()=>import('./views/Companies.vue')
const contact = ()=>import('./views/Contact.vue')


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
]