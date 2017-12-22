import FilterButton from './FilterButton.js'
import StackedBar from './StackedBar.js'

export default {
    components: { StackedBar, FilterButton },
    props: [
        'filterKey',
        'activeFilters',
        'filters',
        'data',
        'xlabels',
        'ylabels',
        'max',
        'focusIndex'
    ],
    template: `
        <div class="Row">
            <div class="title">{{ filterKey }}</div>
            <div class="Row__wrapper">
                <div class="Row__left">
                    <FilterButton
                        v-for="(filterValue, filterValueIndex) in filters.filter(f => f.key == filterKey)[0].values"
                        @click.native="$emit('filter', { key: filterKey, value: filterValue })"
                        :key="filterValueIndex"
                        :filter-key="filterKey"
                        :filter-value="filterValue"
                        :active-filters="activeFilters"
                        :color="filters.filter(f => f.key == filterKey)[0].colors[filterValueIndex]"
                    />
                </div>
                <div class="Row__right">
                    <StackedBar
                        :data="data"
                        :xlabels="xlabels"
                        :ylabels="ylabels"
                        :max="max"
                        :focus-index="focusIndex"
                        :colors="filters.filter(f => f.key == filterKey)[0].colors"
                    />
                </div>
            </div>
        </div>
    `,
    css: `
        .Row {
            padding: 2rem;
            border-bottom: 1px solid rgba(0,0,0,0.1)
        }
        .Row__wrapper {
            display: flex;
        }
        .Row__left {
            width: 18vw;            
            min-width: 250px;
            overflow-y: scroll;
            max-height: 270px;
            padding-right: 1rem;
        }
        .Row__right {
            width: 100%;
            border-left: 1px solid rgba(0,0,0,0.05);
            margin-left: 5px;
        }
    `
}