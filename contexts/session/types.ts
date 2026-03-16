import type { AuthServiceData } from "@/types/auth";

export type SessionData = {
  sessionLoaded: boolean;
  auth: AuthServiceData;
};

export type SessionContextState = SessionData & {
  setSessionLoaded: (loaded: boolean) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  syncAuth: () => Promise<void>;
};
