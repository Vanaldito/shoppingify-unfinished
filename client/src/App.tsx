import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components";
import { ItemsPage, LoginPage, SignUpPage } from "./pages";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<ItemsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </AuthProvider>
  );
}
