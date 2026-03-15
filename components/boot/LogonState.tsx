"use client";

import styled from "styled-components";
import { useBoot } from "contexts/boot";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  min-height: 100vh;
`;

const LogonState = (): React.ReactElement => {
  const { setBootState } = useBoot();

  return (
    <Container>
      <p>Login screen placeholder</p>
      <button type="button" onClick={() => setBootState("DESKTOP")}>
        Login
      </button>
    </Container>
  );
};

export default LogonState;
