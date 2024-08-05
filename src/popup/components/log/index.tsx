import { useStorageLocal } from '@/hooks/useStorageLocal'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Result, Switch, Tabs, TabsProps } from 'antd'
import { IlogType } from '@/type'
import './index.css'

export interface LogProps {
  tab: any
}

const Log: React.FC<LogProps> = (props) => {
  const { tab } = props

  const [logData, setLogData] = useState<{
    key: string;
    value: boolean;
  }[]>([])

  const getLogData = async () => {
    if (tab?.id) {
      const response: any = await sendMessage('log_plugin_data', {}, "content-script@" + tab.id)
      const result = Object.entries(JSON.parse(response?.data)?.namespaceMap)?.map(([key, value]: any) => ({ key, value }));
      setLogData(result)
    }
  }

  useEffect(() => {
    getLogData()
  }, [tab])

  const log = async (type: IlogType, pluginName: string) => {
    await sendMessage("log_opt", {
      type: type,
      pluginName: pluginName,
    }, "content-script@" + tab.id);

    getLogData()
  }

  return (
    <div className='log_page'>
      <div className='log_page_header'>
        <Button style={{marginRight: 8}} type='primary' onClick={() => { log('open', 'all') }}>Open ALL</Button>
        <Button onClick={() => { log('close', 'all') }}>Close ALL</Button>
      </div>
      <div className='log_page_content'>
        {
          logData?.map(item => {
            return <div key={item.key} className='log_page_content_item'>
              <span className='log_page_content_item_title'>{item?.key}</span>
              <Switch
                size='small'
                checked={item.value}
                onChange={(v) => {
                  log(v ? 'open' : 'close', item.key)
                }}
              />
            </div>
          })
        }
      </div>

    </div>
  )
}

export default Log
