import DinamicTable from "@/components/DinamicTable/DinamicTable";
import JanelaSimples, { type IJanelaSimples } from "@/components/Janelas/JanelaSimples";
import { Tooltip } from "@/components/ui/tooltip";
import { useProdutos } from "@/hooks/useProdutos";
import { useColors } from "@/styles/cores";
import { formatarReal } from "@/utils/FormatarReal";
import { Button, Flex, Icon, IconButton, Input, InputGroup, Spacer, Text } from "@chakra-ui/react";
import { Edit, Funnel, LucideTrash, PlusCircle, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import CriarProduto from "./CriarProduto";
import { api } from "@/api";
import EditarProduto from "./EditarProduto";

const Produtos: React.FC<IJanelaSimples> = ({
  janelaInfo,
  open, 
  fecharJanela,
  minimiza,
  minimizada,
  zIndexJanela,
  setZIndexJanela,
}) => {

  // estilos
  const Colors = useColors();

  // estados
  const [modoTela, setModoTela] = useState<
    1 // listagem
    | 2 // novo produto
    | 3 // editar produto
  >(1); // valor inicial
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);
  
  // dados
  const { data: produtosData, refetch, isLoading} = useProdutos();


  const handleDeleteProduto = (id: string) => {
    async function deletarProduto() {
      const response = await api.delete(`/produtos/${id}`);
      await refetch();
    }
    deletarProduto();
  }

  const handleEditaProduto = (id: string) => {
    setProdutoSelecionado(id);
    setModoTela(3);
  }

  // config colunas
  const ColunasProdutos = React.useMemo(
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
        header: 'NCM',
        acesso: 'ncm',
      },
      {
        header: 'UNIDADE',
        acesso: 'unidade',
      },
      {
        header: 'VALOR VENDA',
        acesso: 'preco_venda',
        cell: (row: any) => {
          return (
            <Text>{formatarReal(row.preco_venda)}</Text>
          )
        }
      },
      {
        header: 'AÇÕES',
        acesso: 'acoes',
        hCell: {textAlign: 'center', width: '0px'},
        cell: (row) => {
          return (
            <Flex w="max-content">
              <Tooltip content="Editar produto" openDelay={0}>
                <Button 
                  h="24px" 
                  bg="none" 
                  px="0" 
                  py={4}
                  onClick={() => handleEditaProduto(row.id)}
                >
                  <Icon as={Edit} color="blue.500" />
                </Button>
              </Tooltip>
              <Tooltip content="Excluir produto" openDelay={0}>
                <Button 
                  h="24px" 
                  bg="none" 
                  px="0" 
                  py={4}
                  onClick={() => handleDeleteProduto(row.id)}
                >
                  <Icon as={LucideTrash} color="red.500" />
                </Button>
              </Tooltip>
            </Flex>
          )
        }
      }
    ],
    [produtosData]
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
              data={produtosData || []}
              colunas={ColunasProdutos}
              isLoading={isLoading}
            />
          </Flex>
        </>
      )}
      {modoTela == 2 && (
        <CriarProduto 
          setModoTela={setModoTela} 
          refetch={refetch}
        />
      )}
      {modoTela == 3 && (
        <EditarProduto 
          setModoTela={setModoTela} 
          refetch={refetch}
          produtoId={produtoSelecionado}
        />
      )}
    </JanelaSimples>
  )
}

export default Produtos;