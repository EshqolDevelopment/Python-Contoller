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



// REACT_APP_FIREBASE_API_KEY=AIzaSyDISmGGEwtm00nkRmDh2MhGCTU7fQCTQcI
// REACT_APP_FIREBASE_AUTH_DOMAIN=python-controller-f0c11.firebaseapp.com
// REACT_APP_FIREBASE_DATABASE_URL=https://python-controller-f0c11-default-rtdb.firebaseio.com
// REACT_APP_FIREBASE_PROJECT_ID=python-controller-f0c11
// REACT_APP_FIREBASE_STORAGE_BUCKET=python-controller-f0c11.appspot.com
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1067532213767
// REACT_APP_FIREBASE_APP_ID=1:1067532213767:web:ca48070ad0f9fa203554a2
// REACT_APP_FIREBASE_MEASUREMENT_ID=G-GT7CEZFR2B