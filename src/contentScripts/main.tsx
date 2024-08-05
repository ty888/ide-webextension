import App from './App'
import * as ReactDOM from 'react-dom/client'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(() => {
  const container = document.createElement('div')
  const root = document.createElement('div')
  const injectScript = (file: any, node: any) => {
    const th = document.querySelector(node);
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    s.nonce = String(Math.random())
    th.appendChild(s);
  };
  
  injectScript(browser.runtime.getURL('../../injected.global.iife.js'), 'body');
  document.body.appendChild(container)
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(<App />)
})()
