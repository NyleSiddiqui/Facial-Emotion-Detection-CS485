import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount"
import PastResults from "./pages/PastResults"
import Layout from "./components/Layout/Layout"

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/create">
              <CreateAccount />
            </Route>
            <Route exact path="/results">
              <PastResults />
            </Route>
            <Route exact path="/layout">
              <Layout />
            </Route>
          </Switch>
      </Router>
    </Layout>
  );
}

export default App;
