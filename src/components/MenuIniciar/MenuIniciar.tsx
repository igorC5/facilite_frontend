import { Button, Flex, Heading, Menu, Portal } from "@chakra-ui/react";

const MenuIniciar = () => {
  return (
     <Menu.Root>
      <Flex h="100%">
        <Menu.Trigger asChild>
          <Button h="100%">
            <Heading>F</Heading>
            INICIAR
          </Button>
        </Menu.Trigger>
      </Flex>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Flex>
              <Heading>icompsoft</Heading>
            </Flex>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
     </Menu.Root>
  )
}

export default MenuIniciar;