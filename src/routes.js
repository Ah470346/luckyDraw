import React from "react";
import {Route} from "react-router-dom";
import Hoc from "./hoc/hoc";
import Home from "./pages/Home";
import Results from "./pages/Results";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home}/>
    <Route exact path="/results" component={Results}/>
  </Hoc>
);

export default BaseRouter;


