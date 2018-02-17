import * as React from 'react';
import './App.css';
import { GridPaper } from 'components/GridPaper';
import RectPart from "components/Rails/parts/primitives/RectPart";
import {Point, Size} from 'paper';
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
import PartGroup from 'components/Rails/parts/primitives/PartGroup';
// import CurveRail from "components/Rails/CurveRail";
import {Path, Group, Rectangle, Layer} from "react-paper-bindings";

const logo = require('./logo.svg');

interface AppState {
  mousePosition: Point
}


class App extends React.Component<{}, AppState> {

  r: any
  rect: any
  angle: number
  position: Point

  constructor(props) {
    super(props)
    this.state = {
      mousePosition: new Point(0, 0)
    }

    this.angle = 45
    this.position = new Point(200, 300)
  }

  componentDidMount() {
    // if (this.r.startAngle !== 90) {
    //   this.r.rotate(90, new Point(100,100))
    //   // this.rect.rotate(45, new Point(0,0))
    // }

    // console.log(this.rect.position)
    // this.rect.rotate(45)
  }

  componentDidUpdate() {
    // if (this.r.startAngle !== 90) {
    //   this.r.rotate(90, new Point(100,100))
    //   // this.rect.rotate(45, new Point(0,0))
    // }

    // console.log(this.rect.position)
    // this.rect.rotate(45)
    // this.r.rotate(45)
    // this.rect.rotate(45)
    // this.angle = 60
    // this.position = new Point(400, 200)
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
          {/*<PartGroup*/}
            {/*position={new Point(100, 200)}*/}
            {/*angle={30}*/}
          {/*>*/}
            {/*<RectPart*/}
              {/*position={new Point(200, 400)}*/}
              {/*fillColor={'green'}*/}
              {/*opacity={0.8}*/}
              {/*width={100}*/}
              {/*height={100}*/}
            {/*/>*/}
            {/*<RectPart*/}
              {/*position={new Point(200, 200)}*/}
              {/*fillColor={'green'}*/}
              {/*opacity={0.8}*/}
              {/*width={100}*/}
              {/*height={100}*/}
              {/*pivot={Pivot.TOP}*/}
            {/*/>*/}
            {/*<Rectangle*/}
              {/*center={[200, 400]}*/}
              {/*fillColor={'#222222'}*/}
              {/*opacity={0.8}*/}
              {/*size={[100,100]}*/}
            {/*/>*/}
            {/*<Rectangle*/}
              {/*center={[200, 200]}*/}
              {/*fillColor={'#222222'}*/}
              {/*opacity={0.8}*/}
              {/*size={[100, 100]}*/}
            {/*/>*/}
          {/*</PartGroup>*/}
          {/*<RectPart*/}
            {/*position={new Point(100, 100)}*/}
            {/*fillColor={'green'}*/}
            {/*opacity={0.8}*/}
            {/*width={100}*/}
            {/*height={100}*/}
          {/*/>*/}

          {/*<RectPart*/}
            {/*position={new Point(200, 400)}*/}
            {/*fillColor={'green'}*/}
            {/*opacity={0.8}*/}
            {/*width={100}*/}
            {/*height={100}*/}
          {/*/>*/}
          {/*<RectPart*/}
            {/*position={new Point(200, 200)}*/}
            {/*fillColor={'green'}*/}
            {/*opacity={0.8}*/}
            {/*width={100}*/}
            {/*height={100}*/}
          {/*/>*/}





          {/*<Group*/}
            {/*position={new Point(200, 200)}*/}
            {/*rotation={15}*/}
          {/*>*/}
            {/*<Rectangle*/}
              {/*center={new Point(300, 400)}*/}
              {/*fillColor={'#222222'}*/}
              {/*opacity={0.8}*/}
              {/*// size={[100,100]}*/}
              {/*size={new Size(100,100)}*/}
            {/*/>*/}
            {/*<Rectangle*/}
              {/*center={new Point(300, 500)}*/}
              {/*fillColor={'#222222'}*/}
              {/*opacity={0.8}*/}
              {/*// size={[100, 100]}*/}
              {/*size={new Size(100,100)}*/}
            {/*/>*/}
          {/*</Group>*/}
          {/*<RectPart*/}
            {/*position={new Point(400,200)}*/}
            {/*pivot={Pivot.LEFT}*/}
            {/*angle={30}*/}
            {/*width={100}*/}
            {/*height={100}*/}
          {/*/>*/}

          <PartGroup
            fillColor={'green'}
            position={this.position}
            angle={this.angle}
            pivot={Pivot.TOP}
            pivotPartIndex={0}
            ref={(p) => this.rect = p}
          >
            <RectPart
              position={new Point(200,300)}
              pivot={Pivot.LEFT}
              // angle={0}
              width={100}
              height={100}
            />
            <RectPart
              position={new Point(400,300)}
              pivot={Pivot.LEFT}
              // angle={0}
              width={100}
              height={100}
            />
            {/*<Path*/}
              {/*position={new Point(300,100)}*/}
              {/*pathData={createRectPath(100, 100)}*/}
              {/*fillColor={'blue'}*/}
            {/*/>*/}
            {/*<Path*/}
              {/*position={new Point(500,100)}*/}
              {/*pathData={createRectPath(100, 100)}*/}
              {/*fillColor={'blue'}*/}
            {/*/>*/}
          </PartGroup>


          {/*<PartGroup*/}
            {/*position={new Point(400, 200)}*/}
            {/*angle={0}*/}
            {/*ref={(p) => this.rect = p}*/}
          {/*>*/}
          {/*</PartGroup>*/}
          <CirclePart
            position={new Point(200,100)}
            pivot={Pivot.RIGHT}
            angle={0}
            radius={50}
            opacity={0.7}
          />
          <ArcPart
            position={new Point(500,100)}
            angle={45}
            width={10}
            direction={ArcDirection.RIGHT}
            radius={50}
            centerAngle={45}
            pivot={Pivot.LEFT}
          />
          <TrianglePart
            position={new Point(400,100)}
            angle={30}
            width={100}
            height={100}
            pivot={Pivot.TOP}
          />

          <DetectablePart
            mainPart={
              <RectPart
                position={new Point(0,0)}
                width={50}
                height={50}
              />
            }
            detectionPart={
              <RectPart
                position={new Point(0,0)}
                width={70}
                height={70}
                opacity={0.5}
              />
            }
            position={new Point(100, 100)}
            angle={30}
            pivot={Pivot.TOP}
            pivotPartIndex={0}
            fillColors={['black', 'orange', 'blue', 'grey']}
            onClick={(e) => console.log('Clicked')}
            detectionEnabled={true}
          />
          <Joint
            position={new Point(400,300)}
          />
          {/*<StraightRailPart*/}
            {/*pivot={Pivot.LEFT}*/}
            {/*angle={0}*/}
            {/*position={new Point(200,200)}*/}
            {/*length={200}*/}
            {/*ref={(r) => this.r = r}*/}
          {/*/>*/}

          {/*<StraightRailPart*/}
            {/*pivot={Pivot.LEFT}*/}
            {/*angle={90}*/}
            {/*position={new Point(300,200)}*/}
            {/*length={200}*/}
          {/*/>*/}
          <CurveRailPart
            pivot={Pivot.RIGHT}
            position={new Point(500, 400)}
            direction={ArcDirection.RIGHT}
            angle={0}
            radius={100}
            centerAngle={45}
          />
          {/*<CurveRailPart*/}
            {/*position={new Point(500, 400)}*/}
            {/*direction={ArcDirection.LEFT}*/}
            {/*angle={45}*/}
            {/*radius={100}*/}
            {/*centerAngle={45}*/}
          {/*/>*/}
          {/*<CurveRail position={this.state.mousePosition} angle={45} radius={100} centerAngle={45} id={2}/>*/}

          {/*<Tool*/}
            {/*active={true}*/}
            {/*onMouseMove={(e) => {*/}
              {/*this.setState({*/}
                {/*mousePosition: e.point*/}
              {/*})*/}
              {/*console.log(`position: ${e.point}`)*/}
            {/*}}*/}
          {/*/>*/}
        </GridPaper>
      </div>
    );
  }
}

export default App;
