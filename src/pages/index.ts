import { html, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Home(DOM: HTMLElement) {
  useTSMetaData({
    name: 'home page',
    description: `This is CozyNest - Handcrafted Fashion & Vintage Decor E - commerce Website made by devwaren`,
    author: 'Waren Gador'
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