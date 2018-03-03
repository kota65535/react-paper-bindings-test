import * as React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Point, Size} from 'paper';
import {Tool} from "react-paper-bindings"
import {Path, Group, Rectangle, Layer} from "react-paper-bindings";
import Case01 from "./cases/Case01_PrimitiveParts";
import Case02 from "./cases/Case02_PartGroup";
import Case03_1 from "./cases/Case03_1_PartGroup_update";
import Case03_2 from "./cases/Case03_2_PartGroup_update";
import Case03_3 from "./cases/Case03_3_PartGroup_update";
import Case03_4 from "./cases/Case03_4_PartGroup_update";
import Case04_1 from "./cases/Case04_1_nested_PartGroup_update";
import Case04_2 from "./cases/Case04_2_nested_PartGroup_update";
import Case04_3 from "./cases/Case04_3_nested_PartGroup_update";
import Case04_4 from "./cases/Case04_4_nested_PartGroup_update";
import Case05_1 from "./cases/Case05_1_DetectablePart";
import Case05_2 from "./cases/Case05_2_DetectablePart_update";
import Case06_1 from './cases/Case06_1_RailParts';
import Case06_2 from './cases/Case06_2_RailParts';
import Case07_1 from './cases/Case07_1_RailParts_update';
import Case08_1 from './cases/Case08_1_Rails';
import Case08_2 from './cases/Case08_2_Rails';

const logo = require('./logo.svg');

interface AppState {
  mousePosition: Point
}


class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props)
  }


  render() {
    return (
        <Router>
          <div>
            <Route path="/1" component={Case01}/>
            <Route path="/2" component={Case02}/>
            <Route path="/3_1" component={Case03_1}/>
            <Route path="/3_2" component={Case03_2}/>
            <Route path="/3_3" component={Case03_3}/>
            <Route path="/3_4" component={Case03_4}/>
            <Route path="/4_1" component={Case04_1}/>
            <Route path="/4_2" component={Case04_2}/>
            <Route path="/4_3" component={Case04_3}/>
            <Route path="/4_4" component={Case04_4}/>
            <Route path="/5_1" component={Case05_1}/>
            <Route path="/5_2" component={Case05_2}/>
            <Route path="/6_1" component={Case06_1}/>
            <Route path="/6_2" component={Case06_2}/>
            <Route path="/7_1" component={Case07_1}/>
            <Route path="/8_1" component={Case08_1}/>
            <Route path="/8_2" component={Case08_2}/>
          </div>
        </Router>
    );
  }
}

export default App;
