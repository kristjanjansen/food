import FilterButton from './FilterButton2.js'
import StackedBar from './StackedBar2.js'

export default {
    components: { StackedBar, FilterButton },
    props: ['filterKey','activeFilters','filters','data','xlabels','ylabels','max','focusIndex'],
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
                    />
                </div>
                <div class="Row__right">
                    <StackedBar
                        :data="data"
                        :xlabels="xlabels"
                        :ylabels="ylabels"
                        :max="max"
                        :focus-index="focusIndex"
                        :color="filters.filter(f => f.key == filterKey)[0].color"
                    />
                </div>
            </div>
        </div>
    `,
    css: `
        .Row {
            margin-bottom: 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.2)
        }
        .Row__wrapper {
            display: flex;
        }
        .Row__left {
            width: 300px;
            overflow-y: scroll;
            max-height: 250px;
        }
        .Row__right {
            width: 100%;
        }
    `
}