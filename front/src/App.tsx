import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Landingpage from './pages/Landingpage'
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
          <Route path='/' Component={Landingpage} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
