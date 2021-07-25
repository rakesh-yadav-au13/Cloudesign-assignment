import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import TaskDetails from "./components/TaskDetails";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={TaskDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
