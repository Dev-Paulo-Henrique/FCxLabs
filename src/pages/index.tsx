import { Flex, Button, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "../services/api";
import toast from "react-hot-toast";

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "Senha incompleta"),
});

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const login = {
    email: email,
    password: password,
  };

  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async () => {
    new Promise((resolve) => setTimeout(resolve, 2000));
    await api
      .post("/auth", login)
      .then(() => {
        router.push("/users"), toast.success("Bem-vindo");
      })
      .catch(() => toast.error("E-mail ou senha incorreto"));
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Head>
        <title>Login</title>
      </Head>
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            type="email"
            label="E-mail"
            {...register("email")}
            error={errors.email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            type="password"
            label="Senha"
            {...register("password")}
            error={errors.password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Stack>
        <Flex justifyContent="space-between" alignItems="center">
          <Button
            as="a"
            href="/signUp"
            w="48%"
            type="submit"
            mt="6"
            colorScheme="blackAlpha"
            size="lg"
          >
            Criar
          </Button>
          <Button
            w="48%"
            type="submit"
            mt="6"
            colorScheme="red"
            size="lg"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
