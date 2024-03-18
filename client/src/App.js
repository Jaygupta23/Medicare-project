import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import About from './pages/About';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import { PrivateRoute } from './component/Routes/Private';
import ForgotPasswordSendOtp from './pages/Auth/ForgotPasswordSendOtp';
import ForgotPasswordVerifyOtp from './pages/Auth/ForgotPasswordVerifyOtp';
import { AdminRoute } from './component/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';



function App() {

  store.subscribe(() => {
    localStorage.setItem('reduxStore', JSON.stringify(store.getState()))
  })


  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/category/:slug" element={<CategoryProduct />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/search" element={<Search />} />

          <Route exact path="/dashboard" element={<PrivateRoute />}>
            <Route exact path="user" element={<Dashboard />} />
            <Route exact path="user/profile" element={<Profile />} />
            <Route exact path="user/orders" element={<Orders />} />
          </Route>

          <Route exact path="/dashboard" element={<AdminRoute />}>
            <Route exact path="admin" element={<AdminDashboard />} />
            <Route exact path="admin/create-category" element={<CreateCategory />} />
            <Route exact path="admin/create-product" element={<CreateProduct />} />
            <Route exact path="admin/product/:id" element={<UpdateProduct />} />
            <Route exact path="admin/products" element={<Products />} />
            <Route exact path="admin/users" element={<Users />} />
            <Route exact path="admin/orders" element={<AdminOrders />} />
          </Route>

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password-send-otp" element={<ForgotPasswordSendOtp />} />
          <Route exact path="/forgot-password-verify-otp" element={<ForgotPasswordVerifyOtp />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/policy' element={<Policy />} />
          <Route exact path='*' element={<PageNotFound />} />
        </Routes>

        <ToastContainer />
      </Provider>
    </>
  );
}

export default App;
