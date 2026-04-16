import DinamicTable from "@/components/DinamicTable/DinamicTable";
import JanelaSimples, { type IJanelaSimples } from "@/components/Janelas/JanelaSimples";
import { Tooltip } from "@/components/ui/tooltip";
import { useColors } from "@/styles/cores";
import { Button, Flex, Icon, IconButton, Input, InputGroup, Spacer, Text } from "@chakra-ui/react";
import { Funnel, LucideEdit, LucideTrash, PlusCircle, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormCliente from "./FormCliente";
import { useClientes } from "@/hooks/useClientes";
import { useQueryClient } from "@tanstack/react-query";

const Clientes: React.FC<IJanelaSimples> = ({
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
    | 2 // novo cliente
    | 3 // editar cliente
  >(1); // valor inicial

  // dados
  const { data: clientesData, refetch, isLoading, isRefetching} = useClientes();
  const [clienteId, setClienteId] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (modoTela === 1) {
      setClienteId(null);
      queryClient.invalidateQueries({ queryKey: ["cliente"] });
    }
  }, [modoTela]);

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
        header: 'TIPO',
        acesso: 'tipo',
        cell: (row) => {
          return (
            <Flex>
              <Text>{row.tipoPessoa == "PF" ? "Pessoa Física" : "Pessoa Jurídica"}</Text>
            </Flex>
          )
        }
      },
      {
        header: 'CPF/CNPJ',
        acesso: 'cpf_cnpj',
        cell: (row) => {
          return (
            <Flex>
              <Text>{row.tipoPessoa == "PF" ? row.cpf : row.cnpj}</Text>
            </Flex>
          )
        }
      },
      {
        header: 'IE',
        acesso: 'ie'
      },
      {
        header: 'CEP',
        acesso: 'cep'
      },
      {
        header: 'CIDADE',
        acesso: 'cidade'
      },
      {
        header: 'BAIRRO',
        acesso: 'bairro'
      },
      {
        header: 'RUA',
        acesso: 'rua'
      },
      {
        header: 'PAÍS',
        acesso: 'pais'
      },
      {
        header: 'TELEFONE',
        acesso: 'telefone'
      },
      {
        header: 'AÇÕES',
        acesso: 'acoes',
        hCell: {textAlign: 'center', width: '0px'},
        cell: (row) => {
          return (
            <Flex w="max-content">
              <Tooltip content="Editar cliente" openDelay={0}>
                <Button h="24px" bg="none" px="0" py={4}
                  onClick={() => {
                    setClienteId(row.id);
                    setModoTela(2);
                  }}
                >
                  <Icon as={LucideEdit} color="blue.500" />
                </Button>
              </Tooltip>
              <Tooltip content="Excluir cliente" openDelay={0}>
                <Button h="24px" bg="none" px="0" py={4}>
                  <Icon as={LucideTrash} color="red.500" />
                </Button>
              </Tooltip>
            </Flex>
          )
        }
      },
    ],
    []
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
      {modoTela === 1 && (
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
            <Button bg="blue.600" color="white" onClick={() => setModoTela(2)}>
              <PlusCircle /> Novo Cliente
            </Button>
          </Flex>
          <Flex 
            mt="3" 
            maxH={450}
            w="100%" 
          >
            <DinamicTable 
              maxH="100%"
              data={clientesData?.data ?? []}
              colunas={ColunasClientes}
              isLoading={isLoading}
              refreshData={refetch}
              refreshing={isRefetching}
            />
          </Flex>
        </>
      )}
      {modoTela === 2 && (
        <FormCliente 
          setModoTela={setModoTela}
          ClienteId={clienteId}
        />
      )}
    </JanelaSimples>
  )
}

export default Clientes;