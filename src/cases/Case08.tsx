import * as React from "react";
import {Point} from "paper";
import {View, Tool} from "react-paper-bindings";
import {createGridLines} from "./common";
import StraightRailPart from "components/Rails/RailParts/StraightRailPart";
import DetectablePart from "components/Rails/RailParts/Parts/DetectablePart";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import CurveRailPart from "../components/Rails/RailParts/CurveRailPart";
import {ArcDirection} from "../components/Rails/RailParts/Parts/ArcPart";
import SimpleTurnoutRailPart from "../components/Rails/RailParts/SimpleTurnoutRailPart";
import DoubleStraightRailPart from "../components/Rails/RailParts/DoubleStraightRailPart";
import DoubleCrossTurnoutRailPart from "../components/Rails/RailParts/DoubleCrossTurnoutRailPart";
import Joint from "../components/Rails/RailParts/Joint";
import {CurveRail} from "components/Rails/CurveRail";

export default class Case08 extends React.Component<any, any> {
  r: any
  p: number

  constructor(props) {
    super(props)

    this.r = null
    this.p = 0
  }

  componentDidMount() {
    this.p = 1
    this.forceUpdate()
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
      <View width={800}
            height={600}
            matrix={matrix}
            settings={{
              applyMatrix: false
            }}
      >
        {createGridLines(800, 600, 100)}


        {/*<StraightRailPart*/}
          {/*pivotJointIndex={0}*/}
          {/*angle={30}*/}
          {/*position={new Point(200,200)}*/}
          {/*length={200}*/}
          {/*ref={(r) => this.r = r}*/}
          {/*onFixed={() => this.forceUpdate()}*/}
        {/*/>*/}
        {/*<Joint*/}
          {/*position={this.r ? this.r.getJointPosition(0) : new Point(0, 0)}*/}
          {/*angle={this.r ? this.r.getJointAngle(0) : 0}*/}
          {/*onFixed={() => console.log('j1 fixed')}*/}
        {/*/>*/}
        {/*<Joint*/}
          {/*position={this.r ? this.r.getJointPosition(1) : new Point(0, 0)}*/}
          {/*angle={this.r ? this.r.getJointAngle(1) : 0}*/}
          {/*onFixed={() => console.log('j2 fixed')}*/}
        {/*/>*/}

        <CurveRail
          position={new Point(200,200)}
          pivotJointIndex={this.p}
          angle={30}
          radius={200}
          centerAngle={45}
          id={0}
          layerId={1}
        />


        <Tool
          active={true}
          onMouseMove={(e) => {
            this.setState({
              mousePosition: e.point
            })
            // console.log(`position: ${e.point}`)
          }}
        />
      </View>
    )
  }
}
