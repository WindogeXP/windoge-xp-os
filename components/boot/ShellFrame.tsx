import { useBoot } from "contexts/boot";
import SystemLoadingState from "./SystemLoadingState";
import LogonState from "./LogonState";

type ShellFrameProps = {
  children: React.ReactNode;
};

const ShellFrame = ({ children }: ShellFrameProps): React.ReactElement => {
  const { state, error } = useBoot();

  if (error) {
    return <div>Boot error: {error.message}</div>;
  }

  switch (state) {
    case "SYSTEM_LOADING":
      return <SystemLoadingState />;
    case "LOGON":
      return <LogonState />;
    case "DESKTOP":
    default:
      return <>{children}</>;
  }
};

export default ShellFrame;
