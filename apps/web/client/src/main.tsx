import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster, TooltipProvider } from "@repo/ui";

createRoot(document.getElementById("root")!).render(
  <>
    <TooltipProvider>
      <App />
      <Toaster />
    </TooltipProvider>
  </>,
);
