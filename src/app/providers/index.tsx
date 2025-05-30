import { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "./browser-router-provider";
import { QueryProvider } from "./query-client-provider";
import { withSuspense } from "../../shared/lib/react/react.hoc";
import { ErrorPage } from "../../pages/error/error";

const Providers = () => {
  useEffect(() => {
    const handleViteError = () => {
      window.location.reload();
    };

    window.addEventListener("vite:preloadError", handleViteError);

    return () => {
      window.removeEventListener("vite:preloadError", handleViteError);
    };
  }, []);

  return (
    <QueryProvider>
      <BrowserRouter></BrowserRouter>
    </QueryProvider>
  );
};

export const SuspensedProvider = withSuspense(Providers, {
  fallback: (
    <div className="loading">
      <span className="flash_loader"></span>
    </div>
  ),
});

export const Provider = withErrorBoundary(SuspensedProvider, {
  fallback: <ErrorPage />,
  onError(error) {
    console.error(error);
  },
});
