import { createBrowserHistory } from 'history'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import { AppDndProvider, ChosenThemeProvider, StoreProvider, ThemeProvider } from '@/providers'

export const history = createBrowserHistory()

import { NotificationProvider } from '@component/notifier'

import { App } from './App'

import('@/services/api/mocks/browser')
  .then(({ worker }) => {
    return worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`
      }
    })
  })
  .then(() => {
    ReactDOM.render(
      <StrictMode>
        <StoreProvider>
          <AppDndProvider>
            <ChosenThemeProvider>
              <ThemeProvider>
                <NotificationProvider>
                  <Router>
                    <App />
                  </Router>
                </NotificationProvider>
              </ThemeProvider>
            </ChosenThemeProvider>
          </AppDndProvider>
        </StoreProvider>
      </StrictMode>,
      document.getElementById('root')
    )
  })
  .catch(e => {
    console.log(e)
  })
