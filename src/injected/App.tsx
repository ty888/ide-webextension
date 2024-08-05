import { useEffect } from 'react'
import { onMessage, setNamespace } from 'webext-bridge/window'

const App = () => {
  console.log('【injected', 'injected init')
  let platform: any, resources: any, log: any, maxTools: any

  window.onload = () => {
    setNamespace('ide-injected')
    // 平台能力插件
    platform = window?.plugins?.get("platform");
    // 资源插件
    resources = window?.plugins?.get("resources");
    // 日志
    log = window?.log;
    // 工具
    maxTools = window?.maxTools

    /**
     * LOG 操作
     */
    onMessage('log_opt', ({ data }) => {
      log?.[data?.type](data?.pluginName)
    })

    // 通用运行
    onMessage('run', ({ data }) => {
      if (data.type === 'loadResources') {
        // 加载资源
        maxTools.loadSource(data?.data.value)
      }

    })
  }

  // useEffect(() => {

  // }, [])

  return (
    <div>injected</div>
  )
}

export default App