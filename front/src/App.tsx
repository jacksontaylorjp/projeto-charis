import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Inscricao from './pages/Inscricao'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './ProtectedRouter'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={ProtectedRoute}>
            <Route path='/home' Component={Home} />
          </Route>
          <Route path='/' Component={Inscricao} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
