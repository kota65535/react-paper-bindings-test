import * as React from 'react';
import './App.css';
import { GridPaper } from 'components/GridPaper';
import RectPart from "components/Rail/parts/primitives/RectPart";
import {Point} from 'paper';
import CirclePart from 'components/Rail/parts/primitives/CirclePart';
import {Pivot} from 'components/Rail/parts/primitives/PartBase';
import ArcPart from "components/Rail/parts/primitives/ArcPart";
import TrianglePart from 'components/Rail/parts/primitives/TrianglePart';
import DetectablePart from 'components/Rail/parts/primitives/DetectablePart';
import Joint from "components/Rail/parts/Joint";
import StraightRailPart from "components/Rail/parts/StraightRailPart";
import StraightRail from "components/Rail/StraightRail";
import CurveRailPart from 'components/Rail/parts/CurveRailPart';
import CurveRail from "components/Rail/CurveRail";

const logo = require('./logo.svg');

class App extends React.Component {
  render() {

    const matrix = {
      sx: 0, // scale center x
      sy: 0, // scale center y
      tx: 0, // translate x
      ty: 0, // translate y
      x: 0,
      y: 0,
      zoom: 1
    };


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <GridPaper
          width={800}
          height={600}
          gridSize={50}
          matrix={matrix}
        >
          <RectPart
            position={new Point(100,100)}
            angle={0}
            width={100}
            height={100}
            pivot={Pivot.BOTTOM}
            // onFrame={(e) => console.log('onFrame')}
            onMouseDown={(e) => console.log('onMouseDown')}
            onMouseDrag={(e) => console.log('onMouseDrag')}
            onMouseUp={(e) => console.log('onMouseUp')}
            onClick={(e) => console.log('onClick')}
            onDoubleClick={(e) => console.log('onDoubleClick')}
            onMouseMove={(e) => console.log('onMouseMove')}
            onMouseEnter={(e) => console.log('onMouseEnter')}
            onMouseLeave={(e) => console.log('onMouseLeave')}
          />
          <CirclePart
            position={new Point(200,100)}
            angle={0}
            radius={50}
          />
          <ArcPart
            position={new Point(300,100)}
            angle={45}
            width={10}
            radius={50}
            centerAngle={45}
            pivot={Pivot.LEFT}
          />
          <TrianglePart
            position={new Point(400,100)}
            angle={0}
            width={100}
            height={100}
            pivot={Pivot.BOTTOM}
          />
          <DetectablePart
            mainPart={
              <CirclePart
                position={new Point(200,300)}
                angle={0}
                radius={50}
              />
            }
            detectionPart={
              <CirclePart
                position={new Point(200,300)}
                angle={0}
                radius={100}
                opacity={0.5}
              />
            }
            fillColors={['black', 'orange', 'blue', 'grey']}
            onClick={(e) => console.log('Clicked')}
            detectionEnabled={true}
          />
          <Joint
            position={new Point(400,300)}
            detectionEnabled={true}
          />
          <StraightRailPart
            position={new Point(500,100)}
            length={200}/>
          <StraightRail position={new Point(100, 500)} angle={0} length={200} id={1}/>
          <CurveRailPart position={new Point(500, 400)}radius={100} centerAngle={90}/>
          <CurveRail position={new Point(500, 300)} angle={45} radius={100} centerAngle={45} id={2}/>
        </GridPaper>
      </div>
    );
  }
}

export default App;
