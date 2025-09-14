import { html, useTSElements, useTSMetaData } from '@devwareng/vanilla-ts';

export default function Notfound(DOM: HTMLElement) {
  useTSMetaData({
    name: 'notfound',
    description: '',
    author: ''
  });


  const ui = useTSElements(
    DOM,
    html`
      <div class="p-4">
        <h1>Notfound</h1>
      
      </div>
    `
  );

  return ui
}