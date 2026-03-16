import { useCallback, useEffect, useState } from "react";
import type { SessionContextState } from "contexts/session/types";
import type { AuthServiceData } from "@/types/auth";
import { authService } from "@/services/AuthService";

const INITIAL_AUTH_STATE: AuthServiceData = {
  identity: null,
  isLoading: false,
  error: null,
};

const useSessionContextState = (): SessionContextState => {
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [auth, setAuth] = useState<AuthServiceData>(INITIAL_AUTH_STATE);

  useEffect(() => {
    const unsubscribe = authService.subscribe((data) => {
      setAuth(data);
    });

    // Seed initial state synchronously
    setAuth(authService.getState());

    // Initial sync to restore identity from session
    authService
      .sync()
      .finally(() => {
        setSessionLoaded(true);
      })
      .catch(() => {
        // Errors are already reflected in authService state
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = useCallback(async () => {
    await authService.signIn();
  }, []);

  const logout = useCallback(async () => {
    await authService.signOut();
  }, []);

  const syncAuth = useCallback(async () => {
    await authService.sync();
  }, []);

  const setSessionLoadedFlag = useCallback((loaded: boolean) => {
    setSessionLoaded(loaded);
  }, []);

  return {
    sessionLoaded,
    auth,
    setSessionLoaded: setSessionLoadedFlag,
    login,
    logout,
    syncAuth,
  };
};

export default useSessionContextState;
