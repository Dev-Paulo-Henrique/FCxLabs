import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Input } from "../components/Form/Input";
import Link from "next/link";
import { CPF, TEL } from "../services/utils/formats";
import { useMutation } from "react-query";
import { api } from "../services/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { theme } from "../styles/theme";

type UpdateUserFormData = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel: string;
  nameMother: string;
  date: string;
  insert: string;
  update: string | null;
  status: string;
  password_confirmation: string;
};

type EventProps = {
  target: {
    value: any;
  };
};

const updateUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  nameMother: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  date: yup.string().required("Data obrigatória"),
  tel: yup
    .string()
    .required("Telefone obrigatório")
    .min(15, "No mínimo 11 dígitos")
    .max(15, "No máximo 11 dígitos"),
  cpf: yup
    .string()
    .required("CPF obrigatório")
    .min(14, "No mínimo 11 dígitos")
    .max(14, "No máximo 11 dígitos"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "No mínimo 8 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
});

export default function UpdateUser() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameMother, setNameMother] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [date, setDate] = useState("");
  const [tel, setTel] = useState("");

  function handleChangeCPF(event: EventProps) {
    const { value } = event.target;

    setCpf(CPF(value));
  }

  function handleChangeTEL(event: EventProps) {
    const { value } = event.target;

    setTel(TEL(value));
  }

  const today = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  const data = {
    name: name,
    email: email,
    password: password,
    cpf: cpf,
    tel: tel,
    date: date,
    nameMother: nameMother,
    // insert: today,
    update: today,
    status: "ativo",
  };

  const updateUser = useMutation(async (user: UpdateUserFormData) => {
    const response = await api.post("/edit", data);
    router.push("/users");
    return response.data.user;
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateUserFormSchema),
  });

  const { errors } = formState;

  const handleUpdateUser: SubmitHandler<UpdateUserFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await updateUser.mutateAsync(values);
  };

  return (
    <Box
      h="100vh"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.colors.gray[600],
          borderRadius: "24px",
        },
      }}
    >
      <Head>
        <title>Update</title>
      </Head>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleUpdateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Atualizar usuário
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Nome completo"
                placeholder="John Doe"
                {...register("name")}
                error={errors.name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                label="CPF"
                placeholder="xxx.xxx.xxx-xx"
                {...register("cpf")}
                error={errors.cpf}
                value={cpf}
                onChange={handleChangeCPF}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                label="Nome da mãe"
                placeholder="Jane Doe"
                {...register("nameMother")}
                error={errors.nameMother}
                onChange={(event) => setNameMother(event.target.value)}
              />
              <Input
                type="email"
                label="E-mail"
                placeholder="you@example.com"
                {...register("email")}
                error={errors.email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="tel"
                label="Telefone"
                placeholder="(xx) xxxxx-xxxx"
                {...register("tel")}
                error={errors.tel}
                value={tel}
                onChange={handleChangeTEL}
              />
              <Input
                type="date"
                label="Data de nascimento"
                placeholder="xx/xx/xxxx"
                {...register("date")}
                error={errors.date}
                onChange={(event) => setDate(event.target.value)}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                type="password"
                label="Senha"
                placeholder="••••••••"
                {...register("password")}
                error={errors.password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Input
                type="password"
                placeholder="••••••••"
                label="Confirmação da senha"
                {...register("password_confirmation")}
                error={errors.password_confirmation}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="red"
                isLoading={formState.isSubmitting}
              >
                Atualizar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
