import {
  RouterProvider,
  createBrowserRouter,
  useRouteError,
} from "react-router-dom";
import { BASE_URL } from "../../shared/config";
import { LoginPage } from "../../pages/login";

function BubbleError() {
  const error: any = useRouteError();
  if (
    error &&
    error instanceof TypeError &&
    error.message.includes("Failed to fetch dynamically imported module")
  ) {
    return (
      <div className="loading">
        <span className="flash_loader"></span>
      </div>
    );
  }
  if (error) throw error;
  return null;
}

export function BrowserRouter({ queryClient }: any) {
  const router = createBrowserRouter(
    [
      {
        errorElement: <BubbleError />,
        children: [
          ...[
            {
              element: <LoginPage />,
              path: "login",
            },
          ],
        ],
      },
    ],
    {
      basename: BASE_URL,
    }
  );

  return <RouterProvider router={router} />;
}
