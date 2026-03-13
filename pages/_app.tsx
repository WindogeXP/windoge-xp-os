import { type AppProps } from "next/app";
import { memo } from "react";
import { BootProvider } from "contexts/boot";
import { ViewportProvider } from "contexts/viewport";
import BootShell from "components/boot/BootShell";

const App = ({ Component: Index, pageProps }: AppProps): React.ReactElement => (
  <ViewportProvider>
    <BootProvider>
      <BootShell>
        <Index {...pageProps} />
      </BootShell>
    </BootProvider>
  </ViewportProvider>
);

export default memo(App);
