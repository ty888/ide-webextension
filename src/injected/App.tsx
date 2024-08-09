import { useEffect } from 'react'
import { onMessage, setNamespace } from 'webext-bridge/window'

const App = () => {
  console.log('【injected】', 'injected init')
  let platform: any, resources: any, log: any, maxTools: any, idePlugin: any

  window.onload = () => {
    setNamespace('ide-injected')
    // 平台能力插件
    platform = window?.plugins?.get("platform");

    // 资源插件
    setTimeout(() => {
      resources = window?.plugins?.get("resources");
    }, 2000)

    // 日志
    log = window?.log;

    // 工具
    maxTools = window?.maxTools

    // 插件信息 
    idePlugin = window?.idePlugin

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

      if (data.type === 'getInfo') {
        // ide平台信息
        if (data.data.value === 'ide') {
          console.log('【ide】 --> ', platform.getPlatform().get("ide"))
        }
        // 工程信息
        if (data.data.value === 'projectInfo') {
          console.log('【projectInfo】 --> ', platform.getPlatform().get("projectInfo"))
        }
        // 环境信息
        if (data.data.value === 'env') {
          console.log('【env】 --> ', platform.getPlatform().get("env"))
        }
        // 当前页面信息
        if (data.data.value === 'currentPageInfo') {
          const resourceId = platform.getPlatform().get('ide')?.activeInfo?.resourceId
          if (window?.plugins?.get("resources")) {
            console.log('【currentPageInfo】 --> ', window?.plugins?.get("resources").findById('node', resourceId))
          } else {
            console.log('【currentPageInfo】 --> ', '未获取到resourceId')
          }
        }
        // 插件信息
        if (data.data.value === 'getPluginInfo') {
          if (idePlugin) {
            const _list = idePlugin?.list.map((item: any) => {
              const address = idePlugin?.urls.find((i: string) => i.includes(item.name))
              return { ...item, address }
            })
            console.table(_list)
          } else {
            console.log('【插件信息】 --> ', '未获取到插件信息')
          }
        }
      }

    })
  }

  return (
    <div>injected</div>
  )
}

export default App