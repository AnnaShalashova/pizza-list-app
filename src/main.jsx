import './index.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './containers/ErrorBoundry/ErrorBoundry.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6B717E',
    },
    secondary: {
      main: '#ff9d26',
      light: '#6B717E',
    },
  },
});

async function initApp() {
  const { worker } = await import('../mocks/server/browser.js');
  await worker.start();
}

initApp().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>,
  );
});
