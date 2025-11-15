import { Box, Button, Flex, Icon, Input, Show, Table, Text } from "@chakra-ui/react";
import type React from "react";
import { useColorModeValue } from "../ui/color-mode";
import { Tooltip } from "../ui/tooltip";
import { LucideChevronLeft, LucideChevronRight, LucideChevronsLeft, LucideChevronsRight } from "lucide-react";

interface IDinamicTable {
  colunas: any[];
  data: any[];
  maxH: any;
}

const DinamicTable: React.FC<IDinamicTable> = ({
  colunas,
  data,
  maxH,
}) => {
  const bg = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("gray.800", "gray.100");

  if (!data) {
    return null;
  }

  return (
    <Box
      w="100%" 
      h="100%"
      maxH={maxH}
      className="dinamic-table"
      overflow="auto"  
      tableLayout="fixed" 
      bg={bg}
      borderWidth="2px" 
      py="2"
      px="4"
      rounded="2xl"
    >
      <Table.Root w="100%" bg={bg}>
        <Table.Header bg={bg} >
          <Table.Row >
            {colunas?.map(coluna => {
              return (
                  <Table.ColumnHeader key={coluna.acesso} {...(coluna.hCell || {})} bg={bg} color={color}>
                    {coluna.header}
                  </Table.ColumnHeader>
                )
              })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((linha, indexLinha) => (
            <Table.Row key={indexLinha}>
              {colunas.map(coluna => (
                <Table.Cell bg={bg} color={color}>
                  {
                    coluna.cell
                    ? coluna.cell(linha)
                    : linha[coluna.acesso]
                  }
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
          <Show when={!data || data.length == 0}>
            <Table.Row>
              <Table.Cell borderWidth={0}>Sem itens</Table.Cell>
            </Table.Row>
          </Show>
        </Table.Body>
      </Table.Root>
      <Flex 
        flex="1" 
        h="10%" 
        py="2"
        px="4"
        justify="space-between"
        align="center"
      >
        <Text>Total: {data.length}</Text>
        <Flex flexDir="row" align="center">
          <Text>Página:</Text>
          <Input 
            value="1"
            mx="1"
            h="32px"
            p="0px"
            w="0px"
            textAlign="center"
            borderWidth={2}
          />
            <Tooltip content="Primeira Página" openDelay={0}>
              <Button h="32px" bg="none" p="0">
                <Icon as={LucideChevronsLeft} color={color} />
              </Button>
            </Tooltip>
            <Tooltip content="Página Anterior" openDelay={0}>
              <Button h="32px" bg="none" p="0">
                <Icon as={LucideChevronLeft} color={color} />
              </Button>
            </Tooltip>
            <Tooltip content="Próxima Página" openDelay={0}>
              <Button h="32px" bg="none" p="0">
                <Icon as={LucideChevronRight} color={color} />
              </Button>
            </Tooltip>
            <Tooltip content="Última Página" openDelay={0}>
              <Button h="32px" bg="none" p="0">
                <Icon as={LucideChevronsRight} color={color} />
              </Button>
            </Tooltip>
        </Flex>
      </Flex>
    </Box>
  )
}

export default DinamicTable;