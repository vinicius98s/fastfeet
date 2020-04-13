import React, { useContext } from "react";
import styled from "styled-components";

import logo from "../assets/images/fastfeet-logo.png";
import { SessionContext } from "../contexts/SessionContext";

const Wrapper = styled.header`
  background-color: ${(p) => p.theme.colors.white};
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 30px;
  height: 64px;

  > span {
    width: 1px;
    background: ${(p) => p.theme.colors.gray};
    height: 32px;
    margin: 0 30px;
  }

  > img {
    max-width: 135px;
  }

  > ul {
    display: flex;
    list-style: none;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    align-items: flex-end;

    span {
      font-size: 14px;
      color: #666666;
      font-weight: 600;
    }

    button {
      background: none;
      cursor: pointer;
      border: none;
      outline: none;
      color: ${(p) => p.theme.colors.red};
    }
  }
`;

const MenuItem = styled.li<{ active?: boolean }>`
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  color: ${(p) => (p.active ? p.theme.colors.darkGray : p.theme.colors.gray1)};

  :not(:last-child) {
    margin-right: 20px;
  }
`;

interface Props {
  name?: string;
}

const Header: React.FC<Props> = ({ name }) => {
  const { user } = useContext(SessionContext);

  return (
    <Wrapper>
      <img src={logo} alt="Fastfeet" />
      <span />
      <ul>
        <MenuItem active>Encomendas</MenuItem>
        <MenuItem>Entregadores</MenuItem>
        <MenuItem>Destinatários</MenuItem>
        <MenuItem>Problemas</MenuItem>
      </ul>
      <div>
        <span>{user?.name}</span>
        <button>sair do sistema</button>
      </div>
    </Wrapper>
  );
};

export default Header;
