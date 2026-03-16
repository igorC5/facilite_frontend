import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Flex, Heading } from '@chakra-ui/react'
import { Mosaic } from 'react-loading-indicators'

export function RequireAuth() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Flex flexDir="column" h="100vh">
        <Flex flexDir="column" h="90%">
          <Flex 
            maxW="100vw"
            overflowX="hidden"
            bg="blue.500"
          >
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
          </Flex>
          <Flex 
            maxW="100vw"
            overflowX="hidden"
            bg="blue.500"
          >
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
          </Flex>
          <Flex 
            maxW="100vw"
            overflowX="hidden"
            bg="blue.500"
          >
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
            <Mosaic color="#006eff" size="large" text="" textColor=""  style={{ fontSize: '53px' }} />
          </Flex>
        </Flex>
        <Flex bg="yellow.400" h="14%">
          <Heading 
            color="white" 
            textAlign="center" 
            fontSize="6xl"
            m="auto"
          >
            Carregando...
          </Heading>
        </Flex>
      </Flex>
    )
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
