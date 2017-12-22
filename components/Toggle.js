export default {
    props: {
        enabled: { default: false },
        label: { default: '' },
        enabledLabel: { default: '' },
        disabledLabel: { default: '' }
    },
    data: () => ({ height: 25, animatedToggleX: null, animatedSaturation: null }),
    computed: {
        width() {
            return this.height * 1.5
        },
        toggleX() {
            return this.enabled ? this.width - (this.height / 2) : this.height / 2
        },
        saturation() {
            return this.enabled ? 55 : 0
        }
    },
    watch: {
        enabled() {
            anime({
                targets: this,
                animatedToggleX: this.toggleX,
                animatedSaturation: this.saturation,
                duration: 100,
                easing: 'linear'
            })
        }
    },
    mounted() {
        this.animatedToggleX = this.toggleX
        this.animatedSaturation = this.saturation
    },
    template: `
        <div class="Toggle">
            <span
                class="Toggle__label"
                :style="{ color: enabled ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)'}"
                v-text="label"
            />
            <span
                v-if="disabledLabel"
                class="Toggle__disabledLabel"
                :style="{ color: enabled ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.6)'}"
                v-text="disabledLabel"
            />
            <span class="Toggle__toggle">
                <svg :width="width" :height="height">
                    <defs>
                            <filter id="innershadow" x0="-10%" y0="-10%" width="200%" height="200%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"></feGaussianBlur>
                                <feOffset dy="2" dx="3"></feOffset>
                                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>
                                <feFlood flood-color="black" flood-opacity="0.2"></feFlood>
                                <feComposite in2="shadowDiff" operator="in"></feComposite>
                                <feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>
                            </filter>
                           
                        </defs>
                    <rect
                        x="1"
                        y="1"
                        :width="width - 2"
                        :height="height - 2"
                        :rx="height / 2"
                        :ry="height / 2"
                        :fill="'hsl(147,' + animatedSaturation + '%,81%)'"
                        stroke="rgba(0,0,0,0.2)"
                        filter="url(#innershadow)"
                    />
                    <circle
                        :cx="animatedToggleX"
                        :cy="height / 2"
                        :r="(height / 2) - 2"
                        fill="rgba(250,250,250,1)"
                        stroke="rgba(0,0,0,0.3)"
                    />
                </svg>
            </span>
            <span
                v-if="enabledLabel"
                class="Toggle__enabledLabel"
                v-text="enabledLabel"
                :style="{ color: enabled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)'}"
            />
        </div>
    `,
    css: `
        .Toggle {
            display: flex;
            align-items: center;
            white-space: nowrap;
        }
        .Toggle__label {
            padding-bottom: 0.3em;
            margin-right: 0.5rem;
            font-size: 0.9em;
        }
        .Toggle__enabledLabel,
        .Toggle__disabledLabel {
            font-size: 0.7em;
            text-transform: uppercase;
            padding-bottom: 0.3em;
        },
        .Toggle__enabledLabel {
            margin-left: 0.2rem;
        },
        .Toggle__disabledLabel {
            margin-right: 0.2rem;
        }

    `
}