import React from "react";
import styled from "styled-components";

const Wrapper = styled.button<{ disabled?: boolean }>`
  background: ${(p) =>
    p.disabled ? p.theme.colors.gray1 : p.theme.colors.purple};
  color: ${(p) => p.theme.colors.white};
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  cursor: ${(p) => (p.disabled ? "initial" : "pointer")};
`;

interface Props {
  icon?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<Props> = ({ icon, children, disabled, onClick }) => {
  return (
    <Wrapper disabled={disabled} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default Button;
