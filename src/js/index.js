import Vue from 'vue'
import { getInfo } from '../js/common/common.js'
console.log(getInfo)

import '../css/index.less'

new Vue({
    el: '#app',
    data: {
        x: 1,
        userMes: {},
    },
    created() {
        setInterval(()=> {
            this.x ++
        }, 500)
        this.userMes = getInfo()
    }
})