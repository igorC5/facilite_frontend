import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

interface CurrencyInputProps {
  value?: string | number;
  onChange?: (value: number) => void;
  onBlur?: () => void;
  [key: string]: any;
}

const ValorInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, onBlur, ...rest }, ref) => {
    const formatCurrency = (value: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    };

    const parseCurrency = (value: string): number => {
      const numbers = value.replace(/\D/g, '');
      return Number(numbers) / 100;
    };

    const displayValue = typeof value === 'number' 
      ? formatCurrency(value) 
      : 'R$ 0,00';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseCurrency(e.target.value);
      onChange?.(parsed);
    };

    return (
      <Input
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        onBlur={onBlur}
        fontWeight="medium"
        rounded="xl"
        borderWidth={2}
        borderColor="teal.500"
        outline="none"
        _focus={{ borderColor: "blue.500" }}
        {...rest}
      />
    );
  }
);

ValorInput.displayName = "CurrencyInput";

export default ValorInput;