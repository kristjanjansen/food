export default {
    props: {
        enabled: { default: false },
        label: { default: '' },
        enabledLabel: { default: '' },
        disabledLabel: { default: '' }
    },
    template: `
        <div class="ToggleBtn">
            <span
                class="Toggle__label"
                v-text="label"
            />
            <span class="ToggleBtn__buttons">
                <span
                    class="ToggleBtn__left"
                    :style="{
                        background: enabled ? 'rgba(0,0,0,0.05)' : 'white',
                        color: enabled ? 'rgba(0,0,0,0.2)': 'rgba(0,0,0,0.5)',
                    }"
                    v-text="disabledLabel"
                />
                <span
                    class="ToggleBtn__right"
                    :style="{
                        background: !enabled ? 'rgba(0,0,0,0.05)' : 'white',
                        color: !enabled ? 'rgba(0,0,0,0.2)': 'rgba(0,0,0,0.5)',
                    }"
                    v-text="enabledLabel"
                />
            </span>
        </div>
    `,
    css: `
        .ToggleBtn {
            display: flex;
        }
        .Toggle__label {
            padding-top: 0.2em;
            margin-right: 0.3rem;
            font-size: 0.9em;
            color: rgba(0,0,0,0.5);
        }
        .ToggleBtn__buttons {
            display: flex;
        }
        .ToggleBtn__left,
        .ToggleBtn__right {
            display: flex;
            align-items: center;
            font-size: 0.9em;
            cursor: pointer;
            height: 1.5rem;
            width: 50%;
            border: 1px solid rgba(0,0,0,0.3);
        }
        .ToggleBtn__left {
            border-right: none;
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;
            padding: 0 7px 2px 10px;
        }
        .ToggleBtn__right {
            border-top-right-radius: 100px;
            border-bottom-right-radius: 100px;
            padding: 0 10px 2px 7px;
        }
    `
}