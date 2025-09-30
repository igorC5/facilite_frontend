import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { HandCoins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardModulo from "./Components/CardModulo";
import { useEffect, useState } from "react";
import CardSelecionado from "./Components/CardSelecionado";
import { useModulos } from "@/configs/SubModulesConfigs";
import BottomBar from "@/components/BottomBar/BottomBar";
import type { IJanelaSimples } from "@/components/Janelas/JanelaSimples";

const Homepage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.800");
  const modulos = useModulos();
  const [janelas, setJanelas] = useState<{ id: number; minimizada: boolean}[]>([]);

  useEffect(() => {
    console.log(janelas)
  }, [janelas])

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
    <>
      <Flex bg={bg} color="black" w="100vw" h="100vh" flexDir="column">
        <Flex h="90vh" flexDir="column" w="100%">
          <Flex>
            <Button 
              borderWidth="2px" 
              borderColor="black"
              onClick={() => handleLogout()}
            >
              Sair
            </Button>
          </Flex>
          <Flex w="100%">
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
                addJanela={(e) => {
                  if (!janelas.some(jan => jan.id === e)) {
                    setModSelecionado(0)
                    setJanelas(prev => [...prev, 
                      { 
                        id: e, 
                        minimizada: false,
                      }
                    ])
                  }
                }}
              />
            </Flex>
          </Flex>
        </Flex>
        <BottomBar janelas={janelas} />
      </Flex>

      {janelas?.map(janela => {
        const modulo = modulos?.find(mod =>
          mod.opcoes?.some(op => op.janelaId === janela.id)
        );
        const submodulo = modulo?.opcoes.find(sub => sub.janelaId === janela.id);
        const Componente: IJanelaSimples = submodulo?.componente;
      
        return modulo ? (
          <Componente 
            open={true} 
            fecharJanela={() => {
              setJanelas(prev => prev.filter(jan => jan.id !== janela.id))
            }} 
          />        
        ) : null;
      })}
    </>
  )
}

export default Homepage;