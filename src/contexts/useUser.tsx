import { createContext, memo, useContext, useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';

import type { ReactNode } from 'react';

export interface UserType {
  accountId?: number;
  login: boolean;
}

export type UserPropsType = UserType | undefined;

export interface ContextType {
  user: UserPropsType;
  setUser: (value: UserPropsType) => void;
}

const UserContext = createContext<ContextType>({
  user: undefined,
  setUser: () => undefined,
});

export interface UserProps {
  children?: ReactNode;
}

export const UserProvider = memo(function UserProvider({ children }: UserProps) {
  const [user, setUser] = useState<UserPropsType>(undefined);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  const [cookies] = useCookies(['id']);

  useEffect(() => {
    if (cookies.id) setUser({ login: true, accountId: Number(cookies.id) });
  }, [cookies]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

export const useUser = () => useContext(UserContext);
