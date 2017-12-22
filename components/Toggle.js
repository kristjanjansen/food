export default {
    props: ['enabled', 'label', 'enabledLabel', 'disabledLabel'],
    data: () => ({ height: 25 }),
    computed: {
        width() {
            return this.height * 1.5
        }
    },
    template: `
        <div class="Toggle">
            <span class="Toggle__label"></span>
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
                        :fill="enabled ? '#51B57E' : '#EEE'"
                        stroke="rgba(0,0,0,0.2)"
                        filter="url(#innershadow)"
                    />
                    <circle
                        :cx="enabled ? width - (height / 2) : height / 2"
                        :cy="height / 2"
                        :r="(height / 2) - 2"
                        fill="rgba(250,250,250,1)"
                        stroke="rgba(0,0,0,0.3)"
                    />
                </svg>
            </span>
        </div>
    `
}