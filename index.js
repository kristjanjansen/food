import Layout from './components/Layout.js'
import StackedBar from './components/StackedBar.js'
import Popup from './components/Popup.js'
import Collapsible from './components/Collapsible.js'
import Datatable from './components/Datatable.js'

import injectCss from './utils/injectCss.js'

import xlabels from './utils/xlabels.js'

Vue.prototype.$bus = new Vue()

Vue.mixin(injectCss)

new Vue({
    el: '#app',
    components: { Layout, StackedBar, Popup, Collapsible, Datatable },
    mounted() {
    },
    data: () => ({
        xlabels
    }),
    template: `
    <Layout>
        <div slot="left">
            left
        </div>
        <div slot="right">
            <Collapsible>
                <Datatable :data="[{first: 1, sales: [2,1]},{first: 3, sales: [1,2]}]" />
            </Collapsible>
            
            <StackedBar
                :data="[[10,10,10],[20,30,20]]"
                :xlabels="xlabels"
                :ylabels="['Maksimarket','Selver']"
                max="40"
            />
        </div>
        <div slot="footer">
            <Popup />
        </div>
    </Layout>
    ` 
})
