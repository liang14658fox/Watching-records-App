import Vue from 'vue'
import VueRouter from 'vue-router'

import card_container from '@/view/forward_list/card_container.vue'

import movieCardNew from '@/view/moive/watch_list/movieCardNew.vue'
import Marvel from '@/view/moive/series/Marvel.vue'

import collect from '@/view/moive/collect/index.vue'
import moive_dag from '@/view/moive/moive_dag/index.vue'
import moive_list from '@/view/moive/moive_list/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/movieCardNew',
            component: movieCardNew,
            props: true
        }, {
            path: '/Marvel',
            component: Marvel,
            props: true
        }, {
            path: '/card_container',
            component: card_container,
            props: true
        }, {
            path: '/collect',
            component: collect,
            props: true
        }, {
            path: '/moive_dag',
            component: moive_dag,
            props: true
        }, {
            path: '/moive_list',
            component: moive_list,
            props: true
        },
    ]
})

export default router
