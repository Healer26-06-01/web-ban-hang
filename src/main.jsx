import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/tailwind.css'
import { Provider } from 'react-redux'
import { store } from './stores'
import { BrowserRouter } from 'react-router-dom'
import { TranslateProvider } from './components/TranslateProvider'
import china from '@/locales/china.json'
import vi from '@/locales/vi.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <TranslateProvider defaultLang="vi" translate={{
        china,
        vi
      }}>
        <App />
      </TranslateProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
