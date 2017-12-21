export default {
    props: ['title', 'active'],
    template: `
    <div
        :style="{
            height: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,' + (active ? 0.8 : 0.3) + ')',
            borderRadius: '100px',
            padding: '0 10px 2px 10px',
            cursor: 'pointer',
            color: 'rgba(0,0,0,' + (active ? 0.8 : 0.3) + ')',
            fontSize: '0.9em'
        }"
        v-text="title"
    />
    `
}