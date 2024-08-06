import { isIDEWeb } from '@/utils'
import { sendMessage, onMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})


// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(tabId)
  } catch {
    return
  }

  if (!isIDEWeb(tab?.url || '')) {
    const res = await browser.browserAction.disable(tabId)
    console.log('res', res)
    browser.browserAction.setIcon({
      tabId: tabId,
      path: browser.runtime.getURL(`assets/disable_icon_128.png`)
    });

  }

  sendMessage(
    'tab-prev',
    { title: tab.title },
    { context: 'content-script', tabId },
  )
})
