import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import ColorModeSwitcher from './ColorModeSwitcher'


import './index.css'
import { store } from './store'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store} >
    <React.StrictMode>
    <ColorModeScript />
      <ChakraProvider theme={theme}>
      <ColorModeSwitcher />
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
)
