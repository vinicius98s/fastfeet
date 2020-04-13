import styled from "styled-components";

export const Container = styled.div`
  background-color: ${(p) => p.theme.colors.purple};
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    width: 100%;
    height: 100%;
    max-width: 360px;
    max-height: 425px;
    padding: 60px 30px;
    background-color: ${(p) => p.theme.colors.white};
    border: 1px solid #979797;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    label {
      font-size: 14px;
      color: ${(p) => p.theme.colors.darkGray};
      text-transform: uppercase;
      margin-bottom: 10px;
      font-weight: 600;
    }

    input {
      padding: 12px 15px;
      border: 1px solid ${(p) => p.theme.colors.gray};
      border-radius: 4px;
      margin-bottom: 15px;
      outline: none;
      font-size: 14px;
      color: ${(p) => p.theme.colors.darkGray};

      :focus {
        border: 1px solid ${(p) => p.theme.colors.purple};
      }

      ::placeholder {
        font-size: 16px;
        color: ${(p) => p.theme.colors.gray1};
        font-weight: 400;
      }
    }

    span {
      font-size: 14px;
      color: ${(p) => p.theme.colors.red};
      margin-bottom: 12px;
    }
  }
`;
