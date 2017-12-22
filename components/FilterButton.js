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
        <span class="FilterButton__wrapper">
            <span class="FilterButton__left">
                <span
                    v-if="color"
                    class="FilterButton__dot"
                    :style="{ color }"
                >⬤</span>
                <span v-text="filterValue" />
            </span>
            <span
                class="FilterButton__right"
                v-show="activeFilters[filterKey] === filterValue"
            >×</span>
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
        .FilterButton__wrapper {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-right: 5px;
            user-select: none;
        }
        .FilterButton__left {
            padding-right: 5px;
            white-space: nowrap;
        }
        .FilterButton__dot {
            margin-right: 5px;
        }
    `
}