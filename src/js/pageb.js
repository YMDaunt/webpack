import Vue from 'vue'

import '../css/pageb.less'

new Vue({
    el: '#appb',
    data: {
        x: 1,
    },
    created() {
        setInterval(()=> {
            this.x ++
        }, 500)
    }
})