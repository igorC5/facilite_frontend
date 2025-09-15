import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Homepage from './pages/Homepage/Homepage'
import { PrivateRoute } from './routes/PrivateRoute'
import Clientes from './pages/Vendas/ClientesFornecedores/Clientes/Clientes'
import Fornecedores from './pages/Vendas/ClientesFornecedores/Fornecedores/Fornecedores'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='*' element={<Login />} />
        
        <Route path='/Homepage' element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute> 
        } />

        <Route 
          path='/Vendas/Clientes-Fornecedores/Clientes'
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        
        <Route 
          path='/Vendas/Clientes-Fornecedores/Fornecedores'
          element={
            <PrivateRoute>
              <Fornecedores />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
