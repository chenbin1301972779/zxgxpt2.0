import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/',
                name: 'HomePage',
                component: () => import('../views/HomePage.vue')
            },
            {
                path: '/userManage',
                name: 'UserManage',
                component: () => import('../views/UserManage.vue')
            },
            {
                path: '/essInfo',
                name: 'EssInfo',
                component: () => import('../views/EssInfo.vue')
            }
        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
