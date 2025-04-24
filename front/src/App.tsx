import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Inscricao from './pages/Inscricao'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './ProtectedRouter'
import LoginAdm from './pages/LoginAdm'
import HomeAdm from './pages/HomeAdm'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={ProtectedRoute}>
            <Route path='home-adm' Component={HomeAdm} />
          </Route>
          <Route path='/adm' Component={LoginAdm} />
          <Route path='/' Component={Inscricao} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
