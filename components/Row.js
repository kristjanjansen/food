import FilterButton from './FilterButton2.js'
import StackedBar from './StackedBar.js'

export default {
    components: { StackedBar, FilterButton },
    props: ['groupKey','groups','filters','data','xlabels','ylabels','max'],
    template: `
        <div>
            <div class="title">{{ groupKey }}</div>
            <div class="Row__wrapper">
                <div class="Row__left">
                    <FilterButton
                        v-for="(value, valuei) in filters.filter(f => f.key == groupKey)[0].values"
                        @click.native="onFilter(groupKey, value)"
                        :key="valuei"
                        :filter-key="groupKey"
                        :filter-value="value"
                        :groups="groups"
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
        }
        .Row__right {
            width: 100%;
        }
    `
}