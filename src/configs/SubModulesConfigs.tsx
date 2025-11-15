import JanelaSimples from "@/components/Janelas/JanelaSimples";
import { useColorModeValue } from "@/components/ui/color-mode";
import Produtos from "@/janelas/Estoque/Produtos/Produtos";
import ClientesFornecedores from "@/janelas/Vendas/ClientesFornecedores/ClientesFornecedores";
import { Banknote, Calculator, ChartNoAxesCombined, HandCoins, Package, ScrollText } from "lucide-react";

export function useModulos(){
  const vendasColor = useColorModeValue("green.500", "green.700");
  const financeiroColor = useColorModeValue("yellow.400", "yellow.700");
  const estoqueColor = useColorModeValue("blue.500", "blue.800");
  const fiscalColor = useColorModeValue("orange.400", "orange.700");
  const contadorColor = useColorModeValue("cyan.400", "cyan.700");
  const estatisticasColor = useColorModeValue("purple.400", "purple.800");

  return [
    {
      id: 1,
      titulo: 'Vendas',
      cor: vendasColor,
      icon: <HandCoins size="120" strokeWidth={1.5} />,
      opcoes: [
        {
          id: 1,
          texto: "Clientes / Fornecedores",
          janelaId: 1,
          componente: ClientesFornecedores,
          // path: "/Vendas/Clientes-Fornecedores/Clientes",
        },
        {
          id: 2,
          texto: "Pedidos / Novo Pedido",
          // janelaId: 2,
          // componente: JanelaSimples,
        },
        {
          id: 3,
          texto: "Notas Fiscais (NFE e NFC)",
          // janelaId: 3,
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
          // janelaId: 4,
        },
        {
          id: 2,
          texto: "Fluxo de Caixa",
          // janelaId: 5,
        },
        {
          id: 3,
          texto: "Conciliação Bancaria",
          // janelaId: 6,
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
          janelaId: 7,
          componente: Produtos
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
}
