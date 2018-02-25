import * as React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Point, Size} from 'paper';
import {Tool} from "react-paper-bindings"
import {Path, Group, Rectangle, Layer} from "react-paper-bindings";
import Case01 from "./cases/Case01_PrimitiveParts";
import Case02 from "./cases/Case02_PartGroup";
import Case03 from "./cases/Case03";
import Case04 from "./cases/Case04_nested_PartGroup";
import Case05 from "./cases/Case05_DetectablePart";
import Case06 from './cases/Case06_RailParts';
import Case07 from './cases/Case07';
import Case08 from "./cases/Case08";

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
            <Route path="/3" component={Case03}/>
            <Route path="/4" component={Case04}/>
            <Route path="/5" component={Case05}/>
            <Route path="/6" component={Case06}/>
            <Route path="/7" component={Case07}/>
            <Route path="/8" component={Case08}/>
          </div>
        </Router>
    );
  }
}

export default App;
