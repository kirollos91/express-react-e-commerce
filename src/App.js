import { Routes, Route } from "react-router-dom";

// Pages And Components
import Website from "./Pages/Website/Website";
import HomePage from "./Pages/Website/HomePage/HomePage";
import WebsiteCategories from "./Pages/Website/Categories/Categories";
import SingleProduct from "./Pages/Website/SingleProduct/SingleProduct";

// AUTH
import Login from "./Pages/Auth/AuthOperations/Login";
import Register from "./Pages/Auth/AuthOperations/Register";
import GoogleCallBack from "./Pages/Auth/AuthOperations/GoogleCallBack";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";

// DASHBOARD
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import User from "./Pages/Dashboard/Users/User";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Writer from "./Pages/Dashboard/Writer";
import Categories from "./Pages/Dashboard/Categories/Categories";
import AddCategory from "./Pages/Dashboard/Categories/AddCategory";
import Category from "./Pages/Dashboard/Categories/Category";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import Product from "./Pages/Dashboard/Products/Product";

// 404
import Error404 from "./Pages/Auth/Errors/404";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<Website />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/categories" element={<WebsiteCategories />} />
      </Route>

      <Route element={<RequireBack />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/api/auth/google/callback" element={<GoogleCallBack />} />
      </Route>
      {/* Protected Routes */}
      <Route
        element={
          <RequireAuth allowedRole={["Writer", "Admin", "Product_Manger"]} />
        }
      >
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["Admin"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>

          <Route element={<RequireAuth allowedRole={["Writer", "Admin"]} />}>
            <Route path="writer" element={<Writer />} />
          </Route>
          <Route
            element={<RequireAuth allowedRole={["Product_Manger", "Admin"]} />}
          >
            <Route path="categories" element={<Categories />} />
            <Route path="category/add" element={<AddCategory />} />
            <Route path="categories/:id" element={<Category />} />
          </Route>
          <Route
            element={<RequireAuth allowedRole={["Product_Manger", "Admin"]} />}
          >
            <Route path="products" element={<Products />} />
            <Route path="product/add" element={<AddProduct />} />
            <Route path="products/:id" element={<Product />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
