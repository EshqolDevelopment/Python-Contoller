import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./javascript/Home";
import Login from "./javascript/Login";
import Docs from "./javascript/Docs";
import './css/index.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);