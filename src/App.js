import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./userContext";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
