import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import { appThemes } from './app/themes';
import { ThemesContext } from './contexts/ThemesContext';

import { prepopulate } from './app/prepopulate';

import './index.css';
import './icon.css';

prepopulate(store);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemesContext.Provider value={appThemes}>
        <App />
      </ThemesContext.Provider>
    </Provider>
  </React.StrictMode>
);
