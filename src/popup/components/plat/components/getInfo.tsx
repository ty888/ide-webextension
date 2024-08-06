import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Input, message, Modal, Tooltip } from 'antd'
import './index.css'
import { isCDNJSFile } from '@/utils'

export interface GetInfoProps {
  tab: any
}

type GetInfoTypes = 'ide' | 'projectInfo' | 'env' | 'currentPageInfo' | 'getPluginInfo'

const GetInfo: React.FC<GetInfoProps> = (props) => {
  const { tab } = props
  // const [visible, setVisible] = useState(false)
  // const [resourcesAddress, setResourcesAddress] = useState('')

  const get = async (type: GetInfoTypes) => {
    await sendMessage("run", {
      type: 'getInfo',
      data: {
        value: type
      },
    }, "content-script@" + tab.id);
  }

  return (
    <div className='getInfo_page'>
      <div className='getInfo_page_content'>
        <Tooltip title="获取 IDE 信息，如：当前平台语言，当前资源ID">
          <Button type='primary' onClick={() => {get('ide')}}>获取 IDE</Button>
        </Tooltip>

        <Tooltip title="获取工程信息">
          <Button type='primary' onClick={() => {get('projectInfo')}}>获取 ProjectInfo</Button>
        </Tooltip>

        <Tooltip title="获取环境信息">
          <Button type='primary' onClick={() => {get('env')}}>获取 Env</Button>
        </Tooltip>

        <Tooltip title="获取当前页面信息">
          <Button type='primary' onClick={() => {get('currentPageInfo')}}>获取 currentPageInfo</Button>
        </Tooltip>

        <Tooltip title="获取当前页面信息">
          <Button type='primary' onClick={() => {get('getPluginInfo')}}>查看插件信息</Button>
        </Tooltip>
      </div>

      {/* <Modal
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
      </Modal> */}
    </div>
  )
}

export default GetInfo
