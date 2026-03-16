import contextFactory from "contexts/contexFactory";
import type { SessionContextState } from "contexts/session/types";
import useSessionContextState from "contexts/session/useSessionContextState";

const { Provider, useContext } = contextFactory<SessionContextState>(
  useSessionContextState
);

export const SessionProvider = Provider;
export const useSession = useContext;
