import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { HandCoins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardModulo from "./Components/CardModulo";
import { useEffect, useState } from "react";
import CardSelecionado from "./Components/CardSelecionado";
import { useModulos } from "@/configs/SubModulesConfigs";
import BottomBar from "@/components/BottomBar/BottomBar";
import type { IJanelaSimples } from "@/components/Janelas/JanelaSimples";

interface IJanelas {
  id: number; 
  minimizada: boolean; 
  zIndex: number
}

const Homepage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.800");
  const modulos = useModulos();
  const [janelas, setJanelas] = useState<{ id: number; minimizada: boolean; zIndex: number}[]>([]);

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
                addJanela={(janelaID, opcs) => {
                  console.log(janelaID)
                  console.log(opcs)

                  // desfazer minimizacao
                  if (janelas.some(jan => jan.id === janelaID && jan.minimizada)) {
                    setJanelas(prev => prev.map(
                      prevJanela => prevJanela.id === janelaID 
                      ? {...prevJanela, minimizada: false}
                      : prevJanela
                    ))
                  }

                  // abrir janela
                  if (!janelas.some(jan => jan.id === janelaID)) {
                    setModSelecionado(0)
                    setJanelas(prev => [...prev, 
                      { 
                        ...opcs,
                        id: janelaID, 
                        minimizada: false,
                        zIndex: 1,
                      }
                    ])
                  }
                  
                }}
              />
            </Flex>
          </Flex>
        </Flex>
        <BottomBar 
          janelas={janelas} 
          focaJanela={(janelaID) => {
            // MELHORAR TODAS AS FUNCOES DE JANELAS FUTURAMENTE POR FAVOR
            if (janelas.some(jan => jan.id === janelaID)) {
              setJanelas(prev =>
                prev.map(
                  janela => janela.id !== janelaID
                  ? { ...janela, zIndex: 1 }
                  : janela
                )
              );
              setJanelas(prev => 
                prev.map(
                  janela => janela.id === janelaID
                  ? { ...janela, zIndex : 2 }
                  : janela
                )
              )
            }
            if (janelas.some(jan => jan.id === janelaID && jan.minimizada)) {
              setJanelas(prev => 
                prev.map(
                  prevJanela => prevJanela.id === janelaID 
                  ? {...prevJanela, minimizada: false}
                  : prevJanela
                )
              )
            }
          }}
        />
      </Flex>

      {janelas?.map(janela => {
        const modulo = modulos?.find(mod =>
          mod.opcoes?.some(op => op.janelaId === janela.id)
        );
        const submodulo = modulo?.opcoes.find(sub => sub.janelaId === janela.id);
        const Componente: IJanelaSimples = submodulo?.componente;
      
        return modulo ? (
          <Componente 
            janelaInfo={janela}
            open={true} 
            fecharJanela={(janelaID) => {
              setJanelas(prev => 
                prev.filter(jan => jan.id !== janelaID)
              )
            }}
            minimizada={janela.minimizada}
            zIndexJanela={janela.zIndex}
            setZIndexJanela={
              (foco) => {
                setJanelas(prev =>
                  prev.map(janela =>
                    janela.id !== foco
                      ? { ...janela, zIndex: 1 }
                      : janela
                  )
                );
                setJanelas(prev => 
                  prev.map(janela =>
                    janela.id === foco
                      ? { ...janela, zIndex : 2 }
                      : janela
                  )
                )
              }
            }
            minimiza={() => {
              setJanelas(prev => 
                prev.map(prevJanela => 
                  prevJanela.id === janela.id 
                  ? {...prevJanela, minimizada: true}
                  : prevJanela

                ))
            }}
          />        
        ) : null;
      })}
    </>
  )
}

export default Homepage;