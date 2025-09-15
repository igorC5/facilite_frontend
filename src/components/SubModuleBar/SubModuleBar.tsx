import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react"
import type React from "react";
import { useColorModeValue } from "../ui/color-mode";
import { useLocation, useNavigate } from "react-router-dom";
import { useColors } from "@/styles/cores";
import { FileJson } from "lucide-react";

interface ISubModuleBar {
  paginas?: {
    nome: string,
    url: string,
  }[]
}

const SubModuleBar: React.FC<ISubModuleBar> = ({
  paginas,
}) => {
  const location = useLocation();
  const color = useColorModeValue("gray.700", "gray.100");  
  const AtualColor = useColorModeValue("white", "white");  
  const buttonBg = useColorModeValue('gray.200', 'gray.600');
  const AtualButtonBg = useColorModeValue('blue.500', 'blue.800');
  
  const navigate = useNavigate();
  const Colors = useColors();

  return (
    <Flex borderRightWidth="2px" w="13vw" flexDirection="column" bg={Colors.bgComponentes}>
      <Flex w="100%" borderBottomWidth="1px" h="100px">
        <Box 
          w="100%" 
          p="4" 
          cursor="Pointer" 
          onClick={() => {
            navigate('/Homepage')
          }}
        > 
          <Icon as={FileJson} boxSize={14} />
        </Box>
      </Flex>
      <Flex>
        <Flex flexDir="column" w="100%">
          {paginas?.map(item => {
            return (
              <Flex 
                bg={item.url === location.pathname ? AtualButtonBg : buttonBg}
                rounded="2xl"
                p="2"
                m="2"
                cursor="pointer"
                onClick={() => {
                  navigate(item.url)
                }}
              >
                <Text
                  fontWeight="medium"
                  color={item.url === location.pathname ? AtualColor : color}
                >
                  {item.nome}
                </Text>
              </Flex>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SubModuleBar;