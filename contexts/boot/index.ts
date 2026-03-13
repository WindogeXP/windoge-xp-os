import contextFactory from "contexts/contexFactory";
import useBootContextState from "./useBootContextState";

const { Provider, useContext } = contextFactory(useBootContextState);

export { Provider as BootProvider, useContext as useBoot };
