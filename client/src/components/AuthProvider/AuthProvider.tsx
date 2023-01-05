import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts";
import { useFetchAndLoad } from "../../hooks";
import { getAuthStatus } from "../../services";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined);

  const { callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    callEndpoint(getAuthStatus())
      .then(res => {
        if (res.status === 200 && res.data) {
          setIsLogged(res.data.authenticated);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}
