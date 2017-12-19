export default {
    data: () => ({
        x: 0,
        y: 0,
        title: '',
        subtitle: '',
        subsubtitle: '',
        show: false,
        width: 150,
        height: 85,
        hideTimeout: null
    }),
    mounted() {
        this.$bus.$on('showPopup', ({ x, y, title, subtitle, subsubtitle }) => {
            clearTimeout(this.hideTimeout)
            this.show = true
            this.x = x - (this.width / 2)
            this.y = y - (this.height + 10)
            this.title = title
            this.subtitle = subtitle.length > 20 ? subtitle.slice(0,20) + '...' : subtitle
            this.subsubtitle = subsubtitle.length > 20 ? subsubtitle.slice(0, 20) + '...' : subsubtitle
        })
        this.$bus.$on('hidePopup', () => {
            this.hideTimeout = setTimeout(() => this.show = false, 200)
        })
    },
    template: `
    <transition name="fade">
        <div
            v-show="show"
            :style="{
                position: 'fixed',
                height: height + 'px',
                width: width + 'px',
                left: x + 'px',
                top: y + 'px',
                background: 'white',
                border: '2px solid rgba(0,0,0,0.1)',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0 0 4px rgba(0,0,0,0.05)',
                whiteSpace: 'nowrap'

            }"
        >
            <div
                :style="{
                    fontSize: '1.5em',
                    lineHeight: '1em',
                    color: 'rgba(0,0,0,0.5)',
                    marginBottom: '0.1rem'
                }"
                v-text="title"
            />
            <div
                :style="{
                    fontSize: '0.85em',
                    color: 'rgba(0,0,0,0.5)',
                    marginBottom: '0.1rem'
                }"
                v-text="subtitle"
            />
            <div
                :style="{
                    fontSize: '0.85em',
                    color: 'rgba(0,0,0,0.25)'
                }"
                v-text="subsubtitle"
            />
        </div>
    </transition>
    `
}