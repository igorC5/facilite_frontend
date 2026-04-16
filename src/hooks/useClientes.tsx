import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

// tipagem de um produto
export interface ICliente {
  id: number;
  nome: string;
  tipo_pessoa: string;
  cpf: string;
  cnpj: string;
}

// tipagem esperada da response.data da requisição
type IClientes = ICliente[];

async function getClientes() {
  const response = await api.get<IClientes>('/clientes');
  return response?.data;
}

export function useClientes() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: getClientes,
    staleTime: 1000 * 60 * 5
  })
}