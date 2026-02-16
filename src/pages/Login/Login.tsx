import { api } from "@/api";
import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import { requestHelper } from "@/utils/RequestHelper";
import { Button, Center, Field, Flex, Heading, Input, Spinner, Text } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

const schema = z.object({
  email: z.email('Email inválido'),
  senha: z.string().nonempty('Senha inválida'),
})

type schemaType = z.infer<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, user } = useAuth();
  const [enviando, setEnviando] = useState(false);
  const [estadoLogin, setEstadoLogin] = useState('');

  useEffect(() => {
    if (!loading && user) {
      // navigate('/Homepage', { replace: true });
    }
  }, [user, loading]);

  const methods = useForm<schemaType>({
    resolver: zodResolver(schema)
  });

  const { 
    handleSubmit, 
    register,
    formState: { errors },
  } = methods;

  const handleLogin = async (data) => {
    await requestHelper({
      setLoading: setEnviando,
      action: async () => {
        setEstadoLogin('Login Firebase')
        const firebaseCredential = await login(data.email, data.senha)
      
        const usuario = firebaseCredential?.user;
        if (!usuario) throw new Error('Usuário não encontrado')
        
        const token_id = await usuario.getIdToken();

        setEstadoLogin('Carregando dados')
        const backendResponse = await api.post('/login', null, {
          headers: {
            Authorization: `Bearer ${token_id}`
          }
        });

        if (backendResponse.data?.usuario) {
          const dadosUsuario = {
            usuario: backendResponse.data.usuario,
            empresa: backendResponse.data.empresa,
            nome_empresa: backendResponse.data.nome_empresa,
            filial: backendResponse.data.filial,
          }
          localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
        }

        await usuario.getIdToken(true);

        return usuario;
      },
      onSuccess: async (usuario) => {
        const novo_id = await usuario.getIdToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${novo_id}`;
        toaster.create({
          title: 'Sucesso',
          description: 'bem vindo',
          type: 'success',
        })
        navigate('/Homepage', { replace: true });
      },
      onError(error) {
        toaster.create({
          title: 'Erro',
          description: error?.message,
          type: 'error',
        })
      },
    })
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      bg="cyan.700" 
      alignItems="center" 
      justifyContent="center"       
      bgGradient="to-b" 
      gradientFrom="blue.500" 
      gradientVia="blue.700"
      gradientTo="blue.700"
    >
      <Flex 
        bg="white" 
        flexDir="column" 
        rounded="2xl"
        p="4"
      >
        <Heading 
          textAlign='center' 
          fontWeight='medium' 
          fontSize='4xl'
          color="blue.500"
        >
          Facilite 
        </Heading>
          <form onSubmit={handleSubmit(handleLogin)}>
          <Flex 
            bg="white" 
            flexDir="column" 
            color="black"
            rounded="15px"
            p="2"
          >
            <Field.Root invalid={!!errors.email}>
              <Input
                // label="email" 
                fontWeight="medium"
                bg="white"
                {...register('email')}
              />
              <Field.ErrorText>{errors?.email?.message}</Field.ErrorText>
            </Field.Root>
            <Flex h={3} />
            <Field.Root invalid={!!errors.senha}>
              <Input
                type="password"  
                fontWeight="medium"
                bg="white"
                {...register('senha')}
              />
              <Field.ErrorText>{errors?.senha?.message}</Field.ErrorText>
            </Field.Root>
            <Button 
              mt="2" 
              type="submit"
              bg="linear-gradient(45deg, #eab308, #ea580c)"
              w="100%"
              color="white"
            >
              {enviando ? (
                <>
                  <Spinner />
                  {` ${estadoLogin}`}
                </>
              ) : (
                'ENTRAR'
              )}
            </Button>
          </Flex>
        </form>
      </Flex>
      <Flex 
        position="absolute"
        bottom={15}
        right={15}
      >
        <Heading>
          {user ? "logado" : "deslogado"} 
        </Heading>
      </Flex>
    </Flex>
  )
}

export default Login;