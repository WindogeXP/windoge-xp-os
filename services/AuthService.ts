import type { AuthClient } from "@icp-sdk/auth/client";
import type { Identity } from "@icp-sdk/core/agent";
import type { AuthServiceData } from "@/types/auth";
import { createAuthClient, getIdentityProviderUrl } from "@/lib/auth-utils";

class AuthService {
  private authClient: AuthClient | null = null;
  private listeners: Array<(data: AuthServiceData) => void> = [];
  private data: AuthServiceData = {
    identity: null,
    isLoading: false,
    error: null,
  };

  subscribe(listener: (data: AuthServiceData) => void): () => void {
    this.listeners.push(listener);
    listener(this.data);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener({ ...this.data }));
  }

  private setState(updates: Partial<AuthServiceData>): void {
    this.data = { ...this.data, ...updates };
    this.notify();
  }

  async sync(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      this.authClient = this.authClient ?? (await createAuthClient());
      const isAuthenticated = await this.authClient.isAuthenticated();

      this.setState({
        identity: isAuthenticated
          ? (this.authClient.getIdentity() as Identity)
          : null,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        isLoading: false,
        identity: null,
      });
    }
  }

  async signIn(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      this.authClient = this.authClient ?? (await createAuthClient());

      return new Promise((resolve, reject) => {
        this.authClient!.login({
          identityProvider: getIdentityProviderUrl(),
          maxTimeToLive: BigInt(30 * 60 * 1_000_000_000),
          onSuccess: () => {
            this.setState({
              identity: (this.authClient?.getIdentity() as Identity) ?? null,
              isLoading: false,
            });
            resolve();
          },
          onError: (error) => {
            this.setState({
              error: error || "Login failed",
              isLoading: false,
            });
            reject(new Error(error || "Login failed"));
          },
        }).catch((e) => {
          const errorMessage = (e as Error).message;
          this.setState({
            error: errorMessage,
            isLoading: false,
          });
          reject(e);
        });
      });
    } catch (e) {
      const errorMessage = (e as Error).message;
      this.setState({
        error: errorMessage,
        isLoading: false,
      });
      throw e;
    }
  }

  async signOut(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });
      const client = this.authClient ?? (await createAuthClient());
      await client.logout();
      this.authClient = null;

      this.setState({
        identity: null,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: (error as Error).message,
        isLoading: false,
      });
    }
  }

  getState(): AuthServiceData {
    return { ...this.data };
  }
}

export const authService = new AuthService();
