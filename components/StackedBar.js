const round = (value, decimals = 0) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

export default {
    props: {
        data: { default: [] },
        width: { default: 450 },
        relative: { default: false },
        padding: { default: 5 },
        colors: { default: () => [] },
        colori: { default: 0 },
        xlabels: { default: () => [] },
        ylabels: { default: () => [] },
        max: { default: null },
        focusi: { default: null }
    },
    data: () => ({
        gradientStops: [
            ['#FFA654','#FFDFC1'],
            ['#C48F27','#E8B44C'],
            ['#1C5F93','#59B2F7'],
            ['#2E5266','#CBD0D3'],
            ['#2C1170','#B2ABC6'],
            ['#7A5568','#E2D4B7'],
            ['#C43E3E','#FFC7B5'],
        ]
    }),
    computed: {
        maxValue() {
            // function getMax(a){
            //     return Math.max(...a.map(e => Array.isArray(e) ? getMax(e) : e))
            // }
            return this.relative ? this.height : this.max
        },
        height() {
            return this.width / 2
        },
        xScale() {
            return d3.scaleLinear()
                .domain([0,this.columns.length])
                .range([this.padding,this.width])
        },
        yScale() {
            return d3.scaleLinear()
                .domain([0,this.maxValue])
                .range([0,this.height])
        },
        defaultColors() {
            return d3.scaleLinear()
                .domain([0,this.columns[0].length-1])
                .range(['#9B9382','#E2D4B7'])
        },
        gradients() {
            return this.gradientStops.map(stops => {
                return Array(this.columns[0].length)
                    .fill(0)
                    .map((_,index) => {
                        return d3.scaleLinear()
                            .domain([0,this.columns[0].length - 1])
                            .range(stops)
                            (index)
                    })
            })
        },
        columns() {
            return _.zip(...this.data)
                .map(values => {
                    if (this.relative) {
                        const sum = values.reduce((a, c) => a + c, 0)
                        return values.map(d => round(d / sum * this.height))
                    }
                    return values
                })
                .map(col => col.map((row, i) => {
                    return {
                        y: i > 0 ? col
                            .slice(0, i)
                            .reduce((a, c) => a + c) : 0,
                        height: row
                    }
                }))
        },
        yLabels() {
            if (this.relative) {
                return ['0%', '100%']
            }
            if (this.maxValue > 1000) {
                return ['0',Math.floor(this.maxValue / 1000) + 'k']
            }
            return ['0',this.maxValue]
        }
    },
    methods: {
        onEnter(title, subtitle, subsubtitle, e) {
            this.$bus.$emit('showPopup', {
                x: e.clientX,
                y: e.clientY,
                title,
                subtitle,
                subsubtitle
            })
        },
        onLeave() {
            this.$bus.$emit('hidePopup')
        },
    },
    template: `
        <div>
            <svg :width="width + 50" :height="height + 50">
                <g :transform="'translate(0,' + height + ') scale(1,-1)'">
                    <g v-for="(col, coli) in columns">
                        <g v-for="(row, rowi) in col">
                            <rect
                                :key="rowi"
                                :x="xScale(coli) + 50"
                                :y="yScale(row.y)"
                                :width="xScale(1) - (padding * 3)"
                                :height="yScale(row.height)"
                                :opacity="focusi > -1 ? (rowi == focusi ? 0.9 : 0.3) : 0.8"
                                stroke="white"
                                :fill="colors.length ? colors[rowi] : defaultColors(rowi)"
                                rx="2"
                                ry="2"
                                @mouseenter="onEnter(
                                    row.height,
                                    ylabels[rowi],
                                    xlabels[coli].join(' '),
                                    $event
                                )"
                                @mousemove="onEnter(
                                    row.height,
                                    ylabels[rowi],
                                    xlabels[coli].join(' '),
                                    $event
                                )"
                                @mouseleave="onLeave"
                            />
                        </g>
                    </g>

                </g>

                <g v-for="r in [0,1]">
                    <text
                        v-for="(label, labeli) in xlabels"
                        :x="xScale(labeli) + (xScale(1) * 0.4) + 50"
                        :y="height + 15 + (r * 16)"
                        text-anchor="middle"
                        alignment-baseline="central"
                        opacity="0.3"
                        font-size="13px"
                        v-text="label[r]"
                    />
                </g>

                <text
                    v-for="(y,i) in [height,10]"
                    x="40"
                    :y="y"
                    opacity="0.3"
                    text-anchor="end"
                    font-size="13px"
                    v-text="yLabels[i]"
                />
            </svg>
        </div>
    `
}