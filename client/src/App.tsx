import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, ShoppingListProvider } from "./components";
import { HistoryPage, ItemsPage, LoginPage, SignUpPage } from "./pages";

export default function App() {
  return (
    <AuthProvider>
      <ShoppingListProvider>
        <Routes>
          <Route path="/" element={<ItemsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </ShoppingListProvider>
    </AuthProvider>
  );
}
