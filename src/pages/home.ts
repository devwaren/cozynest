import { html, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Home(DOM: HTMLElement) {
  useTSMetaData({ 
      name: 'home', 
      description: '', 
      author: '' 
  });

  const ui = useTSElements(
    DOM,
    html`
      <div class="p-4">
        <h1>Home</h1>
        
      </div>
    `
  );

  return ui
}