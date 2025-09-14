import { useTSMetaData, useTSElements, html, useTSParams, useTSLazy, useTSCollection, useTSSSRHydration, useTSNoReload } from "@devwareng/vanilla-ts";
function Home$1(DOM) {
  useTSMetaData({
    name: "home",
    description: "",
    author: ""
  });
  const ui = useTSElements(
    DOM,
    html`
      <div class="p-4">
        <h1>Home</h1>
        
      </div>
    `
  );
  return ui;
}
function Home(DOM) {
  useTSMetaData({
    name: "home page",
    description: `This is CozyNest - Handcrafted Fashion & Vintage Decor E - commerce Website made by devwaren`,
    author: "Waren Gador"
  });
  return useTSElements(
    DOM,
    html`
      <div class="p-4">
        <h1>Hello</h1>
      </div>
    `
  );
}
function Notfound(DOM) {
  useTSMetaData({
    name: "notfound",
    description: "",
    author: ""
  });
  const ui = useTSElements(
    DOM,
    html`
      <div class="p-4">
        <h1>Notfound</h1>
      
      </div>
    `
  );
  return ui;
}
const NotFound = Notfound;
const routeTree = [
  { path: "/home", name: "home", component: (DOM) => Home$1(DOM) },
  { path: "/", name: "index", component: (DOM) => Home(DOM) }
];
function createRouter(DOM) {
  function matchRoute(path) {
    for (const route of routeTree) {
      const keys = [];
      const regex = new RegExp("^" + route.path.replace(/:([^/]+)/g, (_, key) => {
        keys.push(key);
        return "([^/]+)";
      }) + "$");
      const pathname = path.split("?")[0];
      const match = pathname.match(regex);
      if (match) {
        const params = {};
        keys.forEach((key, i) => params[key] = match[i + 1]);
        return { ...route, params };
      }
    }
    return null;
  }
  function navigate(path) {
    const match = matchRoute(path);
    if (match) {
      match.component(DOM);
      history.pushState({}, "", path);
    } else {
      NotFound(DOM);
    }
  }
  window.addEventListener("popstate", () => {
    const path = window.location.pathname + window.location.search;
    const match = matchRoute(path);
    if (match) {
      match.component(DOM);
    } else {
      NotFound(DOM);
    }
  });
  navigate(window.location.pathname + window.location.search);
  return { navigate, routes: routeTree };
}
const Router = (DOM) => {
  useTSParams.getState();
  const router = createRouter(DOM);
  router.navigate(window.location.pathname);
  window.addEventListener("popstate", () => {
    router.navigate(window.location.pathname);
  });
};
const Navbar = useTSLazy(() => import("./assets/index-cDK7rdA2.js"));
const useAppSettings = (DOM) => {
  let IDs;
  ((IDs2) => {
    IDs2["NAVBAR"] = "navbar";
    IDs2["ROUTES"] = "routes";
  })(IDs || (IDs = {}));
  const sections = [
    "navbar",
    "routes"
    /* ROUTES */
  ];
  const components = [Navbar, Router];
  return useTSCollection(sections, DOM, components);
};
const usePageTitle = (title) => {
  return document.title = title;
};
function App(DOM) {
  const { isDOM } = useTSSSRHydration(DOM);
  if (!isDOM) return;
  usePageTitle("CozyNest - Handcrafted Fashion & Vintage Decor");
  const ui = useTSElements(
    isDOM,
    html`
        <div class="bg-papaya-whip min-h-screen text-jet font-secondary">
            <header id="navbar" class="header" data-header></header>
            <div id="routes"></div>
        </div>
        `
  );
  useTSNoReload();
  useAppSettings(isDOM);
  return ui;
}
function render(_url) {
  const html2 = App();
  return { html: html2 };
}
export {
  render
};
