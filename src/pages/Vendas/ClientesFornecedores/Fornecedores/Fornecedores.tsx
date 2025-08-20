import BottomBar from "@/components/BottomBar/BottomBar"
import SubModuleBar from "@/components/SubModuleBar/SubModuleBar";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Flex, Text } from "@chakra-ui/react"

const Fornecedores = () => {
  const bg = useColorModeValue("gray.100", "gray.800");  
  return (
    <>
      <Flex h="90vh" bg={bg}>
        <SubModuleBar modulo="vendas" submodulo="clientes-fornecedores" page="Fornecedores" />
      </Flex>
      <BottomBar />
    </>
  )
}

export default Fornecedores;