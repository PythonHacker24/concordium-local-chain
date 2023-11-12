import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./";
import "./styles.css";
import BuildVersion from "./components/BuildVersion";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <React.StrictMode>
          <div className="flex flex-col justify-between min-h-screen">
               <App />
               <div className="mt-auto justify-end  flex p-1 text-dark text-opacity-50 text-sm">
                    <BuildVersion />
               </div>
          </div>
     </React.StrictMode>
);
