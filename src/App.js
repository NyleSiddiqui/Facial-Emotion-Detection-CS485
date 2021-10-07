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

library.add(fas);

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
        <Route exact path="/">
            <UploadPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/create">
            <CreateAccount />
          </Route>
          <Route exact path="/results">
            <PastResults />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
