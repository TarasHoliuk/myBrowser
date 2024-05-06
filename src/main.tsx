import React from 'react';
import ReactDOM from 'react-dom/client';
import MyBrowser from './components/MyBrowser';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MyBrowser expandedFolders={['/Common7/IDE']} />
  </React.StrictMode>,
)
