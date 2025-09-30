import DinamicTable from "@/components/DinamicTable/DinamicTable";
import ModulePage from "@/components/ModulePage/ModulePage";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import { Button, Flex, Heading, Icon, IconButton, Input, InputGroup, Spacer } from "@chakra-ui/react"
import { Funnel, LucideEdit, LucideTrash, PlusCircle, Search } from "lucide-react";
import React from "react";

const Clientes = () => {
  const bg = useColorModeValue("gray.100", "gray.800");
  const bgComponentes = useColorModeValue("white", "gray.700");
  const color = useColorModeValue("gray.800", "gray.100");

  const ColunasClientes = React.useMemo(
    () => [
      {
        header: 'NOME',
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

  const getClientesData = () => {
    
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
      {
        id: "1",
        nome: "2 João Silva",
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
      {
        id: "1",
        nome: "3 João Silva",
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
      {
        id: "1",
        nome: "4 João Silva",
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
      {
        id: "1",
        nome: "5 João Silva",
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
      {
        id: "1",
        nome: "6 João Silva",
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
      {
        id: "1",
        nome: "7 João Silva",
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
      {
        id: "1",
        nome: "8 João Silva",
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
      {
        id: "1",
        nome: "9 João Silva",
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
      {
        id: "1",
        nome: "10 João Silva",
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
      <Heading fontSize="2xl" py="4">Clientes</Heading>
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
            bg={bgComponentes} 
            borderWidth={2} 
            w="500px"
            h="100%"
            mr="2"
            rounded="2xl"
          />
        </InputGroup>
        <Tooltip content="Filtros" openDelay={0} closeDelay={100}>
          <IconButton rounded="2xl" w="50px" h="100%" bg={bgComponentes} borderWidth={2} variant="outline">
            <Icon as={Funnel} color={color} />
          </IconButton>
        </Tooltip>
        <Spacer />
        <Button bg="blue.600" color="white">
          <PlusCircle /> Novo Cliente
        </Button>
      </Flex>
      <DinamicTable
        colunas={ColunasClientes}
        data={getClientesData() ? getClientesData() : []}
      />
    </ModulePage> 
  )
}

export default Clientes;