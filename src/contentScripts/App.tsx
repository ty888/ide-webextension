import { allowWindowMessaging } from 'webext-bridge'

const App = () => {
  allowWindowMessaging('12')
  return (
    <div>
      <div>Vitesse WebExt</div>
      <div></div>
    </div>
  )
}

export default App