import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
Modal.setAppElement('#App');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider store={store}> */}
      <App />
      {/* </Provider>{' '} */}
    </BrowserRouter>
  </React.StrictMode>,
);