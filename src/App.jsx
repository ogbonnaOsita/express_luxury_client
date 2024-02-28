import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./global/Navbar";
import Home from "./home";
import SingleProduct from "./singleProduct";
import Cart from "./cart";
import theme from "../theme";
import Categories from "./categories";
import Checkout from "./checkout";
import SignIn from "./logins/signIn";
import SignUp from "./logins/signUp";
import ForgotPassword from "./logins/forgotPassword";
import UserDashboard from "./user_dashboard";
import Verify from "./verify_checkout";
import PrivateRoute from "./utils/PrivateRoute";
import RegistrationSuccess from "./logins/verify";
import ConfirmAccountVerification from "./logins/verify_account";
import PasswordReset from "./logins/passwordReset";
import NotFound from "./404";

// apollo client
const client = new ApolloClient({
  uri: `${import.meta.env.VITE_APP_GRAPHQL_URL}graphql`,
  cache: new InMemoryCache(),
});

function App() {
  const token = JSON.parse(localStorage.getItem("JWT_TOKEN"));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <>
        <ApolloProvider client={client}>
          <main className="App min-h-full flex flex-col justify-between">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:slug" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              {/* <Route path="/checkout" element={<Checkout />} /> */}
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route index element={<UserDashboard />}></Route>
              </Route>
              <Route path="/checkout" element={<PrivateRoute />}>
                <Route index element={<Checkout />} />
              </Route>
              <Route path="/verify" element={<Verify />}>
                <Route path=":reference" element={<Verify />} />
              </Route>
              <Route
                path="/sign_in"
                element={token !== null ? <Navigate to="/" /> : <SignIn />}
              />
              <Route
                path="/sign_up"
                element={token !== null ? <Navigate to="/" /> : <SignUp />}
              />
              <Route
                path="/sign_up/register_success"
                element={
                  token !== null ? <Navigate to="/" /> : <RegistrationSuccess />
                }
              />
              <Route
                path="/account_verification/:verify_token"
                element={
                  token !== null ? (
                    <Navigate to="/" />
                  ) : (
                    <ConfirmAccountVerification />
                  )
                }
              />
              <Route
                path="forgot_password"
                element={
                  token !== null ? <Navigate to="/" /> : <ForgotPassword />
                }
              />
              <Route
                path="reset_password/:reset_token"
                element={
                  token !== null ? <Navigate to="/" /> : <PasswordReset />
                }
              />
              <Route path="/categories/:slug" element={<Categories />}></Route>
              <Route path="/not-found" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </ApolloProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
