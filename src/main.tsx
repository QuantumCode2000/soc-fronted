import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MovementsProvider } from "./contexts/MovementsContext/MovementsContenx.tsx";
import { WeaponsProvider } from "./contexts/WeaponsContext/WeaponsContext.tsx";
import { UsersProvider } from "./contexts/UsersContext/UsersContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <UsersProvider>
    <WeaponsProvider>
      <MovementsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </MovementsProvider>
    </WeaponsProvider>
  </UsersProvider>,
);
