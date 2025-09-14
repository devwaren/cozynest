import { useTSCollection, useTSNoReload, useTSSelect } from '@devwareng/vanilla-ts';
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

    const a = useTSSelect('a') as NodeListOf<HTMLAnchorElement> | null

    a?.forEach((as) => as.addEventListener("click", (e) => {
        e.preventDefault()
        useTSNoReload()
    }))

    return useTSCollection(sections, DOM, components)

}

export { useAppSettings }