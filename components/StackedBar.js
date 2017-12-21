import round from '../utils/round.js'

export default {
    props: {
        data: { default: [] },
        height: { default: 200 },
        unitwidth: { default: 40 },
        relative: { default: false },
        xlabels: { default: () => [] },
        ylabels: { default: () => [] },
        max: { default: null },
        focusIndex: { default: -1 },
        colors: { default: Array(50).fill('#ddd') }
    },
    data: () => ({
        padding: 5,
        showTrendline: false
    }),
    mounted() {
        this.$bus.$on('showTrendline', showTrendline => this.showTrendline = showTrendline)
        this.$bus.$on('showRelative', showRelative => this.relative = showRelative)
    },
    computed: {
        maxValue() {
            return this.relative ? this.height : this.max
        },
        width() {
            return this.data[0].length * this.unitwidth
        },
        xScale() {
            return d3.scaleLinear()
                .domain([0, this.columns.length])
                .range([this.padding, this.width])
        },
        yScale() {
            return d3.scaleLinear()
                .domain([0, this.maxValue])
                .range([0, this.height])
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
                return ['0', Math.floor(this.maxValue / 1000) + 'k']
            }
            return ['0', this.maxValue]
        },
        firstBarY() {
            const lastRow = this.columns[0].slice(-1)[0]
            return lastRow.y + lastRow.height
        },
        lastBarY() {
            const lastRow = this.columns.slice(-1)[0].slice(-1)[0]
            return lastRow.y + lastRow.height
        },
        trendline() {
            return [
                { x: 1, y: this.firstBarY },
                { x: this.columns.length, y: this.lastBarY }
            ]
        }
    },
    methods: {
        onEnter(title, subtitle, subsubtitle, color, e) {
            this.$bus.$emit('showPopup', {
                x: e.clientX,
                y: e.clientY,
                title,
                subtitle,
                subsubtitle,
                color
            })
        },
        onLeave() {
            this.$bus.$emit('hidePopup')
        },
    },
    template: `
        <div>
            <svg :width="width + 50" :height="height + 50">
                <g
                    :transform="'translate(0,' + height + ') scale(1,-1)'"
                >
                    <g
                        v-for="(col, coli) in columns"
                        :opacity="showTrendline ? 0.85 : 1"
                    >
                        <g v-for="(row, rowi) in col">
                            <rect
                                :key="rowi"
                                :x="xScale(coli) + 50"
                                :y="yScale(row.y)"
                                :width="xScale(1) - (padding * 3)"
                                :height="yScale(row.height)"
                                stroke="white"
                                :fill="colors[rowi]"
                                :opacity="focusIndex > -1 ? (rowi == focusIndex ? 0.9 : 0.3) : 0.8"
                                rx="2"
                                ry="2"
                                @mouseenter="onEnter(
                                    row.height,
                                    ylabels[rowi],
                                    xlabels[coli].join(' '),
                                    colors[rowi],
                                    $event
                                )"
                                @mousemove="onEnter(
                                    row.height,
                                    ylabels[rowi],
                                    xlabels[coli].join(' '),
                                    colors[rowi],
                                    $event
                                )"
                                @mouseleave="onLeave"
                            />
                        </g>
                    </g>

                    <!-- Trendline -->
                    
                    <g v-if="showTrendline">
                    
                        <line
                            :x1="xScale(trendline[0].x) + 26"
                            :y1="yScale(trendline[0].y)"
                            :x2="xScale(trendline[1].x) + 26"
                            :y2="yScale(trendline[1].y)"
                            stroke-width="4"
                            stroke="white"
                        />
                        <circle
                            v-for="trend in trendline"
                            :cx="xScale(trend.x) + 26"
                            :cy="yScale(trend.y)"
                            r="4"
                            fill="white"
                        />
                        <circle
                            v-for="trend in trendline"
                            :cx="xScale(trend.x) + 26"
                            :cy="yScale(trend.y)"
                            r="2"
                            fill="rgb(150,150,150)"
                        />
                        <line
                            :x1="xScale(trendline[0].x) + 26"
                            :y1="yScale(trendline[0].y)"
                            :x2="xScale(trendline[1].x) + 26"
                            :y2="yScale(trendline[1].y)"
                            stroke-width="1"
                            stroke="rgb(150,150,150)"
                        />

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