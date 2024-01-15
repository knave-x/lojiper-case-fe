import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { UserProvider } from "./context/user.context";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.page";
import Signup from "./pages/Signup.page";
import PrivateRoute from "./pages/PrivateRoute.page";
import HomePage from "./pages/HomePage";
import InquiryPage from "./pages/InquiryPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <>
      <UserProvider>
        {/* <Home /> */}

        <Routes>
          {/* <Route path="/" element={<HomeTable />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
          </Route>
          <Route path="/trip-details/:id" element={<TripDetailsPage />} />
          <Route path="payments" element={<PaymentPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
