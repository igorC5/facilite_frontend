import { Flex } from "@chakra-ui/react"
import SubModuleBar from "../SubModuleBar/SubModuleBar";
import { useColors } from "@/styles/cores";
import BottomBar from "../BottomBar/BottomBar";

interface IModulePage {
  children?: any;
  paginas?: {
    nome: string,
    url: string,
  }[]
}

const ModulePage: React.FC<IModulePage> = ({ children, paginas }) => {
  const Cores = useColors();
  
  return (
    <>
      <Flex h="90vh" bg={Cores.bg}>
          <SubModuleBar paginas={paginas} />
          <Flex 
            py='3' 
            px="8" 
            w="87vw" 
            h="100%"
            flexDir="column" 
            overflowY="auto" 
          >
            {children}
          </Flex>
      </Flex>
      <BottomBar />
    </>
  )
}

export default ModulePage;