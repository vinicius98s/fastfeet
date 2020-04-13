import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import * as S from "./styles";

import api from "../../services/api";
import { validateMail, validatePassword } from "../../utils/validation";

import { SessionContext, User } from "../../contexts/SessionContext";

import logo from "../../assets/images/fastfeet-logo.png";
import Button from "../../components/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { updateUser, updateToken } = useContext(SessionContext);
  const history = useHistory();

  useEffect(() => {
    if (!validateMail(email) || !validatePassword(password)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [email, password]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();

      const { data } = await api.post("/session", {
        email,
        password,
      });

      const user: User = {
        name: data.user.name,
        email: data.user.email,
        id: data.user.id,
      };

      updateToken(data.token as string);
      updateUser(user);
      history.push("/");
    } catch (e) {
      if (e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError("Something wrong happened, please try again!");
      }
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, id } = e.target;
    if (id === "email") {
      setEmail(value);
    }

    if (id === "password") {
      setPassword(value);
    }

    setError("");
  }

  return (
    <S.Container>
      <div>
        <img src={logo} alt="FastFeet" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Your e-mail</label>
          <input
            onChange={handleOnChange}
            type="email"
            placeholder="exemplo@email.com"
            id="email"
            autoComplete="email"
          />
          <label htmlFor="password">Your password</label>
          <input
            onChange={handleOnChange}
            type="password"
            placeholder="••••••••"
            id="password"
            autoComplete="current-password"
          />
          {error && <span>{error}</span>}
          <Button disabled={!isValid}>Sign in</Button>
        </form>
      </div>
    </S.Container>
  );
};

export default Login;
