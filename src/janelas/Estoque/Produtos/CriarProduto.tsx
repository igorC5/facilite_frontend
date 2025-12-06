import TextInput from "@/components/Inputs/TextInput";
import { Button, Flex, Spacer, Spinner, Tabs, Text } from "@chakra-ui/react";
import { AlertCircle, CircleCheck, CircleX } from "lucide-react";
import type React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ValorInput from "@/components/Inputs/ValorInput";
import { api } from "@/api";
import { useState } from "react";
import { verificaErroTab } from "@/utils/VerificaErroTab";
import SelectInput from "@/components/Inputs/SelectInput";
import { toaster } from "@/components/ui/toaster";

// Schema de validação
const produtoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  precoVenda: z.number().min(0, "Preço não pode ser negativo"),
  ncm: z.string().regex(/^\d{8}$/, "NCM deve conter exatamente 8 dígitos numéricos"),
  unidade: z.string().min(1, "Unidade obrigatória")
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
      ncm: "",
      unidade: "",
    },
  });

  // verifica erros nas tabs
  const temErros = Object.keys(errors).length > 0; // qualquer erro
  const erroGeral = !!errors.nome || !!errors.unidade;
  const erroFiscal = !!errors.ncm;
  const erroComercial = !!errors.precoVenda;

  // estados
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (data: ProdutoFormData) => {
    setEnviando(true);
    if (enviando) return;

    try {      
      const response = await api.post('/produtos', {
        nome: data.nome,
        unidade: data.unidade,
        ncm: data.ncm,
        preco_venda: data.precoVenda,
      })
      console.log(response.data);

      refetch();
      setModoTela(1);

      toaster.success({
        title: 'Produto criado com sucesso!',
        description: 'Visualize-o na tabela de produtos',
        closable: true,
      })
    } catch (error: any) {

      const mensagemBruta =
        error?.response?.data?.message ??
        error?.response?.data?.erro ??
        error?.message ??
        "Erro desconhecido.";

      const mensagem =
        Array.isArray(mensagemBruta) ? mensagemBruta.join(", ") : mensagemBruta;

      toaster.error({
        title: "Erro ao criar produto",
        description: mensagem,
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column">
        <Flex w="100%" align="center">
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
            {enviando ? <Spinner /> : <CircleCheck />}
            salvar
          </Button>

          { temErros && (
            <Flex ml="2">
              <AlertCircle color="tomato"/>
              <Text fontWeight='medium' color="tomato"  ml="1">
                Corrija os itens em destaque!
              </Text>
            </Flex>
          )}
        </Flex>

        <Tabs.Root 
          lazyMount 
          unmountOnExit 
          defaultValue="tab-geral"
          variant="enclosed"
          mt="3"
        >
          <Tabs.List gap={2}>
            <Tabs.Trigger  
              value="tab-geral"
              {...verificaErroTab(erroGeral)}
            >
                Geral
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="tab-fiscal"
              {...verificaErroTab(erroFiscal)}
            >
                Fiscal
            </Tabs.Trigger>
            <Tabs.Trigger 
              value="tab-comercial"
              {...verificaErroTab(erroComercial)}
            >
              Comercial
            </Tabs.Trigger>
            <Tabs.Trigger value="tab-estoque">Estoque</Tabs.Trigger>
            <Tabs.Trigger value="tab-fornecedores">Fornecedores</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="tab-geral">
            <Flex w="40%" flexDir="column">
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                dados obrigatórios
              </Text>

              <Text fontWeight='medium'>Nome do Produto*</Text>
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

              <Text fontWeight='medium'>Unidade de medida*</Text>
              <SelectInput w="50%" {...register("unidade")}>
                <option value=""></option>
                <option value="UN">UN</option>
                <option value="KG">KG</option>
                <option value="CX">CX</option>
              </SelectInput>
              {errors.unidade && (
                <Text fontSize="sm" color="red.500">
                  {errors.unidade.message}
                </Text>
              )}

            </Flex>
          </Tabs.Content>

          <Tabs.Content 
            value="tab-fiscal"
          >
            <Flex w="40%" flexDir="column">

              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                dados obrigatórios
              </Text>

              <Text fontWeight='medium'>NCM*</Text>
              <TextInput
                w="50%"
                inputMode='numeric'
                maxLength={8}
                placeholder="Digite aqui"
                {...register("ncm", {
                  onChange: (e) => {
                    e.target.value = e.target.value.replace(/\D/g, ""); // remove qualquer não número
                  },
                })}
              />
              {errors.ncm && (
                <Text fontSize="sm" color="red.500">
                  {errors.ncm.message}
                </Text>
              )}

            </Flex>
          </Tabs.Content>

          <Tabs.Content 
            value="tab-comercial"
          >
            <Flex w="40%" flexDir="column">
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                dados obrigatórios
              </Text>
              <Text fontWeight='medium'>Preço de Venda</Text>
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