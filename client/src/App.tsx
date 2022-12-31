import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemsPage } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemsPage />} />
    </Routes>
  );
}
