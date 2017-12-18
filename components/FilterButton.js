export default {
    props: ['filterKey', 'filterValue', 'filterValuei', 'activeFilters', 'colors', 'coloredFilter'],
    template: `
    <div
        :style="{
            background: activeFilters[filterKey] === filterValue
                ? 'rgba(255,255,255,0.6)'
                : 'rgba(0,0,0,0)',
            border: activeFilters[filterKey] === filterValue
                ? '1px solid rgba(0,0,0,0.3)'
                : '1px solid rgba(0,0,0,0)',
            height: '2rem',
            display: 'flex',
            'align-items': 'center',
            'border-radius': '100px',
            padding: '0 5px',
            cursor: 'pointer'
        }"
    >
        <span
            v-if="coloredFilter == filterKey"
            :style="{
                color: colors[filterValuei]
            }"
        >⬤ </span>
        <span :style="{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            paddingRight: '5px',
            paddingLeft: coloredFilter == filterKey ? '0' : '5px'
        }">
            <span
                :style="{
                    paddingRight: '5px',
                    userSelect: 'none',
                    whiteSpace: 'nowrap'
                }"
            >
                {{ filterValue }}
            </span>
            <span
                :style="{
                    userSelect: 'none'
                }"
                v-show="activeFilters[filterKey] === filterValue"
            >
                ⨉
            </span>
        </span>
    </div>
    `
}