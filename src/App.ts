
import { html, useTSElements, useTSSSRHydration } from '@devwareng/vanilla-ts'
import { useAppSettings, usePageTitle } from './hooks';

export default function App(DOM?: HTMLElement) {

    const { isDOM } = useTSSSRHydration(DOM!)
    if (!isDOM) return

    usePageTitle("CozyNest - Handcrafted Fashion & Vintage Decor")

    const ui = useTSElements(
        isDOM,
        html`
        <div class="bg-papaya-whip min-h-screen text-jet font-secondary">
            <header id="navbar" class="header" data-header></header>
            <div id="routes"></div>
        </div>
        `
    );

    useAppSettings(isDOM)
    return ui
}