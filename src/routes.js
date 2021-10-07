import React from "react";
import {Route} from "react-router-dom";
import Hoc from "./hoc/hoc";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import FightMonster from "./pages/FightMonster";
import Inventory from "./pages/Inventory";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={Home}/>
    <Route exact path="/marketplace" component={Marketplace}/>
    <Route exact path="/fightmonster" component={FightMonster}/>
    <Route exact path="/inventory" component={Inventory}/>
  </Hoc>
);

export default BaseRouter;


