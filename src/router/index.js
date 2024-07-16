// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import ojHome from '../views/ojHome.vue'
import ojRecentContest from '../views/ojRecentContest.vue'
import ojCFinfo from '../views/ojCFinfo.vue'
import ojContestFeedback from '../views/ojContestFeedback.vue'
import ojContestArrangement from '../views/ojContestArrangement.vue'
import ojRank from '../views/ojRank.vue'
import ojTrain from '../views/ojTrain.vue'
import ojAward from '../views/ojAward.vue'
import ojDataVisualization from '../views/ojDataVisualization'

const routes = [
  {
    path: '/home',
    name: 'ojHome',
    component: ojHome,
  },
  {
    path:'/CFinfo',
    name:'ojCFinfo',
    component:ojCFinfo
  },
  {
    path:'/recentContest',
    name:'ojRecentContest',
    component:ojRecentContest
  },
  {
    path:'/contestFeedback',
    name:'ojContestFeedback',
    component:ojContestFeedback
  },
  {
    path:'/contestArrangement',
    name:'ojContestArrangement',
    component:ojContestArrangement
  },
  {
    path:'/rank',
    name:'obRank',
    component:ojRank
  },
  {
    path:'/train',
    name:'ojTrain',
    component:ojTrain
  },
  {
    path:'/award',
    name:'ojAward',
    component:ojAward
  },
  {
    path:'/dataVisualization',
    name:'ojDataVisualization',
    component:ojDataVisualization
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router
