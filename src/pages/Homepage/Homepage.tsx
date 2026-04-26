import BottomBar from "@/components/BottomBar/BottomBar";
import type { IJanelaSimples } from "@/components/Janelas/JanelaSimples";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useModulos } from "@/configs/SubModulesConfigs";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Flex, Heading, Icon, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardModulo from "./Components/CardModulo";
import CardSelecionado from "./Components/CardSelecionado";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { consultaModulo } from "@/configs/modulosConfigs";

interface IJanelas {
  id: number; 
  minimizada: boolean; 
  zIndex: number
}

const Homepage = () => {
  const { logout } = useAuth();
  const bg = useColorModeValue("blue.500", "gray.800");
  const queryClient = useQueryClient();
  const modulos = useModulos();
  const [janelas, setJanelas] = useState<{ id: number; minimizada: boolean; zIndex: number}[]>([]);
  const [modulosDisponiveis, setModulosDisponiveis] = useState(null);
  const dadosLogin = (() => {
    try {
      const data = localStorage.getItem('usuario');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  })();

  const [modSelecionado, setModSelecionado] = useState(0);
  const HandleModSelecionado = (num: number) => {
    if (modSelecionado === num) {
      setModSelecionado(0);
    } else {
      setModSelecionado(num);
    }
  }

  useEffect(() => {
    const load = async () => {
      const response = await api.get(`/empresas/${dadosLogin?.empresa}/modulos`);
      setModulosDisponiveis(response.data);
    }
    
    load();
  }, [dadosLogin?.empresa]);

  const handleLogout = () => {
    logout();
    queryClient.clear();
  }

  return (
    <>
      <Flex 
        // bg={bg} 
        bgGradient='to-br'
        gradientFrom="blue.600"
        gradientTo="blue.400"
        color="black" 
        w="100vw" 
        h="100vh" 
        flexDir="column"
      >
        <Flex h="92vh" flexDir="column" w="100%">
          <Flex align="center">
            <Button 
              borderWidth="2px" 
              borderColor="black"
              onClick={() => handleLogout()}
            >
              Sair
            </Button>
            <Heading color={useColorModeValue("black", "white")} pl="2">
              {dadosLogin?.nome_empresa} - {dadosLogin?.filial} - {dadosLogin?.usuario}
            </Heading>
          </Flex>
          <Flex 
            w="100%"
            h="100%"
            backgroundSize="100px 140px"
            backgroundAttachment="fixed"
            backgroundImage={`
              linear-gradient(to right, rgba(255, 255, 255, 0.479) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.479) 1px, transparent 1px)
            `}
          >
            {modulosDisponiveis?.map(mod => {
              const dadosModulo = consultaModulo(mod?.id);
              return (
                <Flex 
                  key={mod.id}
                  w="100px" 
                  h="100px" 
                  flexDir="column" 
                  align="center"
                  cursor="pointer"
                  onClick={() => {

                    // desfazer minimizacao
                    if (janelas.some(jan => jan.id === dadosModulo?.janelaId && jan.minimizada)) {
                      setJanelas(prev => prev.map(
                        prevJanela => prevJanela.id === dadosModulo?.janelaId
                        ? {...prevJanela, minimizada: false}
                        : prevJanela
                      ))
                    }

                    // abrir janela
                    if (!janelas.some(jan => jan.id === dadosModulo?.janelaId)) {
                      setModSelecionado(0)
                      setJanelas(prev => [...prev, 
                        { 
                          ...dadosModulo,
                          id: dadosModulo?.janelaId, 
                          minimizada: false,
                          zIndex: 1,
                        }
                      ])
                    }
                  }}
                >
                  <Image 
                    src="/public/icones/vendas.webp" 
                    boxSize="70px"
                    objectFit="contain"
                  />
                  <Text fontWeight="medium">{mod?.nome}</Text>
                </Flex>
              )
            })}
          </Flex>
          {/* <Flex w="100%">
            <Flex w="60%">
              <SimpleGrid
                w="100%" 
                columns={3} 
                columnGap="40px"
                rowGap="40px"
                p="6"
                alignItems="start" 
                alignContent="start"
              >
                {modulos.map(mod => {
                  return (
                    <CardModulo 
                      titulo={mod.titulo}
                      cor={mod.cor}
                      icon={mod.icon}
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
          </Flex> */}
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
        const modulo = consultaModulo(janela.id);
        // const modulo = modulosDisponiveis?.find(mod => mod?.janelaId === janela?.id);
        // const submodulo = modulo?.opcoes.find(sub => sub.janelaId === janela.id);
        const Componente: IJanelaSimples = modulo?.componente;
        console.log(janela)
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