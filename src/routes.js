import React from "react";
import {Route} from "react-router-dom";
import Hoc from "./hoc/hoc";
import Home from "./pages/Home";
import Luckydraw from "./pages/LuckyDraw";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home}/>
    <Route exact path="/luckydraw" component={Luckydraw}/>
  </Hoc>
);

export default BaseRouter;


