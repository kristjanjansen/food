import Sparkline from './Sparkline.js'

import { shortenTitle } from '../utils/utils.js'

export default {
    components: { Sparkline },
    props: { data: { default: [{ sales: []}] } },
    data: () => ({ activeId: null }),
    computed: {
        keys() {
            if (this.data[0]) {
                return Object.keys(this.data[0]).filter(key => {
                    return key !== 'sales'
                })
            }
            return []
        }
    },
    methods: {
        shortenTitle
    },
    template: `
     <div class="Datatable">
        <table>
            <tr>
                <th v-for="key in keys">
                    {{ key }}
                </th>
                <th :colspan="data[0].sales.length + 1">Sales</th>
            </tr>
            <tr v-for="row in data">
                <td v-for="key in keys">
                    {{ shortenTitle(row[key]) }}
                </td>
                <td style="max-width: 300px; overflow: scroll;">
                    {{ row.sales.slice(0,4).join(' ') }}...
                </td>
                <td>
                    <Sparkline :filled="true" :data="[{values: row.sales}]" />
                </td>
            </tr>
        </table>
    </div>
    `,
    css: `
        .Datatable {
            padding: 2rem;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            font-family: Cousine, monospace;
            font-size: 0.8em;
        }
        .Datatable th {
            text-align: left;
            padding: 0.25rem 1rem 0.25rem 0;
            color: rgba(0,0,0,0.3);
            text-transform: capitalize;
        }
        .Datatable tr {
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .Datatable td {
            padding: 0.15rem 0.5rem 0.15rem 0.25rem;
            color: rgba(0,0,0,0.5);
        }
    `
}