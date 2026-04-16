import { api } from "@/api";
import { Radio } from "@/components/Inputs/Radio";
import TextInput from "@/components/Inputs/TextInput";
import { toaster } from "@/components/ui/toaster";
import { useCliente } from "@/hooks/useCliente";
import {
  Button,
  Flex,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useEditable
} from "@chakra-ui/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CircleCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  nome: z.string().nonempty('Campo Obrigatório'),
  tipoDocumento: z.string().nonempty('Campo Obrigatório'),
})

export type CriarClienteFormData = z.infer<typeof FormSchema>;

interface ICriarCliente {
  setModoTela: any;
  ClienteId?: any;
}

const FormCliente: React.FC<ICriarCliente> = ({
  setModoTela, 
  ClienteId,
}) => {

  const { data: clienteEditData, isFetching, isSuccess, isLoading } = useCliente(ClienteId);

  useEffect(() => {
    if (isSuccess && clienteEditData) {
      setValue("nome", clienteEditData.data.nome);
    }
  }, [isFetching])

  const methods = useForm<CriarClienteFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: "",
      tipoDocumento: "PF",
    },
  });

  const {
    register,
    watch,
    setValue,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting}
  } = methods;
  
  const temErros = Object.keys(errors).length > 0;
  
  // estados
  const [enviando, setEnviando] = useState(false);

  // refetch

  const onSubmit = async (data: CriarClienteFormData) => {
    setEnviando(true)
    if (enviando) return;
    try {
      const response = await api.post('/clientes', {
        nome: data.nome,
        tipoPessoa: data.tipoDocumento,
        cpf: '13992300935',
      })

      setModoTela(1);

      toaster.success({
        title: 'Cliente criado com sucesso!',
        description: 'Visualize-o na tabela de clientes',
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
        title: "Erro ao criar cliente",
        description: mensagem,
      });
    } finally {
      setEnviando(false);
    }
  }

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
        <Flex w="40%" flexDir="column" mt="3">
          
          <Text fontSize="sm" fontWeight="medium" color="gray.500">
            dados obrigatórios
          </Text>

          <Text fontWeight="medium">Tipo de Documento</Text>

          <Controller
            control={control}
            name="tipoDocumento"
            render={({ field }) => (
              <RadioGroup.Root
                name={field.name}
                value={field.value}
                onValueChange={(e) => {
                  field.onChange(e.value);
                }}
              >
                <Stack direction="row" >
                  <Radio py="1" px="2" value="PF" key="cpf">CPF</Radio>
                  <Radio  py="1" px="2" value="PJ" key="cnpj">CNPJ</Radio>
                </Stack>
              </RadioGroup.Root>
            )}
          />

          {errors.tipoDocumento && (
            <Text fontSize="sm" color="red.500">
              {errors.tipoDocumento.message}
            </Text>
          )}

          <Text fontWeight='medium'>Nome / Razão Social</Text>
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
        </ Flex>
      </Flex>
    </form>
  )
}

export default FormCliente;