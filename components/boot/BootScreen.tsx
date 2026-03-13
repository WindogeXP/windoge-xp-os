import type { BootState } from "contexts/boot/types";

type BootScreenProps = {
  state: BootState;
  progress: number;
  message: string;
};

const BootScreen = ({ state, progress, message }: BootScreenProps) => (
  <div>
    <div>Windoge XP is {state}...</div>
    <div>Progress: {progress}%</div>
    {message && <div>{message}</div>}
  </div>
);

export default BootScreen;
