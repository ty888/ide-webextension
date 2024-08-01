import logo from '@/assets/logo.svg'
import { useStorageLocal } from '@/hooks/useStorageLocal'
import { useState } from 'react'
import { Button } from 'antd'
import './Popup.css'

const Popup = () => {

  return (
    <div className="popup">
      <header className='popup_header'>
        <img src="https://sunmi-file.oss-cn-hangzhou.aliyuncs.com/MaxProgram/max23_ic_logo_28.png" alt="" />
        <h3>大程序辅助工具🔧</h3>
      </header>
      <section>
        <Button type='primary'>测试穿透</Button>
      </section>
    </div>
  )
}

export default Popup
