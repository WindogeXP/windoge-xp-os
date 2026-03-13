import { BOOT_STATE_ORDER } from "./BootConfig";
import { BootState } from "./types";

// Helper to check if transition is valid
export const canTransitionTo = (
  current: BootState,
  next: BootState
): boolean => {
  const currentIndex = BOOT_STATE_ORDER.indexOf(current);
  const nextIndex = BOOT_STATE_ORDER.indexOf(next);
  return nextIndex === currentIndex + 1;
};
