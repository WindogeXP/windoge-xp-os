import type { Identity } from "@icp-sdk/core/agent";

export interface AuthServiceData {
  identity: Identity | null;
  isLoading: boolean;
  error: string | null;
}
