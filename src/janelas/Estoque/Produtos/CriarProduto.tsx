import TextInput from "@/components/Inputs/TextInput";
import { Button, Flex, Tabs, Text } from "@chakra-ui/react";
import { CircleCheck, CircleX } from "lucide-react";
import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ValorInput from "@/components/Inputs/ValorInput";
import { api } from "@/api";
import { useState } from "react";

// Schema de validação
const produtoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  precoVenda: z.number().min(0, "Preço não pode ser negativo"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

interface ICriarProduto {
  setModoTela: any;
  refetch: any;
}

const CriarProduto: React.FC<ICriarProduto> = ({ setModoTela, refetch }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: {
      nome: "",
      precoVenda: 0,
    },
  });
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (data: ProdutoFormData) => {
    console.log("Dados do produto:", data);
    setEnviando(true);
    if (enviando) return;
    // Aqui você faz a chamada para sua API
    // await api.post("/produtos", data);
    const response = await api.post('/produtos', {
      nome: data.nome,
      preco_venda: data.precoVenda,
    })
    
    refetch();
    setEnviando(false);
    setModoTela(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column">
        <Flex w="100%">
          <Button
            type="button"
            bg="tomato"
            color="white"
            onClick={() => setModoTela(1)}
            _hover={{ bg: "red.500" }}
          >
            <CircleX /> cancelar
          </Button>
          <Button
            type="submit"
            ml="2"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.500" }}
            disabled={isSubmitting}
          >
            <CircleCheck /> salvar
          </Button>

          <Text></Text>
        </Flex>

        <Tabs.Root 
          lazyMount 
          unmountOnExit 
          defaultValue="tab-geral"
          variant="enclosed"
          mt="3"
        >
          <Tabs.List>
            <Tabs.Trigger value="tab-geral">Geral</Tabs.Trigger>
            <Tabs.Trigger value="tab-fiscal">Fiscal</Tabs.Trigger>
            <Tabs.Trigger value="tab-comercial">Comercial</Tabs.Trigger>
            <Tabs.Trigger value="tab-estoque">Estoque</Tabs.Trigger>
            <Tabs.Trigger value="tab-fornecedores">Fornecedores</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="tab-geral">
            <Flex w="40%" flexDir="column">
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                dados obrigatórios
              </Text>
              <Text fontWeight='medium'>Nome do Produto</Text>
              <TextInput
                w="50%"
                placeholder="Digite aqui"
                {...register("nome")}
              />
              {errors.nome && (
                <Text fontSize="sm" color="red.500">
                  {errors.nome.message}
                </Text>
              )}
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="tab-comercial">
            <Flex w="40%" flexDir="column">
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                dados obrigatórios
              </Text>
              <Text>Preço de Venda</Text>
              <Controller
                name="precoVenda"
                control={control}
                render={({ field }) => (
                  <ValorInput
                    w="50%"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="R$ 0,00"
                  />
                )}
              />
              {errors.precoVenda && (
                <Text fontSize="sm" color="red.500">
                  {errors.precoVenda.message}
                </Text>
              )}
            </Flex>
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </form>
  );
};

export default CriarProduto;