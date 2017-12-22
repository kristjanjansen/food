import Layout from './components/Layout.js'
import Row from './components/Row.js'
import Popup from './components/Popup.js'
import Search from './components/Search.js'
import Btn from './components/Btn.js'
import Toolbar from './components/Toolbar.js'
import Loading from './components/Loading.js'
import Datatable from './components/Datatable.js'

import injectCss from './utils/injectCss.js'
import prepareData from './utils/prepareData.js'
import xlabelValues from './utils/xlabelValues.js'
import getColors from './utils/getColors.js'

Vue.prototype.$bus = new Vue()

Vue.mixin(injectCss)

new Vue({
    el: '#app',
    components: { Layout, Row, Popup, Datatable, Search, Btn, Toolbar, Loading },
    mounted() {
        Papa.parse('./products.csv', {
            download: true,
            header: true,
            step: row => { this.initialProducts.push(prepareData(row.data[0])) }
        })
    },
    data: () => ({
        initialProducts: [],
        monthRanges: [
            { title: 'Last week', value: 2 },
            { title: 'Last 4 weeks', value: 4 },
            { title: 'Last 27 weeks', value: 27 },
            { title: 'Last 54 weeks', value: 54 },
        ],
        activeMonthRange: 2,
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
        xlabelValues,
        showTables: false,
        showTrendline: false,
        showRelative: false
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
        focusIndex(filterKey) {
            if (this.activeFilters[filterKey]) {
                return this.filters
                    .filter(f => f.key == filterKey)[0].values
                    .findIndex(v => v == this.activeFilters[filterKey])
            }
            return -1
        },
        ylabels(filterKey) {
            return this.filters
                .filter(f => f.key === filterKey)[0]
                .values
        },
        onRange(value) {
            this.activeMonthRange = value
        },
    },
    computed: {
        filters() {
            return Object.keys(this.activeFilters).map((filterKey, filterIndex) => {
                // Converting values to Set and back to array
                // makes the values unique
                const values = [...new Set(this.products.map(p => p[filterKey]))]
                

                return {
                    key: filterKey,
                    values: values,
                    colors: getColors(filterIndex, values.length)
                }
            })
        },
        products() {
            return this.initialProducts.map(product => {
                product.sales = product.s.slice(this.monthRanges[this.activeMonthRange].value * -1)
                return product
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
        xlabels() {
            return this.xlabelValues
                .slice(this.monthRanges[this.activeMonthRange].value * -1)
        },
        tableProducts() {
            return this.filteredProducts.map(p => {
                const product = {}
                Object.keys(this.activeFilters).forEach(key => {
                    product[key] = p[key]
                })
                product.sales = p.sales
                return product
            })
            .slice(0, 500)
        }
    },
    template: `
    <Layout>

    <div slot="main">
        
        <Loading v-if="!products.length && !showTables" />

        <Toolbar v-if="products.length">
            <div slot="left">
                <Search
                    title="Search"
                />
            </div>
            <div slot="center">
                <Btn
                    v-for="(range, index) in monthRanges"
                    :key="index"
                    :title="range.title"
                    @click.native="activeMonthRange = index"
                    :active="activeMonthRange == index"
                />
            </div>
            <div slot="center" v-if="!showTables">
                <Btn
                    :title="showTrendline ? 'Hide trendline' : 'Show trendline'"
                    @click.native="showTrendline = !showTrendline; $bus.$emit('showTrendline', showTrendline)"
                    :active="true"
                />
                <Btn
                    :title="showRelative ? 'Show absolute change' : 'Show relative change'"
                    @click.native="showRelative = !showRelative; $bus.$emit('showRelative', showRelative)"
                    :active="true"
                />       
                <Btn
                    :title="showTables ? 'Show in graphs' : 'Show in table'"
                    :active="true"
                    @click.native="showTables = !showTables"
                />
            </div>
        </Toolbar>
        
        <div v-if="products.length && !showTables">
            
            <Row v-for="(filterKey, filterIndex) in Object.keys(this.activeFilters)"
                :filter-key="filterKey"
                :key="filterKey"
                :active-filters="activeFilters"
                :filters="filters"
                :data="salesByKey(filteredProducts, filterKey)"
                :max="maxSales(filteredProducts)"
                :focus-index="-1"
                :xlabels="xlabels"
                :ylabels="ylabels(filterKey)"
                @filter="onFilter"
            />

        </div>

        <Datatable v-if="products.length && showTables" :data="tableProducts" />

    </div>
    
    <div slot="modal">
        <Popup />
    </div>

    </Layout>
    `,
})
