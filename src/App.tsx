import * as React from 'react';
import './App.css';
import { GridPaper } from 'components/GridPaper';
import RectPart from "components/parts/primitives/RectPart";
import {Point} from 'paper';
import CirclePart from 'components/parts/primitives/CirclePart';
import {Pivot} from 'components/parts/primitives/PartBase';
import ArcPart from "components/parts/primitives/ArcPart";
import TrianglePart from 'components/parts/primitives/TrianglePart';
import DetectablePart from 'components/parts/primitives/DetectablePart';

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
        </GridPaper>
      </div>
    );
  }
}

export default App;
