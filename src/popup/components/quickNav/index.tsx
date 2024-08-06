import { useStorageLocal } from '@/hooks/useStorageLocal'
import { ReactDOM, ReactElement, useEffect, useState } from 'react'
import { sendMessage, onMessage } from 'webext-bridge/popup'
import { Button, Form, Input, message, Modal, Result, Spin, Switch, Tabs, TabsProps } from 'antd'
import { IlogType, IquickNav } from '@/type'
import './index.css'
import { StorageLocalKey } from '@/constant'
import { title } from 'process'

export interface LogProps {
  data: IquickNav[]
  loading: boolean
}

const QuickNav: React.FC<LogProps> = (props) => {
  const { data, loading } = props
  const [form] = Form.useForm();

  const [value, setValue] = useStorageLocal<IquickNav[]>({
    key: StorageLocalKey.QUICK_NAV, initialValue: [
      { title: '自定义导航', content: [] }
    ]
  })
  const [visable, setVisable] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const returnDom = (data: IquickNav[], type?: 'edit'): JSX.Element[] | false => {
    return data && data?.length > 0 && data?.map(navItem => {
      return <div key={navItem.title} className='quickNav_content'>
        <div className='quickNav_content_title'>{navItem.title}</div>
        <div className='quickNav_content_item'>
          {
            navItem?.content.map(item => {
              return (
                <div key={item.url} className='quickNav_content_item_btn' >
                  <span onClick={() => {
                    browser.tabs.create({ url: item.url })
                  }}>{item.title}</span>
                  {
                    type === 'edit' && <div onClick={() => {onDeleteCustom(item)}} className='quickNav_content_item_btn_delete' style={{ display: isEdit ? 'flex' : 'none' }}>×</div>
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    })
  }

  const onDeleteCustom = (data: {url: string, title: string}) => {
    const _value: IquickNav = { ...value?.[0] } as IquickNav
    _value.content = _value.content.filter(item => item.url !== data.url)
    setValue([_value])
  }

  const onOk = () => {
    form.validateFields().then(res => {
      const _value: IquickNav = { ...value?.[0] } as IquickNav
    
      if(_value?.content?.findIndex(item => item.url === res.url) !== -1) {
        message.error('URL重复，请修改。')
        return
      }

      _value?.content?.push(res)
      setValue([_value])
      setVisable(false)
      form.resetFields()
    }).catch(e => {
      console.error(e)
    })
  }

  return (
    <div className='quickNav'>
      <header className='quickNav_header'>
        <Button onContextMenu={() => {}} size="middle" type="primary" style={{ marginRight: 8 }} onClick={() => { setVisable(true) }}>添加自定义导航</Button>
        <Button size="middle" type={isEdit ? 'primary' : 'default' } onClick={() => { setIsEdit(!isEdit) }}>{ isEdit ? '退出编辑' : '编辑' }</Button>
      </header>
      <Spin spinning={loading}>
        {returnDom(data)}
        {returnDom(value || [], 'edit')}
      </Spin>
      <Modal
        title="添加导航"
        open={visable}
        onOk={onOk}
        destroyOnClose
        onCancel={() => {setVisable(false)}}
      >
        <Form
          layout="horizontal"
          form={form}
          name="control-hooks"
          onFinish={(v) => { console.log(v) }}
        >
          <Form.Item name="url" label="导航地址" rules={[{ required: true }, { type: 'url' }]}>
            <Input allowClear onPressEnter={onOk} placeholder='请输入正确的URL地址' />
          </Form.Item>
          <Form.Item name="title" label="导航名称" rules={[{ required: true }]}>
            <Input allowClear onPressEnter={onOk} placeholder='请输入导航名称' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default QuickNav
