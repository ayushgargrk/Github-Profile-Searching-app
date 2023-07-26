import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux';
// 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
// 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
// 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


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
