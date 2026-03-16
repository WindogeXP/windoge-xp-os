"use client";

import styled from "styled-components";
import { useSession } from "@/contexts/session";
import { useEffect } from "react";
import { useBoot } from "@/contexts/boot";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  min-height: 100vh;
`;

const LogonState = (): React.ReactElement => {
  const { login, auth } = useSession();
  const { setBootState } = useBoot();

  useEffect(() => {
    if (auth.identity) {
      setBootState("DESKTOP");
    }
  }, [auth.identity]);

  return (
    <Container>
      <p>Login screen placeholder</p>
      <button type="button" onClick={() => login()}>
        Login
      </button>
    </Container>
  );
};

export default LogonState;
