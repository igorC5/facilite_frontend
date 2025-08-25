import { SubModulesConfigs } from "@/configs/SubModulesConfigs";
import type { Modulo, NomesModulos, NomesSubModulos, NomesSubModulosPages, SubModulo } from "@/types/SubModulesConfigs";
import { Flex, Text, VStack } from "@chakra-ui/react"
import type React from "react";
import { useColorModeValue } from "../ui/color-mode";
import { useNavigate } from "react-router-dom";
import { useColors } from "@/styles/cores";

interface ISubModuleBar {
  modulo: NomesModulos;
  submodulo: NomesSubModulos;
  page: NomesSubModulosPages;
}

const SubModuleBar: React.FC<ISubModuleBar> = ({
  modulo,
  submodulo,
  page,
}) => {
  const config = SubModulesConfigs;
  const color = useColorModeValue("gray.700", "gray.100");  
  const AtualColor = useColorModeValue("white", "white");  
  const buttonBg = useColorModeValue('gray.200', 'gray.600');
  const AtualButtonBg = useColorModeValue('blue.500', 'blue.800');
  
  const moduloAtual = config.find(mod => mod.nome_mod === modulo);
  const subModuloAtual = moduloAtual?.subModulos.find(submod => submod.nome_sub === submodulo);

  const navigate = useNavigate();
  const Colors = useColors();

  return (
    <Flex borderRightWidth="2px" w="13vw" flexDirection="column" bg={Colors.bgComponentes}>
      <Flex w="100%" borderBottomWidth="1px" h="100px">
        <Text>BARRAS</Text>
      </Flex>
      <Flex>
        <Flex flexDir="column" w="100%">
          {
            subModuloAtual?.pages.map(pag => {
              return (                
                <Flex 
                  bg={pag.nome_page === page ? AtualButtonBg : buttonBg}
                  rounded="2xl"
                  p="2"
                  m="2"
                  cursor="pointer"
                  onClick={() => {
                    console.log(pag.path)
                    navigate(pag.path)
                  }}
                >
                  <Text
                    fontWeight="medium"
                    color={pag.nome_page === page ? AtualColor : color}
                  >
                    {pag.nome_page}
                  </Text>
                </Flex>
              )
            })
          }
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SubModuleBar;