import "./App.css";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import router from "./utils/routes/routes";
import { queryClient } from "./lib/react-query-client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick={true}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                theme="colored"
            />
        </QueryClientProvider>
    );
}

export default App;
