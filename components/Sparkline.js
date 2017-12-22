export default {
    props: {
        width: { default: 150 },
        data: { default: [] },
        filled: { default: false }
    },
    data: () => ({ padding: 10 }),
    computed: {
        height() {
            return this.width / 4
        }
    },
    methods: {
        xScale(index) {
            return d3.scaleLinear()
                .domain([0, this.data[0].values.length - 1])
                .range([this.padding, this.width - this.padding])
                (index)
        },
        yScale(value) {
            return d3.scaleLinear()
                .domain(d3.extent(d3.merge(this.data.map(d => d.values))))
                .range([this.height - this.padding, this.padding])
                (value)
        },
        line(data) {
            return d3.line()
                .x((d, index) => this.xScale(index))
                .y(d => this.yScale(d))
                .defined(d => d > 0)
                (data)
        },
        area(data) {
            return d3.area()
                .x((d, index) => this.xScale(index))
                .y1(d => this.yScale(d))
                .y0(d => this.yScale(0))
                .defined(d => d > 0)
                (data)
        },
        lastChange(d) {
            const last = d.values.length - 1
            return d.values[last] - d.values[last - 1]
        },
        color(value) {
            return d3.scaleLinear()
                .domain(d3.extent(d3.merge(this.data.map(d => d.values))))
                .range(['gray','gray'])
                (value)
        },
    },
    template: `
        <svg :width="width" :height="height">
            <path
                v-if="filled"
                v-for="(d, index) in data"
                :fill="color(lastChange(d))"
                :d="area(d.values)"
                opacity="0.25"
            />
            <path
                v-for="(d, index) in data"
                fill="none"
                stroke-width="1"
                :stroke="color(lastChange(d))"
                stroke-linejoin="round"
                :d="line(d.values)"
                opacity="0.5"
            />
        </svg>
    `
}