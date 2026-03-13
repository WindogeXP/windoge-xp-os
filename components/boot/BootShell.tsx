import { useEffect } from "react";
import { useBoot } from "contexts/boot";
import BootScreen from "./BootScreen";

type BootShellProps = {
  children: React.ReactNode;
};

const BootShell = ({ children }: BootShellProps) => {
  const { state, progress, message, error, setBootState } = useBoot();

  useEffect(() => {
    if (state !== "initializing") return;

    setBootState("booting");

    const t1 = setTimeout(() => {
      setBootState("loading");
    }, 1000);

    const t2 = setTimeout(() => {
      setBootState("ready");
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [state, setBootState]);

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
