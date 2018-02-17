import * as React from 'react';
import './App.css';
import { GridPaper } from 'components/GridPaper';
import RectPart from "components/Rails/parts/primitives/RectPart";
import {Point} from 'paper';
import {Tool} from "react-paper-bindings"
import CirclePart from 'components/Rails/parts/primitives/CirclePart';
import {Pivot} from 'components/Rails/parts/primitives/PartBase';
import ArcPart, {ArcDirection} from "components/Rails/parts/primitives/ArcPart";
import TrianglePart from 'components/Rails/parts/primitives/TrianglePart';
import DetectablePart from 'components/Rails/parts/primitives/DetectablePart';
import Joint from "components/Rails/parts/Joint";
import StraightRailPart from "components/Rails/parts/StraightRailPart";
// import StraightRail from "components/Rails/StraightRail";
import CurveRailPart from 'components/Rails/parts/CurveRailPart';
// import CurveRail from "components/Rails/CurveRail";

const logo = require('./logo.svg');

interface AppState {
  mousePosition: Point
}


class App extends React.Component<{}, AppState> {

  r: any
  rect: any

  constructor(props) {
    super(props)
    this.state = {
      mousePosition: new Point(0, 0)
    }
  }

  componentDidUpdate() {
    // if (this.r.startAngle !== 90) {
    //   this.r.rotate(90, new Point(100,100))
    //   // this.rect.rotate(45, new Point(0,0))
    // }
  }


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
            // position={this.state.mousePosition}
            pivot={Pivot.LEFT}
            angle={0}
            width={100}
            height={100}
            // pivot={Pivot.BOTTOM}
            // onFrame={(e) => console.log('onFrame')}
            onMouseDown={(e) => console.log('onMouseDown')}
            onMouseDrag={(e) => console.log('onMouseDrag')}
            onMouseUp={(e) => console.log('onMouseUp')}
            onClick={(e) => console.log('onClick')}
            onDoubleClick={(e) => console.log('onDoubleClick')}
            onMouseMove={(e) => console.log('onMouseMove')}
            onMouseEnter={(e) => console.log('onMouseEnter')}
            onMouseLeave={(e) => console.log('onMouseLeave')}
            name={'chinko'}
            ref={(r) => this.rect = r}
          />
          {/*<CirclePart*/}
            {/*position={new Point(200,100)}*/}
            {/*angle={0}*/}
            {/*radius={50}*/}
          {/*/>*/}
          <ArcPart
            position={new Point(500,100)}
            angle={0}
            width={10}
            direction={ArcDirection.LEFT}
            radius={50}
            centerAngle={90}
            pivot={Pivot.LEFT}
          />
          {/*<TrianglePart*/}
            {/*position={new Point(400,100)}*/}
            {/*angle={0}*/}
            {/*width={100}*/}
            {/*height={100}*/}
            {/*pivot={Pivot.BOTTOM}*/}
          {/*/>*/}
          <DetectablePart
            mainPart={
              <RectPart
                position={new Point(200,300)}
                width={50}
                height={50}
              />
            }
            detectionPart={
              <RectPart
                position={new Point(200,300)}
                width={70}
                height={70}
                opacity={0.5}
              />
            }
            fillColors={['black', 'orange', 'blue', 'grey']}
            onClick={(e) => console.log('Clicked')}
            detectionEnabled={true}
          />
          {/*<Joint*/}
            {/*position={new Point(400,300)}*/}
          {/*/>*/}
          <StraightRailPart
            pivot={Pivot.LEFT}
            angle={0}
            position={new Point(200,200)}
            length={200}
            ref={(r) => this.r = r}
          />

          {/*<StraightRailPart*/}
            {/*pivot={Pivot.CENTER}*/}
            {/*angle={90}*/}
            {/*position={new Point(300,200)}*/}
            {/*length={200}*/}
          {/*/>*/}
          {/*<CurveRailPart*/}
            {/*position={new Point(500, 400)}*/}
            {/*direction={ArcDirection.RIGHT}*/}
            {/*angle={45}*/}
            {/*radius={100}*/}
            {/*centerAngle={45}*/}
          {/*/>*/}
          {/*<CurveRailPart*/}
            {/*position={new Point(500, 400)}*/}
            {/*direction={ArcDirection.LEFT}*/}
            {/*angle={45}*/}
            {/*radius={100}*/}
            {/*centerAngle={45}*/}
          {/*/>*/}
          {/*<CurveRail position={this.state.mousePosition} angle={45} radius={100} centerAngle={45} id={2}/>*/}

          <Tool
            active={true}
            onMouseMove={(e) => {
              this.setState({
                mousePosition: e.point
              })
              console.log(`position: ${e.point}`)
            }}
          />
        </GridPaper>
      </div>
    );
  }
}

export default App;
