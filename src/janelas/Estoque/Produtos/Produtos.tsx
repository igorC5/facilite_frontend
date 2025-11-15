import { api } from "@/api";
import DinamicTable from "@/components/DinamicTable/DinamicTable";
import JanelaSimples, { type IJanelaSimples } from "@/components/Janelas/JanelaSimples";
import { Tooltip } from "@/components/ui/tooltip";
import { useColors } from "@/styles/cores";
import { Button, Flex, Icon, IconButton, Input, InputGroup, Spacer, Text } from "@chakra-ui/react";
import { Funnel, PlusCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CriarProduto from "./CriarProduto";
import { formatarReal } from "@/utils/FormatarReal";

const Produtos: React.FC<IJanelaSimples> = ({
  janelaInfo,
  open, 
  fecharJanela,
  minimiza,
  minimizada,
  zIndexJanela,
  setZIndexJanela,
}) => {
  const Colors = useColors();
  const [data, setData] = useState([]);
  const [modoTela, setModoTela] = useState<
    1 // listagem
    | 2 // novo produto
  >(1); // valor inicial
  
  useEffect(() => {
    async function teste() {
      const response = await api.get('/produtos');
      console.log(response.data);
      setData(response.data)
    }
    teste()
  }, [])
  
  const ColunasClientes = React.useMemo(
    () => [
      {
        header: 'CÓDIGO',
        acesso: 'id',
      },
      {
        header: 'NOME',
        acesso: 'nome',
      },
      {
        header: 'VALOR VENDA',
        acesso: 'preco_venda',
        cell: (row) => {
          return (
            <Text>{formatarReal(row.preco_venda)}</Text>
          )
        }
      },
    ],
    [data]
  )

  return (
    <JanelaSimples
      janelaInfo={janelaInfo}
      open={open}
      fecharJanela={fecharJanela}
      minimiza={minimiza}
      minimizada={minimizada}
      zIndexJanela={zIndexJanela}
      setZIndexJanela={setZIndexJanela}
    >
      {modoTela == 1 && (
        <>
          <Flex h="50px" w="100%">
            <Flex maxW="50%">
              <InputGroup
                h="100%"
                startElement={
                  <Flex h="100%" align="center"> 
                    <Icon as={Search} />
                  </Flex>
                }
              >
                <Input
                  placeholder="Digite aqui"
                  bg={Colors.bgComponentes} 
                  borderWidth={2} 
                  w="500px"
                  h="100%"
                  mr="2"
                  rounded="2xl"
                />
              </InputGroup>
              <Tooltip content="Filtros" openDelay={0} closeDelay={100}>
                <IconButton rounded="2xl" w="50px" h="100%" bg={Colors.bgComponentes} borderWidth={2} variant="outline">
                  <Icon as={Funnel} color={Colors.textColor} />
                </IconButton>
              </Tooltip>
            </Flex>
            <Spacer />
            <Button 
              bg="blue.600" 
              color="white" 
              onClick={() => setModoTela(2)}
              _hover={{bg: 'blue.500'}}
            >
              <PlusCircle /> Novo Produto
            </Button>
          </Flex>
          <Flex
            mt="3"
            maxH={450}
            w="100%" 
          >
            <DinamicTable 
              maxH="100%"
              data={data}
              colunas={ColunasClientes}
            />
          </Flex>
        </>
      )}
      {modoTela == 2 && (
        <CriarProduto setModoTela={setModoTela} />
      )}
    </JanelaSimples>
  )
}

export default Produtos;