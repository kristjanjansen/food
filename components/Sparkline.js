export default {

    props: {
        width: { default: 100 },
        items: { default: [] },
        filled: { default: false }
    },

    data: () => ({ padding: 10 }),

    computed: {
        height() {
            return this.width / 3
        }
    },

    methods: {
        xScale(index) {
            return d3.scaleLinear()
                .domain([0, this.items[0].values.length - 1])
                .range([this.padding, this.width - this.padding])
                (index)
        },
        yScale(value) {
            return d3.scaleLinear()
                //.domain(d3.extent(d3.merge(this.items.map(item => item.values))))
                .domain([0,150000])
                .range([this.height - this.padding, this.padding])
                (value)
        },
        line(items) {
            return d3.line()
                .x((d, index) => this.xScale(index))
                .y(d => this.yScale(d))
                .defined(d => d > 0)
                (items)
        },
        area(items) {
            return d3.area()
                .x((d, index) => this.xScale(index))
                .y1(d => this.yScale(d))
                .y0(d => this.yScale(0))
                .defined(d => d > 0)
                (items)
        },
        lastChange(item) {
            const last = item.values.length - 1
            return item.values[last] - item.values[last - 1]
        },
        color(value) {
            return d3.scaleLinear()
                .domain([-20,20])
                .range(['#F79824','#74A500'])
                (value)
        },
    },
    template: `
    <svg :width="width" :height="height">


        <path
            v-if="filled"
            v-for="(item, index) in items"
            :fill="color(lastChange(item))"
            :d="area(item.values)"
            opacity="0.25"
        />

        <path
            v-for="(item, index) in items"
            fill="none"
            stroke-width="2"
            :stroke="color(lastChange(item))"
            stroke-linejoin="round"
            :d="line(item.values)"
            opacity="0.5"
        />

    </svg>
    `
}