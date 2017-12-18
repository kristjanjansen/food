export default {
    data: () => ({
        open: false
    }),
    computed: {
        label() {
            return this.open ? 'Hide data' : 'Show data'
        }
    },
    template: `
        <div>
            
            <div
                class="Collapsible__toggle"
                @click="open = !open"
            >
                {{ label }}
            </div>
            
            <div
                class="Collapsible__slot"
                v-show="open"
            >
                <slot />
            </div>
        
        </div>
    `,
    css: `

        .Collapsible__toggle {
            text-transform: uppercase;
            font-size: 0.8em;
            cursor: pointer;
            user-select: none;
            height: 3em;
            display: flex;
            align-items: center;
        }
        .Collapsible__slot {
            margin: 1rem 0;
        }
    `
}