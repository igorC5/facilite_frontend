import { useAuth } from "@/contexts/AuthContext";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/Homepage');
  }

  return (
    <Flex w="100vw" h="100vh" bg="cyan.700" alignItems="center" justifyContent="center">
      <Flex bg="white" flexDir="column" color="black">
        <Text>Facilite</Text>
        <Input />
        <Input type="password" />
        <Button onClick={() => handleLogin()}>
          logar
        </Button>
      </Flex>
    </Flex>
  )
}

export default Login;