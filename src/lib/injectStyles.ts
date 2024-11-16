async function getGlobalStyleSheets() {
    const globalSheets = await Promise.all(
        Array.from(document.styleSheets).map(async x => {
            const sheet = new CSSStyleSheet();
            const css = Array.from(x.cssRules)
                .map(rule => rule.cssText)
                .join(' ');
            await sheet.replace(css);
            return sheet;
        }),
    );

    return globalSheets;
}

export async function addGlobalStylesToShadowRoot(shadowRoot: ShadowRoot) {
    const item = await getGlobalStyleSheets();
    shadowRoot.adoptedStyleSheets.push(...item);
}
