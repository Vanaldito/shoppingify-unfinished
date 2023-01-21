import { useState } from "react";
import { Navbar, ProtectedRoute } from "../../components";
import "./HistoryPage.css";

export default function HistoryPage() {
  const [displayAsideBar, setDisplayAsideBar] = useState(false);

  return (
    <ProtectedRoute>
      <div
        className={`history-page ${
          displayAsideBar ? "history-page--aside-bar-displayed" : ""
        }`.trim()}
      >
        <Navbar toggleAsideBar={() => setDisplayAsideBar(!displayAsideBar)} />
        <main className="history-page__main"></main>
        <aside className="history-page__aside"></aside>
      </div>
    </ProtectedRoute>
  );
}
