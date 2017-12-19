import FilterButton from './FilterButton2.js'
import StackedBar from './StackedBar2.js'

export default {
    components: { StackedBar, FilterButton },
    props: ['filterKey','activeFilters','filters','data','xlabels','ylabels','max'],
    template: `
        <div>
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
                    />
                </div>
            </div>
        </div>
    `,
    css: `
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