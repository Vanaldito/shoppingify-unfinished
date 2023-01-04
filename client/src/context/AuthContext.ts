import { createContext } from "react";

interface AuthContextValue {
  isLogged: undefined | boolean;
  setIsLogged: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  setIsLogged: () => undefined,
});

export default AuthContext;
