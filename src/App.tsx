import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Homepage from './pages/Homepage/Homepage'
import { PrivateRoute } from './routes/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        
        <Route path='/Homepage' element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute> 
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
