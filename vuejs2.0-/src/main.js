// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
import Vueresource from 'vue-resource'
// import router from './router'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(Vueresource)
// var eventHub = new Vue()

Vue.config.productionTip = false
// let app=Vue.extend(App)
// let router =new VueRouter()
// router.map({
//     '/goods':{
//       components:goods
//     }
// })

// router.start(app,'#app')

// const routes = [
//     { path: '/goods', component: goods },
//     { path: '/ratings', component: ratings },
//     { path: '/seller', component: seller }
// ]
const router = new VueRouter({
    routes:[
        { path: '/goods', component: goods },
        { path: '/ratings', component: ratings },
        { path: '/seller', component: seller },
        { path: '/', component: goods }
    ] // （缩写）相当于 routes: routes
})

// router.go('/goods')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data:{
      eventHub: new Vue()
  }
})
