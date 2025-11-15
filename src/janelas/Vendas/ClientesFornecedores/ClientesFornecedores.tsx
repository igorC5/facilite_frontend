import DinamicTable from "@/components/DinamicTable/DinamicTable";
import JanelaSimples, { type IJanelaSimples } from "@/components/Janelas/JanelaSimples";
import { Tooltip } from "@/components/ui/tooltip";
import { useColors } from "@/styles/cores";
import { Button, Flex, Icon, IconButton, Input, InputGroup, Spacer, Text } from "@chakra-ui/react";
import { Funnel, LucideEdit, LucideTrash, PlusCircle, Search } from "lucide-react";
import React from "react";

const ClientesFornecedores: React.FC<IJanelaSimples> = ({
  janelaInfo,
  open, 
  fecharJanela,
  minimiza,
  minimizada,
  zIndexJanela,
  setZIndexJanela,
}) => {
  const Colors = useColors();

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
    <JanelaSimples
      janelaInfo={janelaInfo}
      open={open}
      fecharJanela={fecharJanela}
      minimiza={minimiza}
      minimizada={minimizada}
      zIndexJanela={zIndexJanela}
      setZIndexJanela={setZIndexJanela}
    >
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
        <Button bg="blue.600" color="white">
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
          colunas={ColunasClientes}
          data={getClientesData() ? getClientesData() : []}
        />
      </Flex>
    </JanelaSimples>
  )
}

export default ClientesFornecedores;