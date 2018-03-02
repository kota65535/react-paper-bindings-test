import * as React from "react";
import {Point} from "paper";
import {View} from "react-paper-bindings";
import {createGridLines} from "./common";
import StraightRailPart from "components/Rails/RailParts/StraightRailPart";
import CurveRailPart from "../components/Rails/RailParts/CurveRailPart";
import {ArcDirection} from "../components/Rails/RailParts/Parts/ArcPart";
import SimpleTurnoutRailPart from "../components/Rails/RailParts/SimpleTurnoutRailPart";
import CurvedTurnoutRailPart from "../components/Rails/RailParts/CurvedTurnoutRailPart";

export default class Case05 extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      pivot: 0,
      position: new Point(200,200),
    }
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


    // PivotPartIndexを指定した場合、BoundingBoxではなくそのパーツに対してPivotを指定できる

    return (
      <View width={800}
            height={600}
            matrix={matrix}
            settings={{
              applyMatrix: false
            }}
      >
        {createGridLines(800, 600, 100)}

        <CurveRailPart
          pivotJointIndex={this.state.pivot}
          position={this.state.position}
          direction={ArcDirection.LEFT}
          angle={30}
          radius={100}
          centerAngle={45}
        />

      </View>
    )
  }
}
