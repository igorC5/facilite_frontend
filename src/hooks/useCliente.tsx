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
// type IClientes = ICliente[];
type IGetClienteResponse = {
  message: string;
  data: ICliente;
}

async function getCliente(clienteId: any) {
  const response = await api.get<IGetClienteResponse>(`/clientes/${clienteId}`);
  return response?.data;
}

export function useCliente(clienteId: any) {
  return useQuery({
    queryKey: ["cliente", clienteId],
    queryFn: () => getCliente(clienteId),
    enabled: clienteId != null,
    staleTime: 1000 * 60 * 5
  })
}