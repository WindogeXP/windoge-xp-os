import { type AppProps } from "next/app";
import { memo } from "react";

const App = ({ Component: Index, pageProps }: AppProps): React.ReactElement => (
  <Index {...pageProps} />
);

export default memo(App);
