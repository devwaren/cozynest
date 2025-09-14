import App from './App'

export function render(_url: string) {
  const html = App()
  return { html }
}
