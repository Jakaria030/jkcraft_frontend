import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Settings from "./pages/Settings";
import Editor from "./pages/Editor";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Private Routes - Dashboard*/}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Private Routes - Editor */}
        <Route
          path="/editor/:id"
          element={<ProtectedRoute>
            <Editor />
          </ProtectedRoute>}
        />

        {/* Redirect To Dashboard for Unmatch Route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter >
  );
};

export default App;
