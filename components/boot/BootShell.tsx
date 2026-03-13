import { useEffect } from "react";
import { useBoot } from "contexts/boot";
import { osBootAssets } from "config/assets";
import { preloadAssets } from "utils/preload";
import BootScreen from "./BootScreen";

type BootShellProps = {
  children: React.ReactNode;
};

const BootShell = ({ children }: BootShellProps) => {
  const { state, progress, message, error, setBootState } = useBoot();

  useEffect(() => {
    let cancelled = false;

    setBootState("booting");

    const t1 = setTimeout(() => {
      if (cancelled) return;
      setBootState("loading");
    }, 1000);

    const preloadPromise = preloadAssets(osBootAssets).catch(() => undefined);

    const fallbackTimeout = setTimeout(() => {
      if (cancelled) return;
      setBootState("ready");
    }, 4000);

    preloadPromise.then(() => {
      if (cancelled) return;
      clearTimeout(fallbackTimeout);
      setBootState("ready");
    });

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(fallbackTimeout);
    };
  }, [setBootState]);

  if (error) {
    return <div>Boot error: {error.message}</div>;
  }

  if (state === "initializing" || state === "booting" || state === "loading") {
    return <BootScreen state={state} progress={progress} message={message} />;
  }

  if (state === "ready") {
    return (
      <div>
        <div>Login screen placeholder</div>
        <button type="button" onClick={() => setBootState("desktop")}>
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default BootShell;
