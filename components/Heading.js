import Btn from './Btn.js'

export default {
    components: { Btn },
    template: `
        <div :style="{
            background: '#0D1F2DEE',
            height: '110px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
        }">

            <div :style="{
                fontSize: '32px',
                fontWeight: 200,
                display: 'flex',
                alignItems: 'flex-end',
                color: 'rgba(255,255,255,0.6)'
            }">
            Bread market analysis
            </div>
            <div :style="{
                display: 'flex',
                alignItems: 'flex-end'
            }">
                <Btn title="Download XSL" />
            </div>
        </div>
    `
}