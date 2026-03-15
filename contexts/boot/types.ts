export type BootState =
  | "SYSTEM_LOADING" // Boot / loading screen
  | "LOGON" // Login screen
  | "DESKTOP"; // Full OS / app content

export interface BootContextState {
  state: BootState;
  error: Error | null; // Any boot error
  progress: number;
  message: string;
  setBootState: (state: BootState) => void;
  setProgress: (progress: number, message?: string) => void;
  setError: (error: Error) => void;
  reset: () => void;
}
