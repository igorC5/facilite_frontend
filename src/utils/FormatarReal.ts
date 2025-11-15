export const formatarReal = (valor: number | string): string => {
  // Converte para número se for string
  const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
  
  // Verifica se é um número válido
  if (isNaN(numero)) {
    return 'R$ 0,00';
  }
  
  // Formata para Real Brasileiro
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(numero);
};

// Exemplos de uso:
// formatarReal(14)       -> "R$ 14,00"
// formatarReal(25.99)    -> "R$ 25,99"
// formatarReal("100")    -> "R$ 100,00"
// formatarReal(1234.56)  -> "R$ 1.234,56"