import StackedBar from './StackedBar.js'

export default {
    props: ['data', 'colors', 'colori', 'xlabels', 'max', 'max2', 'title', 'focusi'],
    components: { StackedBar },
    template: `
    <div>
        <div class="title">{{ title }}</div>
        <div class="row">
            <StackedBar
                :data="data"
                :xlabels="xlabels"
                :max="max"
                :colors="colors"
                :colori="colori"
                :focusi="focusi"
            />
            <StackedBar
                :data="data"
                :relative="true"
                :xlabels="xlabels"
                :colors="colors"
                :colori="colori"
                :focusi="focusi"
            />
        </div>
    </div>
    `
}