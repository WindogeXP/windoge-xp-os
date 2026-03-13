"use client";

import { BootProvider } from "contexts/boot";
import { ViewportProvider } from "contexts/viewport";
import BootShell from "components/boot/BootShell";

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps): React.ReactElement => (
  <ViewportProvider>
    <BootProvider>
      <BootShell>{children}</BootShell>
    </BootProvider>
  </ViewportProvider>
);

export default Providers;
