import * as React from "react";
import {Point} from "paper";
import {View} from "react-paper-bindings";
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

export default class Case05 extends React.Component<any, any> {

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

        <DoubleStraightRailPart
          pivotJointIndex={0}
          angle={30}
          position={new Point(100,200)}
          length={200}
          onFixed={() => console.log("FIXED!")}
        />

        <DoubleStraightRailPart
          pivotJointIndex={1}
          angle={30}
          position={new Point(200,200)}
          length={200}
          onFixed={() => console.log("FIXED!")}
        />

        <DoubleCrossTurnoutRailPart
          pivotJointIndex={0}
          angle={30}
          position={new Point(100,400)}
          length={200}
          onFixed={() => console.log("FIXED!")}
        />

        <DoubleCrossTurnoutRailPart
          pivotJointIndex={1}
          angle={30}
          position={new Point(200,400)}
          length={200}
          onFixed={() => console.log("FIXED!")}
        />

      </View>
    )
  }
}
