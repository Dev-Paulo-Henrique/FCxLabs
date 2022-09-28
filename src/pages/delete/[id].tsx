import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Head from "next/head";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Input } from "../../components/Form/Input";
import Link from "next/link";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { theme } from "../../styles/theme";
import { useUsers } from "../../services/hooks/useUsers";

type UpdateUserFormData = {
  email: string;
  status: string;
};

type UserQueryParams = {
  id?: string;
};

const updateUserFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
});

export default function UpdateUser({ users }: any) {
  const router = useRouter();
  const { id: UserId }: UserQueryParams = router.query;
  const [email, setEmail] = useState("");

  const { data, isLoading } = useUsers(1, {
    initialData: users,
  });

  const dataUpdate = {
    email: email,
    status: "inativo",
  };

  const updateUser = useMutation(async (user: UpdateUserFormData) => {
    const response = await api.post("/delete", dataUpdate);
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

    await updateUser.mutateAsync(values).finally(() => router.push("/users"));
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
        <title>Delete</title>
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
                    <Heading size="lg" fontWeight="normal">
                      Digite seu e-mail para a confirmação
                    </Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8" key={user._id}>
                      <SimpleGrid
                        minChildWidth="240px"
                        spacing={["6", "8"]}
                        w="100%"
                      >
                        <Input
                          type="email"
                          label="E-mail"
                          placeholder={user.email}
                          {...register("email")}
                          error={errors.email}
                          onChange={(event) => setEmail(event.target.value)}
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
                          Deletar
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
