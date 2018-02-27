import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point} from "paper";
import {View, Tool, Circle} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import CirclePart from "../components/Rails/RailParts/Parts/CirclePart";
import ArcPart, {ArcDirection} from "../components/Rails/RailParts/Parts/ArcPart";
import TrianglePart from "../components/Rails/RailParts/Parts/TrianglePart";

/**
 * position, angle, pivot がうまく動作しているかのテスト
 */
export default class Case01 extends React.Component<any, any> {
  r

  constructor(props) {
    super(props)

    this.r = null
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

    const x = 100, y = 100, rotation = 0

    return (
      <View width={800}
            height={600}
            matrix={matrix}
            settings={{
              applyMatrix: false
            }}
      >
        {createGridLines(800, 600, 100)}

        {/*<RectPart*/}
          {/*position={new Point(200, 200)}*/}
          {/*pivot={Pivot.LEFT}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}
        {/*<RectPart*/}
          {/*position={new Point(200, 200)}*/}
          {/*pivot={Pivot.TOP}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}
        {/*<RectPart*/}
          {/*position={new Point(200, 200)}*/}
          {/*pivot={Pivot.RIGHT}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}
        {/*<RectPart*/}
          {/*position={new Point(200, 200)}*/}
          {/*pivot={Pivot.BOTTOM}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}
        {/*<RectPart*/}
          {/*position={new Point(200, 200)}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
          {/*fillColor='orange'*/}
        {/*/>*/}

        {/*<CirclePart*/}
          {/*position={new Point(400, 200)}*/}
          {/*pivot={Pivot.LEFT}*/}
          {/*angle={30}*/}
          {/*radius={50}*/}
        {/*/>*/}
        {/*<CirclePart*/}
          {/*position={new Point(400, 200)}*/}
          {/*pivot={Pivot.TOP}*/}
          {/*angle={30}*/}
          {/*radius={50}*/}
        {/*/>*/}
        {/*<CirclePart*/}
          {/*position={new Point(400, 200)}*/}
          {/*pivot={Pivot.RIGHT}*/}
          {/*angle={30}*/}
          {/*radius={50}*/}
        {/*/>*/}
        {/*<CirclePart*/}
          {/*position={new Point(400, 200)}*/}
          {/*pivot={Pivot.BOTTOM}*/}
          {/*angle={30}*/}
          {/*radius={50}*/}
        {/*/>*/}
        {/*<CirclePart*/}
          {/*position={new Point(400, 200)}*/}
          {/*angle={30}*/}
          {/*radius={50}*/}
          {/*fillColor='orange'*/}
        {/*/>*/}

        <ArcPart
          position={new Point(200, 400)}
          pivot={Pivot.LEFT}
          angle={0}
          direction={ArcDirection.LEFT}
          width={20}
          radius={317}
          centerAngle={45}
          fillColor='red'
          ref={(r) => this.r = r}
        />
        {this.r &&
        <CirclePart
          radius={5}
          position={this.r.getPivotPositionForGlobal(Pivot.RIGHT)}
        />}

        {/*<ArcPart*/}
          {/*position={new Point(200, 400)}*/}
          {/*pivot={Pivot.LEFT}*/}
          {/*angle={30}*/}
          {/*direction={ArcDirection.RIGHT}*/}
          {/*width={10}*/}
          {/*radius={50}*/}
          {/*centerAngle={45}*/}
          {/*fillColor='blue'*/}
        {/*/>*/}

        {/*<ArcPart*/}
          {/*position={new Point(200, 400)}*/}
          {/*pivot={Pivot.RIGHT}*/}
          {/*angle={30}*/}
          {/*direction={ArcDirection.LEFT}*/}
          {/*width={10}*/}
          {/*radius={50}*/}
          {/*centerAngle={45}*/}
          {/*fillColor='green'*/}
        {/*/>*/}
        {/*<ArcPart*/}
          {/*position={new Point(200, 400)}*/}
          {/*pivot={Pivot.RIGHT}*/}
          {/*angle={30}*/}
          {/*direction={ArcDirection.RIGHT}*/}
          {/*width={10}*/}
          {/*radius={50}*/}
          {/*centerAngle={45}*/}
          {/*fillColor='yellow'*/}
        {/*/>*/}

        {/*<TrianglePart*/}
          {/*position={new Point(400, 400)}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}
        {/*<TrianglePart*/}
          {/*position={new Point(400, 400)}*/}
          {/*pivot={Pivot.TOP}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}
        {/*<TrianglePart*/}
          {/*position={new Point(400, 400)}*/}
          {/*pivot={Pivot.BOTTOM}*/}
          {/*angle={30}*/}
          {/*width={100}*/}
          {/*height={100}*/}
        {/*/>*/}

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
