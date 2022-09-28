import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { CPF, TEL } from "../../services/utils/formats";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { theme } from "../../styles/theme";
import { useUsers } from "../../services/hooks/useUsers";

type UpdateUserFormData = {
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel: string;
  nameMother: string;
  date: string;
  insert?: string;
  login: [string];
  update: string | null;
  status: string;
  password_confirmation: string;
};

type EventProps = {
  target: {
    value: any;
  };
};

type UserQueryParams = {
  id?: string;
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

export default function UpdateUser({ users }: any) {
  const router = useRouter();
  const { id: UserId }: UserQueryParams = router.query;
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [nameMother, setNameMother] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [date, setDate] = useState("");
  const [tel, setTel] = useState("");

  const { data, isLoading } = useUsers(page, {
    initialData: users,
  });

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

  const dataUpdate = {
    name: name,
    email: email,
    password: password,
    cpf: cpf,
    tel: tel,
    date: date,
    nameMother: nameMother,
    login: [cpf, email],
    update: today,
    status: "ativo",
  };

  const updateUser = useMutation(async (user: UpdateUserFormData) => {
    const response = await api.post("/edit", dataUpdate);
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
          {isLoading && (
            <Flex justify="center">
              <Spinner />
            </Flex>
          )}

          {data?.users.map((user: any) => {
            return (
              <>
                {user._id == UserId && (
                  <>
                    <VStack spacing="8" key={user._id}>
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["6", "8"]}
                        w="100%"
                      >
                        <Input
                          label="Nome completo"
                          placeholder={user.name}
                          {...register("name")}
                          error={errors.name}
                          onChange={(event) => setName(event.target.value)}
                        />
                        <Input
                          label="CPF"
                          placeholder={user.cpf}
                          {...register("cpf")}
                          error={errors.cpf}
                          value={cpf}
                          onChange={handleChangeCPF}
                        />
                      </SimpleGrid>
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["6", "8"]}
                        w="100%"
                      >
                        <Input
                          label="Nome da mãe"
                          placeholder={user.nameMother}
                          {...register("nameMother")}
                          error={errors.nameMother}
                          onChange={(event) =>
                            setNameMother(event.target.value)
                          }
                        />
                        <Input
                          type="email"
                          label="E-mail"
                          placeholder={user.email}
                          {...register("email")}
                          error={errors.email}
                          onChange={(event) => setEmail(event.target.value)}
                        />
                      </SimpleGrid>
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["6", "8"]}
                        w="100%"
                      >
                        <Input
                          type="tel"
                          label="Telefone"
                          placeholder={user.tel}
                          {...register("tel")}
                          error={errors.tel}
                          value={tel}
                          onChange={handleChangeTEL}
                        />
                        <Input
                          type="date"
                          label="Data de nascimento"
                          value={user.date}
                          placeholder="xx/xx/xxxx"
                          {...register("date")}
                          error={errors.date}
                          onChange={(event) => setDate(event.target.value)}
                        />
                      </SimpleGrid>
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["6", "8"]}
                        w="100%"
                      >
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
                  </>
                )}
              </>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
}
