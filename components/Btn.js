export default {
    props: ['title', 'active'],
    template: `
        <div class="Btn" :style="{
                border: '1px solid rgba(0,0,0,' + (active ? 0.8 : 0.3) + ')',
                color: 'rgba(0,0,0,' + (active ? 0.8 : 0.3) + ')',
            }"
            v-text="title"
        />
    `,
    css: `
        .Btn {
            height: 1.5rem;
            display: flex;
            align-items: center;
            border: 1px solid rgba(0;0;0; + (active ? 0.8 : 0.3) + );
            border-radius: 100px;
            padding: 0 10px 2px 10px;
            cursor: pointer;
            color: rgba(0;0;0; + (active ? 0.8 : 0.3) + );
            font-size: 0.9em;
            white-space: nowrap;
        }
    `
}