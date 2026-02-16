import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Login from './pages/Login/Login'
import { RequireAuth } from './routes/RequireAuth'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path='/Homepage' element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
