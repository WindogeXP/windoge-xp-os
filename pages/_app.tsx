import { type AppProps } from "next/app";
import { memo } from "react";
import { BootProvider } from "contexts/boot";
import BootShell from "components/boot/BootShell";

const App = ({ Component: Index, pageProps }: AppProps): React.ReactElement => (
  <BootProvider>
    <BootShell>
      <Index {...pageProps} />
    </BootShell>
  </BootProvider>
);

export default memo(App);
