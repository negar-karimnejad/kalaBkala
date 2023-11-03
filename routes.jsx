import AboutUs from "./src/Pages/AboutUs/AboutUs";
import Article from "./src/Pages/Article/Article";
import Checkout from "./src/Pages/Checkout/Checkout";
import Complaint from "./src/Pages/Complaint/Complaint";
import ContactUs from "./src/Pages/ContactUs/ContactUs";
import Home from "./src/Pages/Home/Home";
import Login from "./src/Pages/Login/Login";
import NotFound from "./src/Pages/NotFound/NotFound";
import Privacy from "./src/Pages/Privacy/Privacy";
import Products from "./src/Pages/Products/Products";
import Register from "./src/Pages/Register/Register";
import ShoppingCart from "./src/Pages/ShoppingCart/ShoppingCart";
import SingleProduct from "./src/Pages/SingleProduct/SingleProduct";
import Terms from "./src/Pages/Terms/Terms";
import Tracking from "./src/Pages/Tracking/Tracking";
import AccountDetails from "./src/Pages/UserPanel/AccountDetails";
import Address from "./src/Pages/UserPanel/Address";
import Favorites from "./src/Pages/UserPanel/Favorites";
import UserPanel from "./src/Pages/UserPanel/UserPanel";
import UserPanelIndex from "./src/Pages/UserPanel/UserPanelIndex";
import UserPanelOrders from "./src/Pages/UserPanel/UserPanelOrders";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/cart", element: <ShoppingCart /> },
  { path: "/products/:page", element: <Products /> },
  { path: "/products/category/:category", element: <Products /> },
  { path: "/products/search/:value", element: <Products /> },
  { path: "/products/category/:category/:title", element: <Products /> },
  { path: "/products/order/:ordering", element: <Products /> },
  { path: "/products-info/:name", element: <SingleProduct /> },
  { path: "/:id", element: <Article /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/درج-شکایت", element: <Complaint /> },
  { path: "/contact-us", element: <ContactUs /> },
  { path: "/about-us", element: <AboutUs /> },
  { path: "/terms", element: <Terms /> },
  { path: "/privacy-policy", element: <Privacy /> },
  { path: "/post-tracking", element: <Tracking /> },
  { path: "*", element: <NotFound /> },
  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <UserPanelOrders /> },
      { path: "address", element: <Address /> },
      { path: "account-details", element: <AccountDetails /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
];

export default routes;
