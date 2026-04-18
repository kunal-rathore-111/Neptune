import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "@repo/ui";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>,
);
