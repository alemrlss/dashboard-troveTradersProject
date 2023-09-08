import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import { AuthContextProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/dashboard";
import PublicRoute from "./components/Router/publicRoute";
import PrivateRoute from "./components/Router/privateRoute";
import Users from "./pages/users";
import Disputes from "./pages/disputes";
import Blocks from "./pages/blocks";
import Admin from "./pages/admin";
import { ColorProvider } from "./contexts/colorContext";
import { FontProvider } from "./contexts/FontContext";
import { SocketProvider } from "./contexts/socketContext";
import Dispute from "./pages/dispute";

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <SocketProvider>
          <ColorProvider>
            <FontProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/usuarios" element={<Users />} />
                    <Route path="/dashboard/disputas" element={<Disputes />} />
                    <Route path="/dashboard/bloqueos" element={<Blocks />} />
                    <Route path="/dispute/:id" element={<Dispute />} />
                    <Route
                      path="/dashboard/administracion"
                      element={<Admin />}
                    />
                    <Route path="/dashboard/*" element={<h1>Not Found</h1>} />
                  </Route>

                  <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
              </BrowserRouter>
            </FontProvider>
          </ColorProvider>
        </SocketProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
