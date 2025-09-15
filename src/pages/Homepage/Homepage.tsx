import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { HandCoins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardModulo from "./Components/CardModulo";
import { useState } from "react";
import CardSelecionado from "./Components/CardSelecionado";
import { useModulos } from "@/configs/SubModulesConfigs";

const Homepage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.800");
  const modulos = useModulos();

  const [modSelecionado, setModSelecionado] = useState(0);
  const HandleModSelecionado = (num: number) => {
    if (modSelecionado === num) {
      setModSelecionado(0);
    } else {
      setModSelecionado(num);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }


  return (
    <Flex bg={bg} color="black" w="100vw" h="100vh" flexDir="column">
      <Flex h="8%" align="center" pl="3">
        <Button 
          borderWidth="2px" 
          borderColor="black"
          onClick={() => handleLogout()}
        >
          Sair
        </Button>
      </Flex>
      <Flex h="84%" m="80px">
        <Flex w="60%">
          <SimpleGrid 
            w="100%" 
            columns={3} 
            gap="40px"
            p="6"
          >
            {modulos.map(mod => {
              return (
                <CardModulo 
                  titulo={mod.titulo}
                  cor={mod.cor}
                  icon={mod.icon ? mod.icon : <HandCoins size="120" strokeWidth={1.5} />}
                  selecionado={modSelecionado === mod.id}
                  acao={() => HandleModSelecionado(mod.id)}
                />
              )
            })}
          </SimpleGrid>
        </Flex>
        <Flex w="40%">
          <CardSelecionado 
            cor={modulos.find(mod => mod.id === modSelecionado)?.cor}
            titulo={modulos.find(mod => mod.id === modSelecionado)?.titulo}
            opcoes={modulos.find(mod => mod.id === modSelecionado)?.opcoes}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Homepage;