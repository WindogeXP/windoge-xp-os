import { useCallback, useState } from "react";
import { BootContextState, BootState } from "./types";
import { canTransitionTo } from "./functions";

const INITIAL_STATE: BootState = "SYSTEM_LOADING";

const useBootContextState = (): BootContextState => {
  const [state, setState] = useState<BootState>(INITIAL_STATE);
  const [error, setErrorState] = useState<Error | null>(null);
  const [progress, setProgressValue] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const setBootState = useCallback((next: BootState) => {
    setState((current) => {
      if (!canTransitionTo(current, next) && current !== next) {
        return next;
      }
      return next;
    });
  }, []);

  const setProgress = useCallback((value: number, msg?: string) => {
    setProgressValue(value);
    if (msg !== undefined) {
      setMessage(msg);
    }
  }, []);

  const setError = useCallback((err: Error) => {
    setErrorState(err);
  }, []);

  const reset = useCallback(() => {
    setState(INITIAL_STATE);
    setErrorState(null);
    setProgressValue(0);
    setMessage("");
  }, []);

  return {
    state,
    error,
    progress,
    message,
    setBootState,
    setProgress,
    setError,
    reset,
  };
};

export default useBootContextState;
