export default {
    props: ['enabled','label','title'],
    template: `
        <div class="Selector">
            <span
                v-if="label"
                class="Selector__label"
                :style="{ color: enabled ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)'}"
                v-text="label"
            />
            <span class="Selector__field">
                <span class="Selector__title">{{ title }}</span>
                <span class="Selector__caret">▾</span>
            </span>
        </div>
    `,
    css: `
        .Selector {
            display: flex;
        }
        .Selector__label {
            padding-top: 0.2em;
            margin-right: 0.3rem;
            font-size: 0.9em;
        }
        .Selector__field {
            color: rgba(0,0,0,0.2);
            border: 1px solid rgba(0,0,0,0.3);
            height: 1.5rem;
            display: flex;
            align-items: center;
            border-radius: 100px;
            padding: 0 10px 2px 10px;
            cursor: pointer;
            font-size: 0.9em;
            white-space: pre;
            box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
            display: flex;
        }
        .Selector__caret {
            margin-left: 0.5rem;
        }
    `
}