import Login from "./Login";
import Home from './Home'
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
              </Switch>
          </div>

      </BrowserRouter>


  );
}

