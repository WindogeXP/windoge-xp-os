import contextFactory from "contexts/contexFactory";
import type { ViewportContextState } from "contexts/viewport/types";
import useViewportContextState from "contexts/viewport/useViewportContextState";

const { Provider, useContext } = contextFactory<ViewportContextState>(
  useViewportContextState
);

export const ViewportProvider = Provider;
export const useViewport = useContext;
