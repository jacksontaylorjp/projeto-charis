import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './ProtectedRouter'
import Home from './pages/adm/Home'
import Login from './pages/adm/Login'
import Inscricao from './pages/user/Inscricao'
import NotFound from './pages/NotFound'
import MainLayout from './MainLayout'
import Inscricoes from './pages/adm/Inscricoes'
import Registration from './pages/adm/Registration'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={ProtectedRoute}>
            <Route Component={MainLayout}>
              <Route path='/adm/home' Component={Home} />
              <Route path='/adm/inscricoes' Component={Inscricoes} />
              <Route path='/adm/inscricoes/:id' Component={Registration} />
            </Route>
          </Route>
          <Route path='/adm/login' Component={Login} />
          <Route path='/' Component={Inscricao} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
