import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'

let app = createApp(App)


const whiteList = ['/', '/auth/login']

router.beforeEach((to, from, next) => {
    document.title = 'Hyperf IM | ' + to.meta.title
    if (whiteList.includes(to.path) || localStorage.getItem('token')) {
        next()
    }else {
        next('/')
    }
})


app.use(router)
app.use(naive)
app.mount('#app')
