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
            },
            {
                path: '/iframePage',
                name: 'IframePage',
                component: () => import('../views/components/IframePage.vue')
            },
			{
			    path: '/report/creditEvaluate',
			    name: 'CreditEvaluate',
			    component: () => import('../views/report/CreditEvaluate.vue')
			},
			{
				path:'/report/riskScreen',
				name:'RiskScreen',
				component: () => import('../views/report/RiskScreen.vue')
			},
			{
				path:'/report/cityInvEvaluate',
				name:'CityInvEvaluate',
				component: () => import('../views/report/CityInvEvaluate.vue')
			},
			{
				path:'/report/areaCreditEvaluate',
				name:'AreaCreditEvaluate',
				component: () => import('../views/report/AreaCreditEvaluate.vue')
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
