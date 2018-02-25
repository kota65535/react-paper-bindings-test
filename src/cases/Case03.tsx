import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point} from "paper";
import {View} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";

export default class Case03 extends React.Component<any, any> {

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

    let paths = [
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.LEFT}
        angle={30}
        width={100}
        height={100}
        fillColor={'red'}
      />,
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.TOP}
        angle={30}
        width={100}
        height={100}
        opacity={0.5}
        fillColor={'green'}
      />,
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.RIGHT}
        angle={30}
        width={100}
        height={100}
        opacity={0.5}
        fillColor={'blue'}
      />,
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.BOTTOM}
        angle={30}
        width={100}
        height={100}
        opacity={0.5}
        fillColor={'yellow'}
      />
    ]

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

        <PartGroup
          pivot={Pivot.LEFT}
          pivotPartIndex={0}
          position={new Point(200,200)}
          angle={30}
        >
          {paths}
        </PartGroup>

        <PartGroup
          pivot={Pivot.LEFT}
          pivotPartIndex={1}
          position={new Point(400,200)}
          angle={30}
        >
          {paths}
        </PartGroup>

        <PartGroup
          pivot={Pivot.LEFT}
          pivotPartIndex={2}
          position={new Point(200,400)}
          angle={30}
        >
          {paths}
        </PartGroup>

        <PartGroup
          pivot={Pivot.LEFT}
          pivotPartIndex={3}
          position={new Point(400,400)}
          angle={30}
        >
          {paths}
        </PartGroup>
      </View>
    )
  }
}
