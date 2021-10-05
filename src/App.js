import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Login from "./pages/Login";
import UploadPage from "./pages/UploadPage";

library.add(fas);

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/detect">
          <UploadPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
