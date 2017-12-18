import HeadingLeft from './HeadingLeft.js'
import HeadingRight from './HeadingRight.js'

export default {
    components: { HeadingLeft, HeadingRight },
    template: `
    <div>
        <div style="display: flex">
            <div style="width: 300px; background: #0D1F2D11; height: 200vh">
                <HeadingLeft />
                <slot name="left"></slot>
            </div>

            <div style="width: 100%">
                <HeadingRight />
                <div style="padding: 25px">
                    <slot name="right"></slot>
                </div>
            </div>

        </div>
        <slot name="footer"></slot>
    </div>
    `
}