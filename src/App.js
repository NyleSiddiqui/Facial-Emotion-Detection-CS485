import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import ForgotPass from "./pages/ForgotPass";
import PastResults from "./pages/PastResults";
import UploadPage from "./pages/UploadPage";
import Layout from "./components/Layout";
import TermsOfService from "./pages/TermsOfService";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import VerificationPage from "./pages/VerificationPage";
import { Provider } from "./context";

library.add(fas);

function App() {
  const loggedIn = false;
  const [notification, setNotification] = useState({});

  const addNotification = (message, type) => {
    setNotification({ message, type });
  };

  const removeNotification = () => {
    setNotification({});
  };

  return (
    <Router>
      <Provider value={{ notification, addNotification, removeNotification }}>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/detect" /> : <Login />}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/forgotpass">
            <ForgotPass />
          </Route>
          <Route exact path="/create">
            <CreateAccount />
          </Route>
          <Route exact path="/results">
            <Layout>
              <PastResults />
            </Layout>
          </Route>
          <Route exact path="/detect">
            <Layout>
              <UploadPage />
            </Layout>
          </Route>
          <Route exact path="/tos">
            <Layout>
              <TermsOfService />
            </Layout>
          </Route>
          <Route exact path="/profile">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          <Route exact path="/privacy_policy">
            <Layout>
              <PrivacyPolicy />
            </Layout>
          </Route>
          <Route exact path="/verification">
            <VerificationPage />
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
