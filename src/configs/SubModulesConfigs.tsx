import { useColorModeValue } from "@/components/ui/color-mode";
import Produtos from "@/janelas/Estoque/Produtos/Produtos";
import Clientes from "@/janelas/Vendas/Clientes/Clientes";

export function useModulos(){
  const vendasColor1 = useColorModeValue("green.400", "green.600");
  const vendasColor2 = useColorModeValue("green.600", "green.700");
  const financeiroColor1 = useColorModeValue("yellow.400", "yellow.600");
  const financeiroColor2 = useColorModeValue("yellow.600", "yellow.700");
  const estoqueColor1 = useColorModeValue("blue.400", "blue.600");
  const estoqueColor2 = useColorModeValue("blue.600", "blue.700");
  const fiscalColor1 = useColorModeValue("orange.400", "orange.600");
  const fiscalColor2 = useColorModeValue("orange.600", "orange.700");
  const contadorColor1 = useColorModeValue("cyan.400", "cyan.600");
  const contadorColor2 = useColorModeValue("cyan.600", "cyan.700");
  const estatisticasColor1 = useColorModeValue("purple.400", "purple.700");
  const estatisticasColor2 = useColorModeValue("purple.600", "purple.800");

  return [
    {
      id: 1,
      titulo: 'Vendas',
      cor: [vendasColor1, vendasColor2],
      // icon: <HandCoins size="120" strokeWidth={1.5} />,
      icon: '/public/icones/vendas.webp',
      opcoes: [
        {
          id: 1,
          texto: "Clientes",
          janelaId: 1,
          componente: Clientes,
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
      cor: [financeiroColor1, financeiroColor2],
      icon: '/public/icones/financeiro.png',
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
      cor: [estoqueColor1, estoqueColor2],
      icon: '/public/icones/estoque.png',
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
      cor: [fiscalColor1, fiscalColor2],
      icon: '/public/icones/fiscal.png',
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
      icon: '/public/icones/contador.png',
      cor: [contadorColor1, contadorColor2],
    },
    {
      id: 6,
      titulo: 'Análise',
      icon: '/public/icones/estatisticas.png',
      cor: [estatisticasColor1, estatisticasColor2],
    },
  ];
}
