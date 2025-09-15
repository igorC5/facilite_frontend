import { Flex, Spacer, Text } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "../ui/color-mode"
import { useModulos } from "@/configs/SubModulesConfigs";
import { useLocation } from "react-router-dom";

const BottomBar = () => {
  const bg = useColorModeValue('blue.500', 'blue.700');
  const modulos = useModulos();
  const location = useLocation();

  return (
    <Flex
      bg={bg}
      h="10vh" 
      px="3"
      borderTopWidth="1px"
      align="center"
      justify="center"
      >
      <Spacer />
      <Flex h="100%" align="center" justify="center" gridGap="12">
        {modulos?.map(mod => {
          const isModuloAtual = location.pathname.startsWith(`/${mod.titulo}`)
          // alert(isModuloAtual);
          return (
            <Flex 
              fontSize="2xl" 
              h="100%" 
              align="center" 
              borderTopWidth="3px" 
              borderColor={isModuloAtual ? 'white' : bg}
              boxShadow={isModuloAtual ? "inset 0 20px 6px -6px rgba(255, 255, 255, 0.3)" : ""}
              cursor="pointer"
            >
              <Text textAlign="center" color="white">{mod.titulo}</Text>
            </Flex>
          )
        })}
      </Flex>
      <Spacer />
      <Flex>
        <ColorModeButton />
      </Flex>
    </Flex>
  )
}

export default BottomBar;