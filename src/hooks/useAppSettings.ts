import { useTSCollection, useTSNoReload } from '@devwareng/vanilla-ts';
import { Router } from "../routes/__root"
import { Navbar } from "../components"

const useAppSettings = (DOM: HTMLElement) => {

    enum IDs {
        NAVBAR = "navbar",
        ROUTES = "routes",
    }

    const sections = [
        IDs.NAVBAR,
        IDs.ROUTES
    ]
    const components = [Navbar, Router]


    useTSNoReload()

    return useTSCollection(sections, DOM, components)

}

export { useAppSettings }