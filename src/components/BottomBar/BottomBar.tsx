import { Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { useModulos } from "@/configs/SubModulesConfigs";
import { useEffect, useState } from "react";
import MenuIniciar from "../MenuIniciar/MenuIniciar";

interface IBottomBar {
  janelas: {
    id: number;
    minimizada: boolean;
  }[]
  focaJanela: any;
}

const BottomBar: React.FC<IBottomBar> = ({janelas, focaJanela}) => {
  const bg1 = useColorModeValue('teal.400', 'teal.400');
  const bg2 = useColorModeValue('teal.600', 'teal.600');
  const modulos = useModulos();
  
  const [janelasBarra, setJanelasBarra] = useState<{id: number; titulo: string}[]>([]);
  
  useEffect(() => {
    const janelasAtivas: {id: number; titulo: string}[] = [];

    janelas?.forEach(janela => {
      for (const modulo of modulos) {
        const opc = modulo.opcoes?.find(op => op.janelaId === janela.id);
        if (opc) {
          janelasAtivas?.push({
            id: opc.janelaId || 0,
            titulo: opc.texto,
          });
          break;
        }
      }
    });
    
    setJanelasBarra(janelasAtivas)
  }, [janelas])

  return (
    <Flex
      // bg={bg}
      bgGradient='to-b'
      gradientFrom={bg1}
      // gradientVia='teal.500'
      gradientTo={bg2}
      h="8vh" 
      // px="3"
      borderTopWidth="1px"
      align="center"
      justify="center"
    >
      <MenuIniciar />
      {
        janelasBarra.map(janela => {
          return (
            <Flex 
              cursor="pointer"
              ml="2" 
              p="2" 
              borderWidth="1px" 
              rounded="2xl"
              onClick={() => {
                focaJanela(janela.id)
              }}
            >
              <Text>{janela.titulo}</Text>
            </Flex>
          )
        })
      }
      <Spacer />
      <Flex h="100%" align="center" justify="center" gridGap="12">
      </Flex>
      <Spacer />
      <Flex>
        <ColorModeButton />
      </Flex>
    </Flex>
  )
}

export default BottomBar;