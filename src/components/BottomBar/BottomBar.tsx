import { Button, Flex } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "../ui/color-mode"

const BottomBar = () => {
  const bg = useColorModeValue('blue.500', 'blue.700');

  return (
    <Flex
      bg={bg}
      h="8%" 
      borderWidth="1px" 
      align="center"
      px="3"
      justify="space-between"
    >
      <Flex>
        <Button 
          borderWidth="2px" 
          borderColor="black"
          >
          INICIAR
        </Button>
      </Flex>
      <Flex>
        <ColorModeButton />
      </Flex>
    </Flex>
  )
}

export default BottomBar;