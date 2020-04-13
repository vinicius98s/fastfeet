import { createContext } from "react";

export type User = {
  id: number;
  email: string;
  name: string;
} | null;

interface Session {
  token: string;
  user: User;
  updateToken: (token: string) => void;
  updateUser: (user: User) => void;
}

export const SessionContext = createContext<Session>({
  token: "",
  user: null,
  updateToken: (token: string) => {},
  updateUser: (user: User) => {},
});
