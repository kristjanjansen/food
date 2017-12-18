const round = (value, decimals = 0) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export default {
    props: {
        data: { default: [] },
        width: { default: 500 },
        relative: { default: false },
        padding: { default: 5 },
        colors: { default: () => [] },
        xlabels: { default: () => [] },
        max: { default: null },
    },
    computed: {
        maxValue() {
            function getMax(a){
                return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e))
            }
            if (this.max) {
                return this.max
            }
            if (this.relative) {
                return this.height
            }
            return round(getMax(this.rows))
        },
        height() {
            return this.width / 3
        },
        xScale() {
            return d3.scaleLinear()
                .domain([0,this.rows[0].length - 1])
                .range([this.rows[0].length * 1.5,this.width - (this.rows[0].length * 1.5)])
        },
        yScale() {
            return d3.scaleLinear()
                .domain([0,this.maxValue])
                .range([0,this.height])
        },
        line() {
            return d3.line()
                .x((d, index) => this.xScale(index))
                .y(d =>  this.yScale(d))

        },
        area() {
            return d3.area()
                .x((d, index) => this.xScale(index))
                .y1(d => this.yScale(d))
                .y0(d =>  this.yScale(0))

        },
        rows() {
            return this.data
        },
        defaultColors() {
            return d3.scaleLinear()
                .domain([0,this.columns[0].length - 1])
                .range(['#9B9382','#E2D4B7'])
        },
    },
    template: `
        <div>
            <svg :width="width" :height="height + 50">
                <g :transform="'translate(0,' + height + ') scale(1,-1)'">
                    <path
                        v-for="(row, rowi) in rows"
                        :d="area(row)"
                        :fill="colors.length ? colors[rowi] : defaultColors(rowi)"
                        stroke="none"
                        opacity="0.2"
                    />
                    <path
                        v-for="(row, rowi) in rows"
                        :d="line(row)"
                        opacity="0.25"
                        fill="none"
                        stroke-width="2"
                        :stroke="colors.length ? colors[rowi] : defaultColors(rowi)"
                        stroke-linejoin="round"
                    />
                </g>
            </svg>
        </div>
    `
}