"use client";

import { useEffect } from "react";
import { BootProvider } from "contexts/boot";
import { ViewportProvider } from "contexts/viewport";
import ShellFrame from "components/boot/ShellFrame";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps): React.ReactElement => {
  useEffect(() => {
    const hideInitialBlack = (): void => {
      const el = document.getElementById("initial-black");
      if (el) el.setAttribute("aria-hidden", "true");
    };
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(hideInitialBlack);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <ViewportProvider>
      <BootProvider>
        <ShellFrame>{children}</ShellFrame>
      </BootProvider>
    </ViewportProvider>
  );
};

export default Providers;
