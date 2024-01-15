import { createContext, ReactNode, useState } from "react";
import { App } from "realm-web";
import { APP_ID } from "../realm/constants";
import apiService from "../service/apiService";
import React from "react";

export interface User {
  roles: string[]
  accessToken:string
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  fetchUser: any
  emailPasswordLogin:any
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => { },
  fetchUser: null,
  emailPasswordLogin:null
});

interface UserProviderProps {
  children: ReactNode;
}

const app = new App(APP_ID);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (): Promise<User> => {
    try {
      const user: User = await apiService.me();


      setUser(user);


      return user;
    } catch (error) {
      throw error;
    }
  };

  const contextValue: UserContextProps = {
    user,
    setUser,
    fetchUser,
    emailPasswordLogin:null,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
