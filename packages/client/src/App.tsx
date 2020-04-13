import React, { useState, useEffect } from "react";

import Routes from "./routes";

import { SessionContext, User } from "./contexts/SessionContext";
import useLocalStorage from "./hooks/useLocalStorage";
import api from "./services/api";

const App: React.FC = () => {
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useLocalStorage<string>("@fastfeet:token", "");

  async function checkTokenValidation() {
    try {
      const { data } = await api.post("/session/validate", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);

      if (data.payload) {
        setUser({
          id: data.payload.id,
          name: data.payload.name,
          email: data.payload.email,
        });
      }
    } catch (e) {
      setToken("");
    }
  }

  useEffect(() => {
    if (token !== "" && !user) {
      checkTokenValidation();
    }

    setSigned(token !== "" && !!user);
  }, [token, user]);

  return (
    <SessionContext.Provider
      value={{
        user,
        updateUser: (user: User) => {
          setUser(user);
        },
        token,
        updateToken: (token: string) => {
          setToken(token);
        },
      }}
    >
      <Routes signed={signed} />
    </SessionContext.Provider>
  );
};

export default App;
