import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

// tipagem de um produto
export interface IProduto {
  id: number;
  nome: string;
  preco_venda: string;
}

async function getProdutos() {
  const response = await api.get<IProduto>('/produtos');

  return response.data;
}

export function useProdutos() {
  return useQuery({
    queryKey: ["produtos"],
    queryFn: getProdutos,
    staleTime: 1000 * 60 * 5
  })
}