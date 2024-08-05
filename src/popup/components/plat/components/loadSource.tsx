import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Input, message, Modal, Tooltip } from 'antd'
import './index.css'
import { isCDNJSFile } from '@/utils'

export interface PlatProps {
  tab: any
}

const LoadSource: React.FC<PlatProps> = (props) => {
  const { tab } = props
  const [visible, setVisible] = useState(false)
  const [resourcesAddress, setResourcesAddress] = useState('')

  const resourcesList = [
    { title: '血缘清洗', value: 'https://static.cdn.sunmi.com/unpkg/@sm/plugin-ide-trigger-save/0.0.1-beta3/dist/index.umd.production.js' },
    { title: '清洗工程外转工程内', value: 'https://static.cdn.sunmi.com/unpkg/@sm/plugin-ide-schema-wash/1.0.0-beta1/dist/index.umd.production.js' }
  ]
  const onOk = async () => {
    if (isCDNJSFile(resourcesAddress)) {
      await sendMessage("run", {
        type: 'loadResources',
        data: {
          value: resourcesAddress
        },
      }, "content-script@" + tab.id);

      message.success('加载成功！')
      setVisible(false)
    } else {
      message.error('资源地址需包含 sunmi.com 且以js/cjs结尾！')
    }
  }

  return (
    <div className='loadSource'>
      <Tooltip title="用于加载外部资源，如：血缘删除插件、xxsunmi.com/xx/.js">
        <Button type='primary' onClick={() => { setVisible(true) }}>加载资源</Button>
      </Tooltip>
      <Modal
        title="加载/注入外部插件"
        open={visible}
        onOk={onOk}
        onCancel={() => { setVisible(false) }}
        okButtonProps={{
          disabled: !resourcesAddress
        }}

        okText="加载资源"
        cancelText="取消"
      >
        <div className="loadSource_content">
          <div className="loadSource_btn">
            {
              resourcesList?.map(item => {
                return <Button size='small' key={item.value} type='primary' onClick={() => {
                  setResourcesAddress(item.value)
                }}>{item.title}</Button>
              })
            }
          </div>
          <Input allowClear onChange={(v) => { setResourcesAddress(v.target.value) }} placeholder='输入资源地址(https://static.cdn.sunmi.com/xxx.js)' value={resourcesAddress} />
        </div>
      </Modal>
    </div>
  )
}

export default LoadSource
