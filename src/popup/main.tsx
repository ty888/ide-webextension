import Popup from './Popup'
import * as ReactDOM from 'react-dom/client'
import zhCN from 'antd/locale/zh_CN';
import '../styles'
import { ConfigProvider } from 'antd';

const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(
    <ConfigProvider locale={zhCN}>
      <Popup />
    </ConfigProvider>
  )
}
