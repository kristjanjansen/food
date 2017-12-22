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
        color: 'rgba(0,0,0,0.3)',
        hideTimeout: null
    }),
    mounted() {
        this.$bus.$on('showPopup', ({ x, y, title, subtitle, subsubtitle, color }) => {
            clearTimeout(this.hideTimeout)
            this.show = true
            this.x = x - (this.width / 2)
            this.y = y - (this.height + 10)
            this.title = title
            this.subtitle = subtitle.length > 20 ? subtitle.slice(0,20) + '...' : subtitle
            this.subsubtitle = subsubtitle.length > 20 ? subsubtitle.slice(0, 20) + '...' : subsubtitle
            this.color = color
        })
        this.$bus.$on('hidePopup', () => {
            this.hideTimeout = setTimeout(() => this.show = false, 200)
        })
    },
    template: `
        <transition name="fade">
        <div
            v-show="show"
            class="Popup"
            :style="{
                height: height + 'px',
                width: width + 'px',
                left: x + 'px',
                top: y + 'px',
            }"
        >
            <div class="Popup__title" :style="{ color }" v-text="title" />
            <div class="Popup__subtitle" v-text="subtitle" />
            <div class="Popup__subsubtitle" v-text="subsubtitle" />
        </div>
        </transition>
    `,
    css: `
        .Popup {
            position: fixed;
            background: white;
            border: 2px solid rgba(0,0,0,0.1);
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 0 4px rgba(0,0,0,0.05);
            white-space: nowrap;
        }
        .Popup__title {
            font-size: 1.5em;
            line-height: 1em;
            margin-bottom: 0.1rem;
        }
        .Popup__subtitle {
            font-size: 0.85em;
            color: rgba(0,0,0,0.6);
            margin-bottom: 0.1rem;
            opacity: 0.8;
        }
        .Popup__subsubtitle {
            font-size: 0.85em;
            color: rgba(0,0,0,0.25);
        }
    `
}