import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
  Input,
  Select,
  Avatar,
  AvatarBadge,
  Divider,
} from "@chakra-ui/react";
import {
  RiSearchLine,
  RiMore2Fill,
  RiDeleteBinLine,
  RiGroupLine,
} from "react-icons/ri";
import { Logo } from "../components/Header/Logo";
import Pagination from "../components/Pagination";
import { useUsers } from "../services/hooks/useUsers";
import { ageFromDateOfBirthday } from "../services/utils/calculateAge";
import { DATE } from "../services/utils/formats";
import {
  useState,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { theme } from "../styles/theme";

type SearchProps = {
  date: string | any[];
  name: string | any[];
  email: string | any[];
  cpf: string | any[];
  status: string | any[];
  insert: string | any[];
};

type ShowUsers = {
  _id: Key | null | undefined;
  name:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  email:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  cpf:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  date: string;
  tel:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  nameMother:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  status:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
};

export default function UserList({ users }: any) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [chooseStatus, setChooseStatus] = useState("ativo");
  const [age, setAge] = useState("1");

  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  });

  function handleFilter(array: any, s: any) {
    const result = array?.filter(
      (e: SearchProps) =>
        e.name.includes(s) ||
        e.email.includes(s) ||
        e.cpf.includes(s) ||
        e.status.includes(s) ||
        e.insert.includes(s)
    );
    return setSearch(result);
  }

  (array: any, s: any) => {
    const result = array?.filter((e: SearchProps) => e.status.includes(s));
    return setChooseStatus(result);
  };

  (array: any, s: any) => {
    const result = array?.filter((e: SearchProps) =>
      ageFromDateOfBirthday(e.date.includes(s))
    );

    return setAge(result);
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  function separate(newPage: string | any[], max: number) {
    var res = [];

    for (var i = 0; i < data?.users.length; i = i + (max - 1)) {
      res.push(data?.users.slice(i, i + max));
    }
    res[res.length - 1].push(newPage[0]);
    return res;
  }

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
        <title>Usuários</title>
      </Head>
      <Flex
        as="header"
        w="100%"
        h="20"
        maxWidth={1480}
        mx="auto"
        mt="4"
        align="center"
        px="6"
      >
        <Logo />
        {isWideVersion && (
          <Flex align="center" ml="auto">
            <Flex
              as="label"
              flex="1"
              py="4"
              px="8"
              ml="6"
              maxWidth={400}
              alignSelf="center"
              color="gray.200"
              position="relative"
              bg="gray.800"
              borderRadius="full"
            >
              <Input
                color="gray.50"
                variant="unstyled"
                px="4"
                mr="4"
                placeholder="Buscar na plataforma"
                _placeholder={{
                  color: "gray.400",
                }}
                onChange={(e) => handleFilter(data?.users, e?.target.value)}
              />
              <Icon as={RiSearchLine} fontSize="20" cursor={"pointer"} />
            </Flex>
          </Flex>
        )}
        <Button
          as="a"
          href="/signUp"
          w={200}
          ml={50}
          colorScheme="blackAlpha"
          size="lg"
        >
          Criar usuário
        </Button>
      </Flex>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              // w={400}
              w={250}
            >
              {/* <Select
                placeholder="Idade"
                focusBorderColor="red.500"
                bgColor="#181B23"
                border="none"
                w={"xg"}
                onChange={(event) => setAge(event.target.value)}
              >
                <option value="18" style={{ background: "#181B23" }}>
                  19 - 25
                </option>
                <option value="25" style={{ background: "#181B23" }}>
                  26 - 30
                </option>
                <option value="30" style={{ background: "#181B23" }}>
                  31 - 35
                </option>
                <option value="35" style={{ background: "#181B23" }}>
                  36 - 40
                </option>
                <option value="40" style={{ background: "#181B23" }}>
                  + 40
                </option>
              </Select> */}
              <Select
                placeholder="Status"
                focusBorderColor="red.500"
                bgColor="#181B23"
                border="none"
                w={"xg"}
                onChange={(event) => setChooseStatus(event.target.value)}
              >
                <option value="ativo" style={{ background: "#181B23" }}>
                  Ativo
                </option>
                <option value="inativo" style={{ background: "#181B23" }}>
                  Inativo
                </option>
                <option value="bloqueado" style={{ background: "#181B23" }}>
                  Bloqueado
                </option>
              </Select>
              {!checked ? (
                <Button
                  size="sm"
                  fontSize="sm"
                  rightIcon={<RiGroupLine />}
                  colorScheme="red"
                  disabled={!checked}
                >
                  {!isLoading
                    ? !data?.users.length
                      ? "Erro"
                      : data?.users.length + " usuários"
                    : "Carregando..."}
                </Button>
              ) : (
                <Button
                  size="sm"
                  fontSize="sm"
                  rightIcon={<RiDeleteBinLine />}
                  colorScheme="red"
                >
                  Deletar
                </Button>
              )}
            </Box>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox
                        colorScheme="red"
                        onChange={() =>
                          !checked ? setChecked(true) : setChecked(false)
                        }
                      />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>CPF</Th>}
                    {isWideVersion && <Th>Nascimento</Th>}
                    {isWideVersion && <Th>Idade</Th>}
                    {isWideVersion && <Th>Telefone</Th>}
                    {isWideVersion && <Th>Nome da mãe</Th>}
                    <Th>Opções</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    data?.users.map((user: ShowUsers) => {
                      return (
                        <>
                          {user.status == chooseStatus ? (
                            // ageFromDateOfBirthday(user.date) > parseInt(age) &&
                            // ageFromDateOfBirthday(user.date) <
                            //   parseInt(age) + 5 ? (
                            <Tr key={user._id}>
                              <Td px={["4", "4", "6"]}>
                                {!checked && user.status == "ativo" ? (
                                  <Avatar
                                    name={user.name?.toString()}
                                    size="sm"
                                  >
                                    <AvatarBadge
                                      bg="green.500"
                                      boxSize="1.25em"
                                    />
                                  </Avatar>
                                ) : !checked && user.status == "inativo" ? (
                                  <Avatar
                                    name={user.name?.toString()}
                                    size="sm"
                                  >
                                    <AvatarBadge bg="yellow" boxSize="1.25em" />
                                  </Avatar>
                                ) : !checked && user.status == "bloqueado" ? (
                                  <Avatar
                                    name={user.name?.toString()}
                                    size="sm"
                                  >
                                    <AvatarBadge bg="tomato" boxSize="1.25em" />
                                  </Avatar>
                                ) : (
                                  <Checkbox
                                    colorScheme="red"
                                    isChecked={checked}
                                  />
                                )}
                              </Td>
                              <Td>
                                <Box>
                                  <Text
                                    color="red.400"
                                    colorScheme="red"
                                    fontWeight="bold"
                                  >
                                    {user.name}
                                  </Text>
                                  <Text fontSize="sm" color="gray.300">
                                    {user.email}
                                  </Text>
                                </Box>
                              </Td>
                              {isWideVersion && <Td>{user.cpf}</Td>}
                              {isWideVersion && <Td>{DATE(user.date)}</Td>}
                              {isWideVersion && (
                                <Td>
                                  {ageFromDateOfBirthday(user.date) + " anos"}
                                </Td>
                              )}
                              {isWideVersion && <Td>{user.tel}</Td>}
                              {isWideVersion && <Td>{user.nameMother}</Td>}
                              <Td>
                                <Menu>
                                  {({ isOpen }) => (
                                    <>
                                      <MenuButton
                                        isActive={isOpen}
                                        size="sm"
                                        as={Button}
                                        fontSize="sm"
                                        colorScheme="red"
                                      >
                                        <Icon as={RiMore2Fill} />
                                        {/* {isOpen ? 'Fechar' : 'Abrir'} */}
                                      </MenuButton>
                                      <MenuList>
                                        <MenuItem
                                          color="black"
                                          onClick={() =>
                                            router.push(`/update/${user._id}`)
                                          }
                                        >
                                          Editar
                                        </MenuItem>
                                        <MenuItem
                                          color="black"
                                          onClick={() =>
                                            router.push(`/delete/${user._id}`)
                                          }
                                        >
                                          Excluir
                                        </MenuItem>
                                        <Divider />
                                        {user.status === "ativo" ? (
                                          <>
                                            <MenuItem color="black" isDisabled>
                                              Desativar
                                            </MenuItem>
                                            <MenuItem color="black" isDisabled>
                                              Bloquear
                                            </MenuItem>
                                          </>
                                        ) : user.status === "inativo" ? (
                                          <>
                                            <MenuItem color="black" isDisabled>
                                              Ativar
                                            </MenuItem>
                                            <MenuItem color="black" isDisabled>
                                              Bloquear
                                            </MenuItem>
                                          </>
                                        ) : user.status === "bloqueado" ? (
                                          <></>
                                        ) : (
                                          <></>
                                        )}
                                      </MenuList>
                                    </>
                                  )}
                                </Menu>
                              </Td>
                            </Tr>
                          ) : (
                            // )
                            <></>
                          )}
                        </>
                      );
                    })
                    // .slice(page - 1, page - 6)
                  }
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={
                  data?.users.filter(function (item: { status: string }) {
                    if (item.status === chooseStatus) {
                      return true;
                    } else {
                      return false;
                    }
                  }).length
                }
                currentPage={page}
                onPageChange={setPage}
                registersPerPage={5}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
