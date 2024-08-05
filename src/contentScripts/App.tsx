import { useEffect, useState } from 'react'
import { allowWindowMessaging, onMessage, sendMessage } from 'webext-bridge/content-script'

const App = () => {
  console.log('【content】', 'content init')

  useEffect(() => {
    // console.log('【content】', 'content useEffet', allowWindowMessaging, onMessage, sendMessage)
    allowWindowMessaging('ide-injected')

    // // 在消息能力加载好后执行的代码
    // // 日志操作透传
    onMessage('log_opt', async ({ data }) => {
      sendMessage("log_opt", {
        ...data
      }, "window");
    })

    // 通用运行
    onMessage('run', async ({ data }) => {
      await sendMessage("run", {
        ...data
      }, "window");
    })

    // 接受各插件日志状态
    onMessage('log_plugin_data', async () => {
      return {
        data: window.localStorage.getItem('SM_CONFIG_KEY') || ''
      }
    })

  }, [])

  return (
    <div>content script</div>
  )
}

export default App