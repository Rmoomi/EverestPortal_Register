import RegisterAcc from "./components/Register.jsx";
import Homepage from "./components/Home_page.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Root/default route */}
        <Route path="/register" element={<RegisterAcc />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
