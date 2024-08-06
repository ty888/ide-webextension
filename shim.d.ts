import type { ProtocolWithReturn } from 'webext-bridge'
import type { Tabs } from 'webextension-polyfill'

import { IlogType } from 'src/type'

declare module 'webext-bridge' {
  export interface ProtocolMap {
    // define message protocol types
    // see https://github.com/antfu/webext-bridge#type-safe-protocols
    // 日志操作
    'log_opt': {
      type: IlogType,
      pluginName: string
    }
    // 日志中插件状态数据
    'get_log_plugin_data': ProtocolWithReturn<{data: string}>

    // 通用执行消息
    'run': {
      type: 'loadResources' | 'getInfo',
      data: any
    }
  }
}

// type RunType = loadResources
// interface RunData<T extends MessageType> {
//   type: T;
//   data: T extends 'loadResources'
//       ? { resources: string[] }
//       : T extends 'a'
//       ? { propA: number }
//       : T extends 'b'
//       ? { propB: string }
//       : T extends 'c'
//       ? { propC: boolean }
//       : never;
// }