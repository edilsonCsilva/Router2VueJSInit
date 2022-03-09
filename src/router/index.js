import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user',
      name: 'user',
      component: () => import('./../views/About.vue'),
      meta: {
        auth: true,
        Title: 'user center'
      }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('./../views/auth/Login.vue'),
      meta: {
        auth: false
      }
    }
  ]
});

//Route interceptor
router.beforeEach(async (to, from, next) => {
  if( to.matched.some (record =>  record.meta.auth ) &&  to.meta.auth)
   {// determine whether the route needs login permission
    let token = localStorage.getItem('token');
    if (token){
      next()
    }else{
      next({
        path: '/auth/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next();
});

export default router