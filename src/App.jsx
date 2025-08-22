import RegisterAcc from "./components/Register.jsx";
import Homepage from "./components/Home_page.jsx";
import Login from "./components/Login.jsx";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Root/default route */}
        <Route path="/register" element={<RegisterAcc />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
