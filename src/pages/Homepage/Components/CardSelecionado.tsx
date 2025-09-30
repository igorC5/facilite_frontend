import { useColorModeValue } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface ICardSelecionado {
  cor?: string;
  titulo?: string;
  opcoes: any;
  addJanela: any;
}

const CardSelecionado: React.FC<ICardSelecionado> = ({
  cor,
  titulo,
  opcoes,
  addJanela,
}) => {
  const color = useColorModeValue("gray.800", "gray.100");
  const navigate = useNavigate();

  return (
  <Flex
    align="center" 
    w="100%" 
    bg={cor}
    rounded="2xl"
    mx="20"
    flexDir="column"
    userSelect="none"
  >
    <Text
      fontWeight="medium"
      fontSize={40}
      color={color}
    >
      {titulo}
    </Text>
    <Flex
      flexDir="column"
      w="100%"
      h="500px"
      overflowY="auto"
      position="relative"
    >
      {opcoes?.map(opc => {
        return (
          <Flex
            my="2"
            mx="5"
            rounded="2xl"
            p="5"
            bg="rgba(0,0,0,0.1)"
            cursor="pointer"
            borderWidth="2px"
            borderColor="black"
            onClick={() => {
              if (opc.janelaId) {
                addJanela(opc.janelaId, opc)
              }
              if (opc.path) {
                navigate(opc.path)
              }
            }}
          >
            <Text 
              color={color}
              fontWeight="medium"
            >
              {opc.texto}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  </Flex>
  )
}

export default CardSelecionado;