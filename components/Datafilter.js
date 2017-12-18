export default {
    props: ['values', 'inline', 'colors'],
    data: () => ({ activeValue: null }),
    methods: {
        onFilter(value) {
            this.activeValue = value
            this.$emit('filter', value)
        },
        onClear() {
            this.activeValue = null
            this.$emit('filter', null)
        }
    },
    template: `
        <div
            :style="{
                display: inline ? 'flex' : 'block',
                'margin-right': '1rem'
            }"
        >
            <div
                v-for="(value,i) in values"
                :style="{
                    padding: '0.3rem',
                    background: value === activeValue ? 'rgba(0,0,0,0.05)' : '',
                    cursor: 'pointer',
                    display: 'flex',
                    'justify-content': 'space-between',
                    color: '#888'
                }"
            >
                <span @click="onFilter(value)">
                    <span v-if="colors" :style="{color: colors[i] }">⬤</span>
                    {{ value }}
                </span>
                <span
                    v-show="value === activeValue"
                    @click="onClear"
                    :style="{ padding: '0 0.5rem 0 1rem' }"
                >×</span>
            </div>
        </div>
    `
}