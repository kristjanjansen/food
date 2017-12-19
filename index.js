import Layout from './components/Layout2.js'
import StackedBar from './components/StackedBar.js'
import Popup from './components/Popup.js'
import Collapsible from './components/Collapsible.js'
import Datatable from './components/Datatable.js'

import injectCss from './utils/injectCss.js'
import xlabels from './utils/xlabels.js'
import prepareData from './utils/prepareData.js'

Vue.prototype.$bus = new Vue()

Vue.mixin(injectCss)

new Vue({
    el: '#app',
    components: { Layout, StackedBar, Popup, Collapsible, Datatable },
    mounted() {
        Papa.parse('./products.csv', {
            download: true,
            header: true,
            step: row => { this.products.push(prepareData(row.data[0])) }
        })
    },
    data: () => ({
        products: [],
        groups: {
            brand: null,
            chain: null,
            location: null,
            type: null,
            texture: null,
            shape: null,
            cut: null,
            packed: null
        },
        xlabels,
    }),
    methods: {
        calculateSales(products = []) {
            if (products.length) {
                return products.reduce((prev, current) => {
                    return current.sales.map((sale, index) => sale + prev[index])
                }, Array(products[0].sales.length).fill(0))
            }
            return []
        },
        salesByKey(products = [], key) {
            if (products.length) {
                return this.groupFilters
                    .filter(f => f.key == key)[0].values
                    .map(value => {
                        return this.calculateSales(
                            this.filterProducts(products, { [key]: value })
                        )
                    })
                }
            return []
        },
        filterProducts(products = [], query) {
            function search(d) {
                return Object.keys(this).every(key => d[key] === this[key])
            }
            return products.filter(search, query)
        },
    },
    computed: {
        groupFilters() {
            return Object.keys(this.groups).map(groupKey => {
                return {
                    key: groupKey,
                    // Converting values to Set and back to array
                    // makes group values unique
                    values: [...new Set(this.products.map(p => p[groupKey]))],
                }
            })
        },
        maxSales() {
            return Math.max(...this.calculateSales(this.products))
        },
    },
    template: `
    <Layout>
        
    <div slot="main">
            
        <div v-for="groupKey in Object.keys(this.groups)">
            <h3>{{ groupKey }}</h3>
            <StackedBar
                v-show="salesByKey(products, groupKey)"
                :data="salesByKey(products, groupKey)"
                :xlabels="xlabels"
                :ylabels="groupFilters.filter(f => f.key === groupKey)[0].values"
                :max="maxSales"
            />
        </div>

        <Collapsible>
            <Datatable :data="products" />
        </Collapsible>
            
            
        </div>

        <div slot="modal">
            <Popup />
        </div>

    </Layout>
    ` 
})
