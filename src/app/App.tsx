import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./app.css";
import { UsersPage } from "@pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
