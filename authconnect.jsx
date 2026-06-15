"import React, { createContext, useContext, useEffect, useState } from \"react\";
import { api } from \"@/lib/api\";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(\"panama_token\");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get(\"/auth/me\")
      .then((r) => setUser(r.data))
      .catch(() => localStorage.removeItem(\"panama_token\"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post(\"/auth/login\", { email, password });
    localStorage.setItem(\"panama_token\", data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (email, password, name) => {
    const { data } = await api.post(\"/auth/register\", { email, password, name });
    localStorage.setItem(\"panama_token\", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    localStorage.removeItem(\"panama_token\");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
"
