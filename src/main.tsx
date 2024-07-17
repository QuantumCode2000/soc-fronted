import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MovementsProvider } from "./contexts/MovementsContext/MovementsContenx.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MovementsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MovementsProvider>,
);
