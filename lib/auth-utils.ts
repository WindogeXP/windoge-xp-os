import { AuthClient } from "@icp-sdk/auth/client";
import type { Identity } from "@icp-sdk/core/agent";
import { AnonymousIdentity } from "@icp-sdk/core/agent";

/**
 * Check if we have a non-null, non-undefined identity.
 *
 * Note: this does not distinguish between anonymous and authenticated principals;
 * that decision is handled at a higher level.
 */
export const isSignedIn = (identity: Identity | undefined | null): boolean =>
  identity !== undefined && identity !== null;

/**
 * Create an AuthClient to manage authentication and identity.
 *
 * - Session duration is handled by the auth package.
 * - Idle manager is disabled to avoid surprises when using multiple tabs.
 */
export const createAuthClient = (): Promise<AuthClient> =>
  AuthClient.create({
    idleOptions: {
      disableIdle: true,
      disableDefaultIdleCallback: true,
    },
  });

/**
 * Load the current identity from an AuthClient instance.
 * Returns undefined if the user is not authenticated.
 */
export const loadIdentity = async (): Promise<Identity | undefined> => {
  const authClient = await createAuthClient();
  const authenticated = await authClient.isAuthenticated();

  if (!authenticated) {
    return undefined;
  }

  return authClient.getIdentity() as Identity;
};

/**
 * Identity Provider URL used for the Internet Identity login flow.
 *
 * Prefer configuring via NEXT_PUBLIC_II_CANISTER_URL, otherwise fall back
 * to the default II service.
 */
export const getIdentityProviderUrl = (): string =>
  process.env.NEXT_PUBLIC_II_CANISTER_URL ?? "https://id.ai";

/**
 * An anonymous identity that can be used for public calls to the IC.
 */
export const getAnonymousIdentity = (): Identity => new AnonymousIdentity();
