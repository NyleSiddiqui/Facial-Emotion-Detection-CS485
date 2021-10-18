import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import PastResults from "./pages/PastResults";
import UploadPage from "./pages/UploadPage";
import Layout from "./components/Layout";
import TermsOfService from "./pages/TermsOfService";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";

library.add(fas);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/create">
          <Layout>
            <CreateAccount />
          </Layout>
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
      </Switch>
    </Router>
  );
}

export default App;
