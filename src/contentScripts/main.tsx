import App from './App'
import * as ReactDOM from 'react-dom/client'
import { onMessage } from 'webext-bridge'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(() => {
  console.log(`[vite-react-webext] window`, window)
  console.info('[vite-react-webext] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vite-react-webext] Navigate from page "${data.title}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  const root = document.createElement('div')
  const injectScript = (file: any, node: any) => {
    const th = document.querySelector(node);
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
  };
  
  injectScript(browser.runtime.getURL('injected.global.js'), 'body');
  document.body.appendChild(container)
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(<App />)
})()
