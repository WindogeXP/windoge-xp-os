import {
  createContext,
  memo,
  useContext,
  type PropsWithChildren,
  type ReactElement,
} from "react";

type ProviderComponent = (props: PropsWithChildren) => ReactElement;

const contextFactory = <T,>(
  useContextState: () => T,
  ContextComponent?: React.JSX.Element
): {
  Provider: React.MemoExoticComponent<ProviderComponent>;
  useContext: () => T;
} => {
  const Context = createContext(Object.create(null) as T);

  const ProviderBase = ({ children }: PropsWithChildren): ReactElement => (
    <Context.Provider value={useContextState()}>
      {children}
      {ContextComponent}
    </Context.Provider>
  );

  (ProviderBase as React.FC).displayName = "ContextProvider";

  return {
    Provider: memo<ProviderComponent>(ProviderBase),
    useContext: () => useContext(Context),
  };
};

export default contextFactory;
