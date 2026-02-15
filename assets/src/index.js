import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// import "@douyinfe/semi-ui/dist/css/semi.min.css";
import "./styles/tailwind.css";

const container = document.getElementById("plugin-starter-root");

if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
