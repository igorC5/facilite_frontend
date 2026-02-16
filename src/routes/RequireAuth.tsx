import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Flex, Heading } from '@chakra-ui/react'

export function RequireAuth() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Flex>
        <Heading>carregando</Heading>
      </Flex>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
