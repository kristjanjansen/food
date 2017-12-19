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
        activeFilters: {
            supplier: null,
            brand: null,
            product: null,
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
            if (products.length) {
                return products.reduce((prev, current) => {
                    return current.sales.map((sale, index) => sale + prev[index])
                }, Array(products[0].sales.length).fill(0))
            }
            return Array(this.products[0].sales.length).fill(0)
        },
        salesByKey(products, key) {
            return this.filters
                .filter(f => f.key == key)[0].values
                .map(value => {
                    return this.calculateSales(
                        this.filterProducts(products, { [key]: value })
                    )
                })
        },
        filterProducts(products, query) {
            function search(d) {
                return Object.keys(this).every(key => d[key] == this[key])
            }
            return products.filter(search, query)
        },
        onFilter({key, value}) {
            if (this.activeFilters[key] == value) {
                this.activeFilters[key] = null
            } else {
                this.activeFilters[key] = value
            }
        },
        maxSales(products) {
            return Math.max(...this.calculateSales(products))
        },
    },
    computed: {
        filters() {
            return Object.keys(this.activeFilters).map(filterKey => {
                return {
                    key: filterKey,
                    // Converting values to Set and back to array
                    // makes the values unique
                    values: [...new Set(this.products.map(p => p[filterKey]))],
                }
            })
        },
        filteredProducts() {
            const query = Object.keys(this.activeFilters)
                .filter(key => this.activeFilters[key])
                .reduce((object, key) => {
                    object[key] = this.activeFilters[key]
                    return object
                }, {})
            return this.filterProducts(this.products, query)
        },
    },
    template: `
    <Layout>
        
    <div slot="main">
        
        <div v-if="!products.length" class="title">Loading...</div>
        
        <div v-if="products.length">
            
            <Row v-for="(filterKey, filterIndex) in Object.keys(this.activeFilters)"
                :filter-key="filterKey"
                :key="filterKey"
                :active-filters="activeFilters"
                :filters="filters"
                :data="salesByKey(filteredProducts, filterKey)"
                :xlabels="xlabels"
                :ylabels="filters.filter(f => f.key === filterKey)[0].values"
                :max="maxSales(filterIndex == 0 ? products : filteredProducts)"
                @filter="onFilter"
            />

            <Collapsible>
                <Datatable :data="filteredProducts" />
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
            margin: 2rem 0 1.5rem 0.5rem;
            text-transform: capitalize;
        }
        .subtitle {
            color: rgba(0,0,0,0.5);
            font-size: 1rem;
            margin-bottom: 2rem;
        }
    `
})
