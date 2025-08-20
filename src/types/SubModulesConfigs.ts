
// REGRAS:
// NOMES DE MODULOS/SUBMODULOS SÃO TOTALMENTE EM MINUSCULA
// ESPAÇOS E BARRAS EM NOMES DE MODULOS/SUBMODULOS SÃO COM -

type TypeVendasSubmodules = 'clientes-fornecedores' | 'pedidos' | 'notas-fiscais';
type TypeClientesFornecedoresPages = 'Clientes' | 'Cadastrar cliente' | 'Fornecedores' | 'Cadastrar Fornecedor';

export type NomesModulos = 'vendas' | 'financeiro' | 'estoque' | 'fiscal' | 'contador' | 'estatisticas';
export type NomesSubModulos = TypeVendasSubmodules;
export type NomesSubModulosPages = TypeClientesFornecedoresPages;

export type SubModulo = {
  id_submod: number;
  nome_sub: NomesSubModulos;
  pages: {
    nome_page: NomesSubModulosPages;
    path: string;
  }[]
}

export type Modulo = {
  id_mod: number;
  nome_mod: NomesModulos;
  subModulos: SubModulo[];
}