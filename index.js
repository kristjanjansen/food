import Layout from './components/Layout2.js'
import Row from './components/Row.js'
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
    components: { Layout, Row, Popup, Collapsible, Datatable },
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
        calculateSales(products) {
            return products.reduce((prev, current) => {
                return current.sales.map((sale, index) => sale + prev[index])
            }, Array(products[0].sales.length).fill(0))
        },
        salesByKey(products, key) {
            return this.groupFilters
                .filter(f => f.key == key)[0].values
                .map(value => {
                    return this.calculateSales(
                        this.filterProducts(products, { [key]: value })
                    )
                })
        },
        filterProducts(products = [], query) {
            function search(d) {
                return Object.keys(this).every(key => d[key] === this[key])
            }
            return products.filter(search, query)
        }
    },
    computed: {
        groupFilters() {
            return Object.keys(this.groups).map(groupKey => {
                return {
                    key: groupKey,
                    // Converting values to Set and back to array
                    // makes the values unique
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
        
        <div v-if="!products.length">Loading</div>
        
        <div v-if="products.length">
            
            <Row v-for="groupKey in Object.keys(this.groups)"
                :group-key="groupKey"
                :key="groupKey"
                :groups="groups"
                :filters="groupFilters"
                :data="salesByKey(products, groupKey)"
                :xlabels="xlabels"
                :ylabels="groupFilters.filter(f => f.key === groupKey)[0].values"
                :max="maxSales"
            />

            <Collapsible>
                <Datatable :data="products" />
            </Collapsible>
        </div>

    </div>
    
    <div slot="modal">
        <Popup />
    </div>

    </Layout>
    `,
    css: `
        .title {
            font-size: 1.5rem;
            margin: 2rem 0 1.5rem 0;
        }
        .title:first-child {
            margin-top: 0;
        }
        .subtitle {
            color: rgba(0,0,0,0.5);
            font-size: 1rem;
            margin-bottom: 2rem;
        }
    `
})
