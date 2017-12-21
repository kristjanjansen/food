export default {
    template: `
        <div class="Loading">
            <div class="Loading__wrapper">
                <svg class="Loading__spinner" width="100" height="100">
                    <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke-width="1"
                        stroke="rgba(0,0,0,0.5)"
                    />
                    <rect
                        x="0"
                        y="0"
                        width="50"
                        height="50"
                        fill="white"
                    />
                </svg>
                <div class="Loading__text">Loading</div>
            </div>
        </div>
    `,
    css: `
        .Loading {
            widht: 100vw;
            height: 50vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .Loading__wrapper {
            text-align: center;
        }
        .Loading__spinner {
            animation: rotation 2s infinite linear;
        }
        .Loading__text {
            margin-top: 1rem;
            font-size: 2em;
            font-weight: 200;
            color: rgba(0,0,0,0.5);
        }
    `
}