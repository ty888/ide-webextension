import App from './App'
import * as ReactDOM from 'react-dom/client'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
;(() => {
  const root = document.createElement('div')
  const reactRoot = ReactDOM.createRoot(root)
  reactRoot.render(<App />)
})()
