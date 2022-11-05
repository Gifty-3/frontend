import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode, useMemo } from "react";

interface ReactQueryProviderProps {
  children?: ReactNode;
}
const ReactQueryProvider: FC<ReactQueryProviderProps> = (props) => {
  const { children } = props;
  const client = useMemo(() => {
    return new QueryClient();
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default ReactQueryProvider;
