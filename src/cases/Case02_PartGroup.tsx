import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point} from "paper";
import {View} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";

export default class Case02 extends React.Component<any, any> {

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
      />,
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.TOP}
        angle={30}
        width={100}
        height={100}
      />,
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.RIGHT}
        angle={30}
        width={100}
        height={100}
      />,
      <RectPart
        position={new Point(200, 200)}
        pivot={Pivot.BOTTOM}
        angle={30}
        width={100}
        height={100}
      />
    ]

    // PartGroupのposition, angle, pivot, pivotPartIndex のテスト

    return (
      <View width={800}
            height={800}
            matrix={matrix}
            settings={{
              applyMatrix: false
            }}
      >
        {createGridLines(800, 600, 100)}

        /* pivotPartIndexを指定しない場合、BoundingBox全体に対するpivot指定となる */
        <PartGroup
          pivot={Pivot.RIGHT}
          position={new Point(300,300)}
          // angle={30}
          fillColor={'red'}
        >
          {paths}
        </PartGroup>
        <PartGroup
          pivot={Pivot.LEFT}
          position={new Point(300,300)}
          angle={30}
          fillColor={'red'}
        >
          {paths}
        </PartGroup>

        /* pivotPartIndexを指定した場合、指定のIndexのパーツに対するpivot指定となる */
        <PartGroup
          pivotPartIndex={0}
          pivot={Pivot.RIGHT}
          position={new Point(300,600)}
          angle={30}
          fillColor={'red'}
        >
          {paths}
        </PartGroup>

        <PartGroup
          pivotPartIndex={2}
          pivot={Pivot.LEFT}
          position={new Point(400,600)}
          angle={30}
          fillColor={'red'}
        >
          {paths}
        </PartGroup>

      </View>
    )
  }
}
