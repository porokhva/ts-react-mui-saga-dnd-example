import { createBrowserHistory } from 'history'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'

import { AppDndProvider, ChosenThemeProvider, StoreProvider, ThemeProvider } from '@/providers'

export const history = createBrowserHistory()

import { NotificationProvider } from '@component/notifier'

import { worker } from '@/services/api/mocks/browser'

import { App } from './App'

if (import.meta.env.DEV) {
  worker.start()
}

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
