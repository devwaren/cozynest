import { useTSLazy } from "@devwareng/vanilla-ts";

const Navbar = useTSLazy(() => import("./Navbar"))

export { Navbar }