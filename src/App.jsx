import { useRoutes } from "react-router-dom"
import { routes } from "./routers"
import { Spin, message } from 'antd'
import { LoadingOutlined } from "@ant-design/icons"

message.config({
  maxCount: 3
})

Spin.setDefaultIndicator(<LoadingOutlined />)

function App() {
  const element = useRoutes(routes)
  return element
}

export default App
