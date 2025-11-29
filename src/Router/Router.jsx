import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layout/HomeLayout";
import Home from "../Pages/Home/Home";
import Services from "../Pages/Services/Services";
import Coverage from "../Pages/Coverage/Coverage";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Pricing from "../Pages/Pricing/Pricing";
import BeARide from "../Pages/BeARide/BeARide";
import Loader from "../Components/Loader/Loader";
import AuthLayOut from "../Layout/AuthLayOut";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoard from "../Layout/DashBoard";
import MyParcel from "../Pages/Dashboard/MyParcel";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import RiderRequest from "../Pages/Dashboard/RiderRequest/RiderRequest";
import Users from "../Pages/Dashboard/Users/Users";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/send-parcel",
        element: (
          <PrivetRoute>
            <SendParcel />
          </PrivetRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
      {
        path: "/be-a-ride",
        element: (
          <PrivetRoute>
            <BeARide />
          </PrivetRoute>
        ),
        loader: () => fetch("/warehouses.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashBoard,
    children: [
      {
        path: "/dashboard/users",
        Component: Users,
      },
      {
        path: "/dashboard/my-parcel",
        Component: MyParcel,
      },
      {
        path: "/dashboard/payment/:parcelId",
        Component: Payment,
      },
      {
        path: "/dashboard/payment/success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment/cancelled",
        Component: PaymentCancel,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
      {
        path: "/dashboard/riders-application",
        Component: RiderRequest,
      },
    ],
  },
]);
