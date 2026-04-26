import Produtos from "@/janelas/Estoque/Produtos/Produtos";
import Clientes from "@/janelas/Vendas/Clientes/Clientes";

export const MODULOS = [
  { 
    id: 1, 
    nome: "Produtos",
    texto: "Produtos",
    icon: '/public/icones/vendas.webp',
    janelaId: 1,
    componente: Produtos
  },
  { 
    id: 2, 
    nome: "Clientes",
    texto: "Clientes", 
    icon: '/public/icones/vendas.webp', 
    janelaId: 2,
    componente: Clientes,
  },
] as const;


export const consultaModulo = (moduloId: number) => {
  const modulo = MODULOS.find(mod => mod.id === moduloId);
  return modulo;
}