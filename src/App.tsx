import './App.css'
import AppRouter from './router/Routers'
import { AuthProvider, ThemeProvider } from './contexts'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
