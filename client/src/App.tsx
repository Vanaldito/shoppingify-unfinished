import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemsPage, SignUpPage } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemsPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  );
}
