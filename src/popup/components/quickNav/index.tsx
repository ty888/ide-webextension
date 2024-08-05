import { useStorageLocal } from '@/hooks/useStorageLocal'
import { useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Result, Switch, Tabs, TabsProps } from 'antd'
import { IlogType, IquickNav } from '@/type'
import './index.css'

export interface LogProps {
  data: IquickNav[]
}

const QuickNav: React.FC<LogProps> = (props) => {
  const { data } = props

  return (
    <div className='quickNav'>
      {
        data && data?.length > 0 && data?.map(navItem => {
          return <div>
            <div>{navItem.title}</div>
            <div>
              {
                navItem?.content.map(item => {
                  return <a href={item.url}> {item.title}</a>
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
}

export default QuickNav
