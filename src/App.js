import Login from "./Login";
import Home from './Home'
import Docs from "./Docs";
import {BrowserRouter, Route, Switch} from "react-router-dom";

export default function App() {
  return (
      <BrowserRouter>
          <div className={"parent"}>
              <Switch>
                  <Route path={"/home"}>
                      <Home/>
                  </Route>
                  <Route path={"/connect"}>
                      <Login/>
                  </Route>
                  <Route path={"/docs"}>
                      <Docs/>
                  </Route>
                  <Route path={"/"}>
                      <Home/>
                  </Route>
              </Switch>
          </div>

      </BrowserRouter>


  );
}

