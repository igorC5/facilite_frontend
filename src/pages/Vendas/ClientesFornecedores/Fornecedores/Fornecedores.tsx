import DinamicTable from "@/components/DinamicTable/DinamicTable";
import ModulePage from "@/components/ModulePage/ModulePage";
import { Tooltip } from "@/components/ui/tooltip";
import { useColors } from "@/styles/cores";
import { Button, Flex, Heading, Icon, IconButton, Input, InputGroup, Spacer} from "@chakra-ui/react"
import { Funnel, LucideEdit, LucideTrash, PlusCircle, Search } from "lucide-react";
import React from "react";

const Fornecedores = () => {
  const Colors = useColors();
  
  const colunasFornecedores = React.useMemo(
    () => [
      {
        header: 'RAZÃO SOCIAL',
        acesso: 'nome',
      },
      {
        header: 'TIPO',
        acesso: 'tipo'
      },
      {
        header: 'CPF/CNPJ',
        acesso: 'cpf_cnpj'
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
          console.log(row)
          return (
            <Flex w="max-content">
              <Tooltip content="Editar cliente" openDelay={0}>
                <Button h="24px" bg="none" px="0" py={4}>
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

  const pegarDadosTabela = () => {
    
    const dataMockada = [
      {
        id: "1",
        nome: "1 João Silva",
        tipo: "Fisica",
        cpf_cnpj: "123456789-1",
        ie: '1234567-891',
        cep: '1234567-891',
        cidade: 'SAO PAULO',
        bairro: 'Pinheiros',
        rua: 'Rua dos Brilhantes',
        pais: 'Brasil',
        telefone: '(12) 3456-7891',
      },
    ]

    const rows: any[] = [];
    dataMockada?.map(cliente => {
      rows.push({
        id: cliente.id,
        nome: cliente.nome,
        tipo: cliente.tipo,
        cpf_cnpj: cliente.cpf_cnpj,
        ie: cliente.ie,
        cep: cliente.cep,
        cidade: cliente.cidade,
        bairro: cliente.bairro,
        rua: cliente.rua,
        pais: cliente.pais,
        telefone: cliente.telefone,
      })
    })
    return rows;
  }

  return (
    <ModulePage
      paginas={[
        { nome: 'Clientes', url: '/Vendas/Clientes-Fornecedores/Clientes' },
        { nome: 'Fornecedores', url: '/Vendas/Clientes-Fornecedores/Fornecedores' },
      ]}
    >
      <Heading fontSize="2xl" py="4">Fornecedores</Heading>
      <Flex h="50px" mb="3">
        <InputGroup w="500px"
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
        <Spacer />
        <Button bg="blue.600" color="white">
          <PlusCircle /> Novo Fornecedor
        </Button>
      </Flex>
      <DinamicTable 
        colunas={colunasFornecedores}
        data={pegarDadosTabela()}
      />
    </ModulePage>
  )
}

export default Fornecedores;