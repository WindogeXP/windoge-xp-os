export type BootState =
  | "initializing" // App starting - React mounting
  | "booting" // OS booting - initializing filesystem, services
  | "loading" // Resources loading - loading user data, apps
  | "ready" // Ready for login - showing login screen
  | "authenticated" // Logged in - user authenticated
  | "desktop"; // At desktop - full OS ready

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
