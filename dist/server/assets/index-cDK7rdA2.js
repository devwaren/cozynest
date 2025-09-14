import { useTSElements, html } from "@devwareng/vanilla-ts";
function Navbar(DOM) {
  const ui = useTSElements(
    DOM,
    html`
            <div>
                <div>
                    <a href="/" class="logo">
                        <img src="/logo-light.svg" alt="cozynest" width="129" height="16W">
                    </a>
                    <nav class="navbar">
                        <button class="nav-close-btn" aria-label="close-btn" data-nav-toggler>
                            <span class="material-symbols-rounded" aria-hidden="true">
                                close
                            </span>
                        </button>
                        <ul class="navbar-list">
                            <li>
                                <a href="/" class="navbar-link">Home</a>
                            </li>
                            <li>
                                <button class="navbar-link">
                                    <ion-icon name="caret-forward-outline" aria-hidden="true" class="duration-200"></ion-icon>
                                </button>
                                <div class="dropdown">
                                    <div class="dropdown-content">
                                        <a href="">All Products</a>
                                        <a href="">Clothing</a>
                                        <a href="">Candles</a>
                                        <a href="">Accessories</a>
                                        <a href="">Bags</a>
                                        <a href="">Clocks</a>
                                        <a href="">SALE 🏷️</a>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <a href="/blog" class="navbar-link">Blog</a>
                            </li>
                            <li>
                                <a href="/latest" class="navbar-link">Latest</a>
                            </li>
                            <li>
                                <a href="/info" class="navbar-link">Info</a>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <button class="cart-toggler" aria-label="cart" aria-hidden="true">
                            <span class="material-symbols-rounded">
                                shopping_cart_checkout
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        `
  );
  return ui;
}
export {
  Navbar as default
};
