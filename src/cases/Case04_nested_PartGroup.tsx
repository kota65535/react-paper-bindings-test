import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point} from "paper";
import {View, Tool} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";
import CirclePart from "../components/Rails/RailParts/Parts/CirclePart";
import ArcPart, {ArcDirection} from "../components/Rails/RailParts/Parts/ArcPart";

export default class Case04 extends React.Component<any, any> {

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
      <CirclePart
        position={new Point(150, 200)}
        radius={50}
        name={'c1'}
      />,
      <PartGroup
        // pivot={Pivot.LEFT}
        position={new Point(200, 200)}
        pivotPartIndex={0}
        name={'G1'}
      >
        <RectPart
          position={new Point(100, 0)}
          width={100}
          height={100}
          name={'c1'}
        />
        <RectPart
          position={new Point(200, 0)}
          width={100}
          height={100}
          name={'c2'}
        />
      </PartGroup>,
      <CirclePart
        position={new Point(350, 200)}
        radius={50}
        name={'c1'}
      />,
      <ArcPart
        position={new Point(400, 200)}
        pivot={Pivot.LEFT}
        angle={30}
        direction={ArcDirection.RIGHT}
        width={10}
        radius={50}
        centerAngle={45}
        fillColor='blue'
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


        /* BoudingBox全体がPivotの対象となる */
        <PartGroup
          pivot={Pivot.LEFT}
          position={new Point(100,200)}
          angle={-30}
          name={'G2'}
          fillColor='red'
        >
          {paths}
        </PartGroup>

        /* BoudingBox全体がPivotの対象となる */
        <PartGroup
          position={new Point(500,200)}
          angle={-30}
          name={'G2'}
          fillColor='blue'
        >
          {paths}
        </PartGroup>

        <PartGroup
          pivot={Pivot.TOP}
          pivotPartIndex={0}
          position={new Point(100,400)}
          angle={30}
          name={'G2'}
          fillColor='green'
        >
          {paths}
        </PartGroup>

        <PartGroup
          pivotPartIndex={2}
          position={new Point(500,500)}
          angle={30}
          name={'G2'}
          fillColor='orange'
        >
          {paths}
        </PartGroup>

        <Tool
          active={true}
          onMouseMove={(e) => {
            this.setState({
              mousePosition: e.point
            })
            console.log(`position: ${e.point}`)
          }}
        />
      </View>
    )
  }
}
