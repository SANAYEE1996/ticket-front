import ReactDOM from "react-dom/client";
import { Provider } from "./providers";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider />,
  </React.StrictMode>
);
