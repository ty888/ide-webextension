import { useStorageLocal } from '@/hooks/useStorageLocal'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, message, Result, Tabs, TabsProps, Tag } from 'antd'
import { createClient } from "@supabase/supabase-js";
import './Popup.css'
import Log from './components/log'
import Plat from './components/plat'
import { returnEnv } from '@/utils'
import QuickNav from './components/quickNav'
import { IquickNav } from '@/type';

const supabase = createClient("https://ccpvakrsvkswtmcxidbz.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjcHZha3Jzdmtzd3RtY3hpZGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI4NTE1MDMsImV4cCI6MjAzODQyNzUwM30.mVqjLZS4Yi64EguhiztSgp1VcsYVVclod4Q0f7ueoVE");

const Popup = () => {
  const [tab, setTab] = useState<any>()
  const [isIde, setIsIde] = useState(true)

  const [quickNav, setQuickNav] = useState<IquickNav[]>([])
  const [quickNavLoading, setQuickNavLoading] = useState(false)


  const getCurrentTab = async () => {
    let [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true
    });
    setTab({ ...tab })
    return tab
  }

  async function getCountries() {
    setQuickNavLoading(true)
    const { data, error } = await supabase.from('quick-nav').select()
    if (error) {
      message.error('获取快捷导航失败。' + error.message)
      console.log(error)
      setQuickNavLoading(false)
      return
    }
    setQuickNavLoading(false)
    setQuickNav(data || [])
  }

  useEffect(() => {
    const init = async () => {
      const tab = await getCurrentTab()
      if (!tab.url?.includes('sunmi.com')) {
        setIsIde(false)
      }
    }
    init()
    getCountries()
  }, [])

  const tabItems: TabsProps['items'] = [
    { key: 'plat', label: '平台开发', children: <Plat tab={tab} /> },
    // { key: 'business', label: '业务开发', children: 'Content of Tab Pane 2' },
    { key: 'log', label: '日志控制', children: <Log tab={tab} /> },
    // { key: 'utils', label: '工具能力', children: 'Content of Tab Pane 3' },
    { key: 'quickNav', label: '快捷导航', children: <QuickNav loading={quickNavLoading} data={quickNav} /> },
  ];

  return (
    <>
      {
        isIde ? <div className="popup">
          <header className='popup_header'>
            <img src="https://sunmi-file.oss-cn-hangzhou.aliyuncs.com/MaxProgram/max23_ic_logo_28.png" alt="" />
            <h3>👾 大程序辅助工具 </h3> <Tag color="success">{returnEnv(tab?.url)}</Tag>
          </header>
          <section className='popup_body'>
            <Tabs
              defaultActiveKey="plat"
              centered
              items={tabItems}
              onChange={(v) => { }}
              indicator={{ size: (origin) => origin - 20, align: 'center' }}
            />
          </section>
        </div> : <div>
          <Result
            status="404"
            title="环境异常"
            subTitle="请在大程序环境下使用。"
            extra={<Button type="primary" onClick={() => {
              browser.tabs.create({ url: 'https://developer.sunmi.com/workspace/base/workbench' });
            }}>GO TO IDE</Button>}
          />
        </div>
      }
    </>
  )
}

export default Popup
