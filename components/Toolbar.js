export default {
    template: `
        <div class="Toolbar">
            <slot name="left" />
            <slot name="center" />
            <slot name="right" />
        </div>
    `,
    css: `
        .Toolbar {
            padding: 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            position: sticky;
            top: 0;
            background: white;
            box-shadow: 0 0 15px rgba(0,0,0,0.06);
        }
        .Toolbar {
            display: flex;
            justify-content: space-between;
        }
        .Toolbar > * {
            display: flex;
        }
        .Toolbar > * > * {
            margin-right: 0.5rem;
        }
    `
}