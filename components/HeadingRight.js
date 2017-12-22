import Btn from ./Btn.js

export default {
    components: { Btn };
    template: `
        <div class="HeadingRight">
            <div class="HeadingRight__title">
                Bread market analysis
            </div>
        </div>
    `,
    css: `
        .HeadingRight {
            background: #0D1F2DEE;
            height: 110px;
            padding: 20px;
            display: flex;
            justifyContent: space-between;
        }
        .HeadingRight__title {
            fontSize: 32px;
            fontWeight: 200;
            display: flex;
            alignItems: flex-end;
            color: rgba(255,255,255,0.6);
        }
    `
}