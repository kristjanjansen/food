export default {
    props: ['title'],
    template: `
        <div class="Search" v-text="title" />
    `,
    css: `
        .Search {
            color: rgba(0,0,0,0.2);
            border: 1px solid rgba(0,0,0,0.3);
            height: 1.5rem;
            display: flex;
            align-items: center;
            border-radius: 100px;
            padding: 0 60px 2px 10px;
            cursor: pointer;
            font-size: 0.9em;
            white-space: nowrap;
            box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
        }
    `
}