import { Box, Flex, Heading, Button, Icon, MenuButton, Menu, MenuList, MenuItem, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Input } from "@chakra-ui/react";
import { RiSearchLine, RiMore2Fill, RiDeleteBinLine, RiGroupLine } from "react-icons/ri";
import { Header } from "../components/Header";
import { SearchBox } from "../components/Header/SearchBox";
import { Filter } from "../components/Filter";
import Pagination from "../components/Pagination";
import { useUsers } from "../services/hooks/useUsers";
import { ageFromDateOfBirthday } from "../services/utils/calculateAge";
import { DATE } from '../services/utils/formats'
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import Head from 'next/head'
import { theme } from "../styles/theme";

type SearchProps = {
  name: string | any[];
  email: string | any[];
  cpf: string | any[];
  status: string | any[];
  insert: string | any[];
}

type ShowUsers = {
  _id: Key | null | undefined; 
  name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
  email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
  cpf: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
  date: string; 
  tel: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
  nameMother: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; 
  status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
}

export default function UserList({users}: any){
  const [ checked, setChecked] = useState(false);
  const [ page, setPage ] = useState(1)
  const [ search, setSearch ] = useState('')
  
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users,
  })

  function handleFilter(array: any, s: any) {
      const result = array?.filter(
        (e: SearchProps) => e.name.includes(s) || e.email.includes(s) || e.cpf.includes(s) || e.status.includes(s) || e.insert.includes(s)
        )
      return setSearch(result)
  }

  console.log(search)
  
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return(
    <Box h="100vh" overflowY="auto"
    css={{
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        width: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: theme.colors.gray[600],
        borderRadius: '24px',
      },
    }}>
      
    <Head>
    <title>Usuários</title>
    </Head>
      <Header/>
      <Flex as="label" flex="1" py="4" px="8" ml="6" maxWidth={400} alignSelf="center" color="gray.200" position="relative" bg="gray.800" borderRadius="full">
      <Input color="gray.50" variant="unstyled" px="4" mr="4" placeholder="Buscar na plataforma" _placeholder={{
        color: 'gray.400'
      }} onChange={e => handleFilter(data?.users, e?.target.value)}/>
      <Icon as={RiSearchLine} fontSize="20" cursor={"pointer"}/>
      </Flex>
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Box flex="1"  borderRadius={8} bg="gray.800" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
          { !isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/> }
          </Heading>
          { !checked ? 
            <Button size="sm" fontSize="sm" rightIcon={<RiGroupLine />} colorScheme="red" disabled={!checked}>
            {!isLoading ? !data?.users.length ? "Erro" :  data?.users.length + " usuários" : "Carregando..."}
          </Button>
                   : 
           <Button size="sm" fontSize="sm" rightIcon={<RiDeleteBinLine />} colorScheme="red">
           Deletar
         </Button>
          }
      </Flex>
      { isLoading ? (
        <Flex justify="center" >
          <Spinner/>
        </Flex>
      ) : error ? (
        <Flex justify="center" >
          <Text>Falha ao obter dados dos usuários.</Text>
        </Flex>
      ): (
        <>
        <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
          <Th px={["4","4","6"]} color="gray.300" width="8">
              <Checkbox colorScheme="red" onChange={() => !checked ? setChecked(true) : setChecked(false)}/>
            </Th>
            <Th>Usuário</Th>
            <Th>CPF</Th>
            <Th>Nascimento</Th>
            <Th>Idade</Th>
            <Th>Telefone</Th>
            <Th>Nome da mãe</Th>
            <Th>Status</Th>
            <Th>Opções</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.users.map((user: ShowUsers) => {
            return (
              <>
              <Tr key={user._id}>
            <Td px={["4","4","6"]}>
            <Checkbox colorScheme="red" isChecked={checked} hidden={!checked}/>
            </Td>
            <Td>
              <Box>
                <Text color="red.400" colorScheme="red" fontWeight="bold">{user.name}</Text>
                <Text fontSize="sm" color="gray.300">{user.email}</Text>
              </Box>
            </Td>
            <Td>{user.cpf}</Td> 
            <Td>{DATE(user.date)}</Td>
            <Td>{ageFromDateOfBirthday(user.date) + " anos"}</Td>
            <Td>{user.tel}</Td>
            <Td>{user.nameMother}</Td>
            <Td>{user.status}</Td>
            <Td>
            <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton isActive={isOpen} size="sm" as={Button} fontSize="sm" colorScheme="red">
              <Icon as={RiMore2Fill}/>
                {/* {isOpen ? 'Fechar' : 'Abrir'} */}
              </MenuButton>
              <MenuList>
                <MenuItem color="black">Editar</MenuItem>
                <MenuItem color="black" onClick={() => alert('Excluindo...')}>Excluir</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
            </Td>
          </Tr>
          </>
            )
          })}
        </Tbody>
      </Table>
      <Pagination
      totalCountOfRegisters={data?.users.length}
      currentPage={page}
      onPageChange={setPage}
      />
        </>
      )}
      </Box>
      </Flex>
    </Box>
  );
}
