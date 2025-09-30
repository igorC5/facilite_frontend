import { Flex, Spacer, Text } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";
import { useModulos } from "@/configs/SubModulesConfigs";
import { useEffect, useState } from "react";

interface IBottomBar {
  janelas: {
    id: number;
    minimizada: boolean;
  }[]
  focaJanela: any;
}

const BottomBar: React.FC<IBottomBar> = ({janelas, focaJanela}) => {
  const bg = useColorModeValue('blue.500', 'blue.700');
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
      bg={bg}
      h="10vh" 
      px="3"
      borderTopWidth="1px"
      align="center"
      justify="center"
    >
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