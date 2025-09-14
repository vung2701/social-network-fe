import './App.css'
import AppRouter from './router/Routers'
import { ReduxProvider } from './store/ReduxProvider'
import { ThemeProvider } from './contexts'

function App() {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
