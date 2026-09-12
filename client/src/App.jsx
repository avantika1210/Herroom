import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import CreateBusiness from "./pages/CreateBusiness";
import MyBusinesses from "./pages/MyBusinesses";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct";
import MyProducts from "./pages/MyProducts";
import EditBusiness from "./pages/EditBusiness";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Notifications from "./pages/Notifications";
import Appearence from "./pages/Appearence";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-business"
          element={
            <ProtectedRoute>
              <CreateBusiness />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-businesses"
          element={
            <ProtectedRoute>
              <MyBusinesses />
            </ProtectedRoute>
          }
        />

        {/* 🔥 FIXED ROUTE */}
        <Route
          path="/create-product/:businessId"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
  path="/products/:businessId"
  element={
    <ProtectedRoute>
      <MyProducts />
    </ProtectedRoute>
  }
/>


<Route
  path="/edit-product/:id"
  element={
    <ProtectedRoute>
      <EditProduct />
    </ProtectedRoute>
  }
/>

<Route path="/edit-business/:id" element={<EditBusiness />} />

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>


<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>



<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>


<Route
  path="/appearance"
  element={
    <ProtectedRoute>
      <Appearence />
    </ProtectedRoute>
  }
/>



      </Routes>
    </BrowserRouter>
  );
}

export default App;