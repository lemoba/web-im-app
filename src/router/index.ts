import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";


declare module 'vue-router'{
    interface RouteMeta {
        title: string
    }
}


const routes:Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'auth',
        redirect: '/auth/login',
        component:()=> import('@/views/auth/layout.vue'),
        children:[
            {
                path: '/auth/login',
                component: () => import('@/views/auth/login.vue'),
                meta: {
                    title: '登录'
                }
            },
            {
                path: '/auth/register',
                component: () => import('@/views/auth/register.vue'),
                meta: {
                    title: '注册账号'
                }
            },
            {
                path: '/auth/forget',
                component: () => import('@/views/auth/forget.vue'),
                meta: {
                    title: '忘记密码'
                }
            },   
        ]
    },   
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router