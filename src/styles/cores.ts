import { useColorModeValue } from "@/components/ui/color-mode";

export const useColors = () => ({
  borderColor: useColorModeValue("gray.200", "gray.700"),
  bg: useColorModeValue("gray.100", "gray.800"),
  bgComponentes: useColorModeValue('white', 'gray.700'),
  textColor: useColorModeValue("gray.700", "gray.100"),
});