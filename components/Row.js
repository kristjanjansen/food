import StackedBar from './StackedBar.js'

export default {
    components: { StackedBar },
    props: ['groupKey','data','xlabels','ylabels','max'],
    template: `
        <div>
            <div class="title">{{ groupKey }}</div>
            <StackedBar
                :data="data"
                :xlabels="xlabels"
                :ylabels="ylabels"
                :max="max"
            />
        </div>
    `
}