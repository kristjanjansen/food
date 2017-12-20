export default {
    template: `
    <div>
        <header class="Layout__header">
            <div class="Layout__headerLeft">
                Codename
            </div>
            <div class="Layout__headerRight">
                <div class="Layout__headerTitle">
                    Bread market analysis
                </div>
            </div>
        </header>
        <aside class="Layout__toolbar">
            <slot name="toolbar" />
        </aside>
        <main class="Layout__main">
            <slot name="main" />
        </main>
        <slot name="modal" />
    </div>
    `,
    css: `
    .Layout__header {
        display: flex;
    }
    .Layout__headerLeft {
        height: 110px;
        padding: 20px;
        background: #0D1F2D;
        font-size: 32px;
        font-weight: 700;
        display: flex;
        align-items: flex-end;
        text-transform: uppercase;
        color: rgba(255,255,255,0.1);
    }
    .Layout__headerRight {
        width: 100%;
        background: #0D1F2DEE;
        height: 110px;
        padding: 20px;
        display: flex;
        align-items: flex-end;
    }
    .Layout__headerTitle {
        font-size: 32px;
        font-weight: 200;
        color: rgba(255,255,255,0.6);
    }
    .Layout__toolbar {
        padding: 1rem;
        background: black;
    }
    .Layout__toolbar > * {
        display: flex
    }
    .Layout__toolbar > * > * {
        margin-right: 0.5rem;
    }
    .Layout__main {
        padding: 1rem;
    }

    
    `
}