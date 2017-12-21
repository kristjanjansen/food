export default {
    props: ['filterKey', 'filterValue', 'activeFilters', 'color'],
    template: `
    <div
        class="FilterButton"
        :style="{
            background: activeFilters[filterKey] === filterValue
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(0,0,0,0)',
            border: activeFilters[filterKey] === filterValue
                ? '1px solid rgba(0,0,0,0.3)'
                : '1px solid rgba(0,0,0,0)',
        }"
    >
        <span :style="{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            paddingRight: '5px',
        }">
            <span
                :style="{
                    paddingRight: '5px',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                }"
            >
                <span
                    v-if="color"
                    :style="{
                        color,
                        marginRight: '5px'
                    }"
                >⬤ </span>
                <span>
                {{ filterValue }}
                </span>
            </span>
            <span
                :style="{
                    userSelect: 'none'
                }"
                v-show="activeFilters[filterKey] === filterValue"
            >
                ×
            </span>
        </span>
    </div>
    `,
    css: `
        .FilterButton {
            height: 2rem;
            display: flex;
            align-items: center;
            border-radius: 100px;
            padding: 0 0.5rem;
            cursor: 'pointer;
        }
    `
}