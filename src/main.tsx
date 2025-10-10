import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Optional: initialize global popovers or tooltips here if needed in future
// (We no longer import the entire bootstrap bundle globally since we import specific JS in components.)

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
