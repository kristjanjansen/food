export default {
    props: ['title'],
    template: `
    <div
        :style="{
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '100px',
            padding: '0 10px',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.4)'
        }"
        v-text="title"
    />
    `
}