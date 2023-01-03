import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemsPage, LoginPage, SignUpPage } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}
