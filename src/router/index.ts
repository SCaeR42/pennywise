import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Transactions from '@/pages/Transactions.vue'
import TransactionNew from '@/pages/TransactionNew.vue'
import TransactionEdit from '@/pages/TransactionEdit.vue'
import Categories from '@/pages/Categories.vue'
import Accounts from '@/pages/Accounts.vue'
import TagsPage from '@/pages/Tags.vue'
import Settings from '@/pages/Settings.vue'
import NotFound from '@/pages/NotFound.vue'
import TestUi from '@/pages/TestUi.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/testui',
        name: '/TestUi',
        component: TestUi
    },
    {
        path: '/',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/app',
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                redirect: '/app/dashboard'
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: 'transactions',
                name: 'Transactions',
                component: Transactions
            },
            {
                path: 'transactions/new',
                name: 'TransactionNew',
                component: TransactionNew
            },
            {
                path: 'transactions/:id/edit',
                name: 'TransactionEdit',
                component: TransactionEdit
            },
            {
                path: 'categories',
                name: 'Categories',
                component: Categories
            },
            {
                path: 'accounts',
                name: 'Accounts',
                component: Accounts
            },
            {
                path: 'tags',
                name: 'Tags',
                component: TagsPage
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
