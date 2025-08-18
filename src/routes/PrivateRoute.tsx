import { Navigate } from 'react-router'
import { useAuth } from '../contexts/AuthContext'
import type { ReactNode } from 'react'

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()

  return isAuthenticated ? children : <Navigate to="/" replace />
}
