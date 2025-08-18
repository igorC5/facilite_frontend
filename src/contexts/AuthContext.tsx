// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

interface AuthContextData {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // exemplo simples com localStorage
    return !!localStorage.getItem('token')
  })

  function login() {
    localStorage.setItem('token', 'fake-token')
    setIsAuthenticated(true)
  }

  function logout() {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
