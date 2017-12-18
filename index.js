import HeadingLeft from './components/HeadingLeft.js'
import Heading from './components/Heading.js'
import StackedBar from './components/StackedBar.js'
import Popup from './components/Popup.js'

import xlabels from './lib/xlabels.js'

Vue.prototype.$bus = new Vue()

new Vue({
    el: '#app',
    mounted() {
        
    },
    data: () => ({
        xlabels
    }),
    methods: {
        onEnter(x, e) {
            this.$bus.$emit('showPopup', { x: e.clientX, y: e.clientY, title: x})
        },
        onMove(x, e) {
            this.$bus.$emit('showPopup', { x: e.clientX, y: e.clientY, title: x})
        },
        onLeave(x, e) {
            this.$bus.$emit('hidePopup')
        },
    },
    components: { Heading, HeadingLeft, StackedBar, Popup },
    template: `
    <div>
        <div style="display: flex">
            <div style="width: 300px; background: #0D1F2D11; height: 200vh">
                <HeadingLeft />
            </div>

            <div style="width: 100%">
                <Heading />
                <div style="padding: 25px">
                        
                    <StackedBar
                        :data="[[10,10,10],[20,30,20]]"
                        :xlabels="xlabels"
                        :ylabels="['Maksimarket','Selver']"
                        max="40"
                    />
                    
                </div>
            </div>

        </div>
        <Popup />
    </div>
    ` 
})