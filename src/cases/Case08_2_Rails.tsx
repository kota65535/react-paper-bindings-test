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
import {StraightRail} from "../components/Rails/StraightRail";
import {DoubleStraightRail} from "components/Rails/DoubleStraightRail";
import {DoubleCrossTurnout} from "components/Rails/DoubleCrossTurnout";

export default class Case08 extends React.Component<any, any> {
  r: any
  pivotJoint: number

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      pivotJoint: 0,
      position: new Point(200,200),
    }
  }

  componentDidMount() {
    // this.p = 1
    // this.forceUpdate()
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


        {/*<DoubleStraightRail*/}
          {/*position={this.state.position}*/}
          {/*pivotJointIndex={this.state.pivotJoint}*/}
          {/*length={200}*/}
          {/*angle={30}*/}
          {/*id={0}*/}
          {/*layerId={1}*/}
        {/*/>*/}

        <DoubleCrossTurnout
          position={this.state.position}
          pivotJointIndex={this.state.pivotJoint}
          length={200}
          angle={30}
          id={0}
          layerId={1}
        />

        <Tool
          active={true}
          onMouseDown={(e) => {
            switch (this.state.count) {
              case 0:
                this.setState({
                  count: this.state.count + 1,
                  pivotJoint: 1,
                })
                break
              case 1:
                this.setState({
                  count: this.state.count + 1,
                  pivotJoint: 0,
                })
                break
              case 2:
                this.setState({
                  count: this.state.count + 1,
                  pivotJoint: 1,
                  position: new Point(300, 200),
                })
                break
            }
          }}
        />
      </View>
    )
  }
}
