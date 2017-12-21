import Sparkline from './Sparkline.js'

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
                    {{ row[key] }}
                </td>
                <td v-for="sale in row.sales">
                    {{ sale }}
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
            font-face: Cousine, monospace;
            font-size: 0.8em;
        }
        th {
            text-align: left;
            padding: 0.25rem 1rem 0.25rem 0;
            color: rgba(0,0,0,0.3);
            text-transform: capitalize;
        }
        tr {
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        td {
            padding: 0.15rem 0.5rem 0.15rem 0.25rem;
            color: rgba(0,0,0,0.5);
        }
    `
}