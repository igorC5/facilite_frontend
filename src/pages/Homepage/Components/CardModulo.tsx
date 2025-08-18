import { useColorModeValue } from "@/components/ui/color-mode"
import { Flex, Icon, Text } from "@chakra-ui/react"
import type React from "react"

interface ICardModulo {
  titulo?: string,
  cor?: string,
  icon?: any,
  selecionado?: boolean,
  acao?: any;
}

const CardModulo: React.FC<ICardModulo> = ({ 
  titulo, 
  cor, 
  icon,
  selecionado,
  acao,
}) => {
  const color = useColorModeValue("gray.800", "gray.100");
  const sombraColor = useColorModeValue("#27272a", "#f4f4f5");

  return (
    <Flex 
      bg={cor ? cor :"red.500"}
      rounded="2xl"
      h="100%" 
      align="center" 
      flexDir="column"
      cursor="pointer"
      outlineWidth="2px"
      outlineColor={color}
      outlineStyle={selecionado ? "solid" : "none"}
      onClick={acao}
      boxShadow={`8px 8px 0px ${sombraColor}`}
 
    >
      <Icon color={color} mt="10%">1
        {icon && icon}
      </Icon>
      <Flex mt="20%">
        <Text 
          fontSize={30} 
          color={color}
          fontWeight="medium"
          userSelect="none"
        >
          {titulo}
        </Text>
      </Flex>
    </Flex>
  )
}

export default CardModulo;