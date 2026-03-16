"use client";

import { useSession } from "contexts/session";

const AuthStatusDebug = (): React.ReactElement => {
  const { sessionLoaded, auth, login, logout } = useSession();

  return (
    <div style={{ position: "fixed", bottom: 8, right: 8, fontSize: 10 }}>
      <div>sessionLoaded: {String(sessionLoaded)}</div>
      <div>isLoading: {String(auth.isLoading)}</div>
      <div>hasIdentity: {String(Boolean(auth.identity))}</div>
      <div>error: {auth.error ?? "none"}</div>
      <button type="button" onClick={() => login()}>
        login
      </button>
      <button type="button" onClick={() => logout()}>
        logout
      </button>
    </div>
  );
};

export default AuthStatusDebug;
