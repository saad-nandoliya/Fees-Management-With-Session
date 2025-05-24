import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SessionClassProvider } from "./context/YearsAndClasses/YearsAndClasses";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionClassProvider>
      <App />
    </SessionClassProvider>
  </StrictMode>
);
