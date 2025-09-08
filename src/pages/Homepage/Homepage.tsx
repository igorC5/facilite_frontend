import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Flex, SimpleGrid } from "@chakra-ui/react";
import { Banknote, Calculator, ChartNoAxesCombined, HandCoins, Package, ScrollText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CardModulo from "./Components/CardModulo";
import BottomBar from "@/components/BottomBar/BottomBar";
import { useState } from "react";
import CardSelecionado from "./Components/CardSelecionado";

const Homepage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const bg = useColorModeValue("gray.100", "gray.800");
  const vendasColor = useColorModeValue("green.500", "green.700");
  const financeiroColor = useColorModeValue("yellow.400", "yellow.700");
  const estoqueColor = useColorModeValue("blue.500", "blue.800");
  const fiscalColor = useColorModeValue("orange.400", "orange.700");
  const contadorColor = useColorModeValue("cyan.400", "cyan.700");
  const estatisticasColor = useColorModeValue("purple.400", "purple.800");

  const modulos = [
    {
      id: 1,
      titulo: 'Vendas',
      cor: vendasColor,
      icon: <HandCoins size="120" strokeWidth={1.5} />,
      opcoes: [
        {
          id: 1,
          texto: "Clientes / Fornecedores",
          path: "/Vendas/Clientes-Fornecedores/Clientes",
        },
        {
          id: 2,
          texto: "Pedidos / Novo Pedido",
        },
        {
          id: 3,
          texto: "Notas Fiscais (NFE e NFC)",
        },
      ]
    },
    {
      id: 2,
      titulo: 'Financeiro',
      cor: financeiroColor,
      icon: <Banknote size="120" strokeWidth={1.5} />,
      opcoes: [
        {
          id: 1,
          texto: "Contas a Pagar/Receber",
        },
        {
          id: 2,
          texto: "Fluxo de Caixa",
        },
        {
          id: 3,
          texto: "Conciliação Bancaria",
        },
      ]
    },
    {
      id: 3,
      titulo: 'Estoque',
      cor: estoqueColor,
      icon: <Package size="120" strokeWidth={1.5} />,
      opcoes: [
        {
          id: 1,
          texto: "Produtos",
        },
        {
          id: 2,
          texto: "Inventário",
        },
        {
          id: 3,
          texto: "Gerenciar Estoque",
        },
      ]
    },
    // produtos, inventário, gerenciar estoque
    {
      id: 4,
      titulo: 'Fiscal',
      cor: fiscalColor,
      icon: <ScrollText size="120" strokeWidth={1.5} />,
      opcoes: [
        {
          id: 1,
          texto: "Impostos",
        },
        {
          id: 2,
          texto: "SPED Fiscal",
        },
        {
          id: 3,
          texto: "Integração ao Contador",
        },
      ]
    },
    {
      id: 5,
      titulo: 'Contador',
      cor: contadorColor,
      icon: <Calculator size="120" strokeWidth={1.5} />,
    },
    {
      id: 6,
      titulo: 'Estatísticas',
      cor: estatisticasColor,
      icon: <ChartNoAxesCombined size="120" strokeWidth={1.5} />,
    },
  ];

  const [modSelecionado, setModSelecionado] = useState(0);
  const HandleModSelecionado = (num: number) => {
    if (modSelecionado === num) {
      setModSelecionado(0);
    } else {
      setModSelecionado(num);
    }
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }


  return (
    <Flex bg={bg} color="black" w="100vw" h="100vh" flexDir="column">
      <Flex h="8%" align="center" pl="3">
        <Button 
          borderWidth="2px" 
          borderColor="black"
          onClick={() => handleLogout()}
        >
          Sair
        </Button>
      </Flex>
      <Flex h="84%" m="80px">
        <Flex w="60%">
          <SimpleGrid 
            w="100%" 
            columns={3} 
            gap="40px"
            p="6"
          >
            {modulos.map(mod => {
              return (
                <CardModulo 
                  titulo={mod.titulo}
                  cor={mod.cor}
                  icon={mod.icon ? mod.icon : <HandCoins size="120" strokeWidth={1.5} />}
                  selecionado={modSelecionado === mod.id}
                  acao={() => HandleModSelecionado(mod.id)}
                />
              )
            })}
          </SimpleGrid>
        </Flex>
        <Flex w="40%">
          <CardSelecionado 
            cor={modulos.find(mod => mod.id === modSelecionado)?.cor}
            titulo={modulos.find(mod => mod.id === modSelecionado)?.titulo}
            opcoes={modulos.find(mod => mod.id === modSelecionado)?.opcoes}
          />
        </Flex>
      </Flex>
      <BottomBar />
    </Flex>
  )
}

export default Homepage;