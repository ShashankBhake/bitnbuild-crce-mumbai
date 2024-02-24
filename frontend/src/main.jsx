import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher'


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
