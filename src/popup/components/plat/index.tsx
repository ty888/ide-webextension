import { useStorageLocal } from '@/hooks/useStorageLocal'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Modal, Result, Switch, Tabs, TabsProps } from 'antd'
import { IlogType, IpluginList } from '@/type'
import './index.css'
import LoadSource from './components/loadSource'
import GetInfo from './components/getInfo'

export interface PlatProps {
  tab: any
  pluginList: IpluginList[]
}

const Plat: React.FC<PlatProps> = (props) => {
  const { tab, pluginList } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // getLogData()
  }, [tab])


  return (
    <div className='plat_page'>
      <div className='plat_page_item_title'>资源能力</div>
      <div className='plat_page_content'>
        <div className='plat_page_item'>
          <LoadSource pluginList={pluginList} tab={tab} />
        </div>
      </div>

      <div className='plat_page_item_title'>信息获取</div>
      <div className='plat_page_content'>
        <div className='plat_page_item'>
          <GetInfo tab={tab} />
        </div>
      </div>
    </div>
  )
}

export default Plat
