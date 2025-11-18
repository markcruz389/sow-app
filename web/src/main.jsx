import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login/Login.jsx";
import PriceList from "./pages/PriceList/PriceList.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { TranslationProvider } from "./providers/TranslationProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <TranslationProvider defaultLanguage="en">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/price-list"
            element={
              <ProtectedRoute>
                <PriceList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </TranslationProvider>
    </BrowserRouter>
  </StrictMode>
);
