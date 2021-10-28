import React from "react";
import {Route} from "react-router-dom";
import Hoc from "./hoc/hoc";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Luckydraw from "./pages/LuckyDraw";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home}/>
    <Route exact path="/results" component={Results}/>
    <Route exact path="/luckydraw" component={Luckydraw} check={true}/>
  </Hoc>
);

export default BaseRouter;


