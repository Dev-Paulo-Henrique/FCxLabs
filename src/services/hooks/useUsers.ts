import { useQuery, UseQueryOptions, QueryKey } from "react-query";
import { api } from "../../services/api";

type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  tel: string;
  date: string;
  nameMother: string;
  login: [string];
  insert: string;
  update: string;
  status: string;
};

type GetUsersResponse = {
  totalCount: number;
  users: User[];
};

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/search", {
    params: {
      page,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user: User) => {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      tel: user.tel,
      date: user.date,
      password: user.password,
      cpf: user.cpf,
      status: user.status,
      insert: user.insert,
      update: user.update,
      nameMother: user.nameMother,
    };
  });
  return { users, totalCount };
}

export function useUsers(page: number, options: UseQueryOptions) {
  return useQuery<any, unknown, any, QueryKey>(
    ["users", page],
    () => getUsers(page),
    {
      staleTime: 1000 * 60 * 10,
      ...options,
    }
  );
}
