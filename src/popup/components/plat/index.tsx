import { useStorageLocal } from '@/hooks/useStorageLocal'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Modal, Result, Switch, Tabs, TabsProps } from 'antd'
import { IlogType } from '@/type'
import './index.css'
import LoadSource from './components/loadSource'

export interface PlatProps {
  tab: any
}

const Plat: React.FC<PlatProps> = (props) => {
  const { tab } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // getLogData()
  }, [tab])


  return (
    <div className='plat_page'>
      <div className='plat_page_item_title'>能力集合</div>
      <div className='plat_page_content'>
        <div className='plat_page_item'>
          <LoadSource tab={tab} />
        </div>
      </div>
    </div>
  )
}

export default Plat
