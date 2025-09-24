import { Flex, Spacer, Text } from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "../ui/color-mode"

const BottomBar = () => {
  const bg = useColorModeValue('blue.500', 'blue.700');

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
      </Flex>
      <Spacer />
      <Flex>
        <ColorModeButton />
      </Flex>
    </Flex>
  )
}

export default BottomBar;