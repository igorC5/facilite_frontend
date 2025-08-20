import type { Modulo } from "@/types/SubModulesConfigs";

export const SubModulesConfigs: Modulo[] = [
  {
    id_mod: 1,
    nome_mod: 'vendas',
    subModulos: [
      {
        id_submod: 1,
        nome_sub: 'clientes-fornecedores', 
        pages: [
          {
            nome_page: 'Clientes',
            path: '/Vendas/Clientes-Fornecedores/Clientes',
          },
          {
            nome_page: 'Cadastrar cliente',
            path: '/Vendas/Clientes-Fornecedores/Clientes',
          },
          {
            nome_page: 'Fornecedores',  
            path: '/Vendas/Clientes-Fornecedores/Fornecedores',
          },
          {
            nome_page: 'Cadastrar Fornecedor',
            path: '/Vendas/Clientes-Fornecedores/Clientes',
          },
        ]
      },
    ],
  },
]