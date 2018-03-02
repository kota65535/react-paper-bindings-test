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

        <StraightRailPart
          pivotJointIndex={0}
          angle={30}
          position={new Point(200,200)}
          length={200}
          onFixed={() => console.log("FIXED!")}
        />
        <StraightRailPart
          pivotJointIndex={1}
          angle={-30}
          position={new Point(200,200)}
          length={200}
          onFixed={() => console.log("FIXED!")}
        />

        <CurveRailPart
          pivotJointIndex={0}
          position={new Point(400,200)}
          direction={ArcDirection.LEFT}
          angle={30}
          radius={100}
          centerAngle={45}
        />
        <CurveRailPart
          pivotJointIndex={1}
          position={new Point(400,200)}
          direction={ArcDirection.LEFT}
          angle={30}
          radius={100}
          centerAngle={45}
        />
        <CurveRailPart
          pivotJointIndex={0}
          position={new Point(600,200)}
          direction={ArcDirection.RIGHT}
          angle={30}
          radius={100}
          centerAngle={45}
        />
        <CurveRailPart
          pivotJointIndex={1}
          position={new Point(600,200)}
          direction={ArcDirection.RIGHT}
          angle={30}
          radius={100}
          centerAngle={45}
        />

        <SimpleTurnoutRailPart
          pivotJointIndex={0}
          position={new Point(200,400)}
          direction={ArcDirection.RIGHT}
          angle={30}
          length={140}
          radius={280}
          centerAngle={30}
        />
        <SimpleTurnoutRailPart
          pivotJointIndex={1}
          position={new Point(200,400)}
          direction={ArcDirection.RIGHT}
          angle={120}
          length={140}
          radius={280}
          centerAngle={30}
        />
        <SimpleTurnoutRailPart
          pivotJointIndex={2}
          position={new Point(200,400)}
          direction={ArcDirection.RIGHT}
          angle={210}
          length={140}
          radius={280}
          centerAngle={30}
        />

        <CurvedTurnoutRailPart
          pivotJointIndex={0}
          position={new Point(400,400)}
          direction={ArcDirection.RIGHT}
          angle={30}
          innerRadius={200}
          outerRadius={300}
          innerCenterAngle={45}
          outerCenterAngle={30}
        />
        <CurvedTurnoutRailPart
          pivotJointIndex={1}
          position={new Point(400,400)}
          direction={ArcDirection.RIGHT}
          angle={120}
          innerRadius={200}
          outerRadius={300}
          innerCenterAngle={45}
          outerCenterAngle={30}
        />
        <CurvedTurnoutRailPart
          pivotJointIndex={2}
          position={new Point(400,400)}
          direction={ArcDirection.RIGHT}
          angle={210}
          innerRadius={200}
          outerRadius={300}
          innerCenterAngle={45}
          outerCenterAngle={30}
        />

      </View>
    )
  }
}
