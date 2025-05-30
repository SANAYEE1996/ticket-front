import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { type ReactElement } from "react";
import { queryClient } from "../../shared/api/query-client";

type QueryClientProviderProps = {
  children: ReactElement;
};

export const QueryProvider = ({ children }: QueryClientProviderProps) => {
  const enhancedChildren = React.cloneElement(children, queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {enhancedChildren}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
