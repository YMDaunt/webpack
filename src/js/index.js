import Vue from 'vue'

import '../css/index.less'

new Vue({
    el: '#app',
    data: {
        x: 1,
    },
    created() {
        setInterval(()=> {
            this.x ++
        }, 500)
    }
})