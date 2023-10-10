import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import Nav from "./pages/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import Update from "./pages/Update";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import Landingpage from "./pages/Landingpage";
import RequestNotes from "./pages/RequestNotes";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/adminlogin/:randomString" element={<AdminPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/nav" element={<Nav />} />
              <Route path="/add" element={<Add />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/request" element={<RequestNotes />} />
              <Route path="/update/:id" element={<Update />} />
              <Route path="/explore" element={<Home />} />
            </Route>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
