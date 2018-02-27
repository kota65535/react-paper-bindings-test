import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point, Path} from "paper";
import {View, Tool} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";
import * as assert from "assert";
import {pointsEqual} from "../components/Rails/utils";


export default class Case03 extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      // pivot: undefined,
      pivot: Pivot.LEFT,
      pivotPart: 0,
      position: new Point(200,200),
      child_position_1: new Point(200,100),
      child_position_2: new Point(300,100)
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

    /*
      Pivot指定あり＋PivotPart指定ありのパターン
     */

    return (
      <View width={800}
            height={600}
            matrix={matrix}
            settings={{
              applyMatrix: false
            }}
      >
        {createGridLines(800, 600, 100)}

        /*
          Pivot指定あり＋PivotPart指定ありのパターン
         */

        <PartGroup
          position={this.state.position}
          pivot={this.state.pivot}
          pivotPartIndex={this.state.pivotPart}
          onFixed={(g) => {
            // 位置が確定していることを確認
            console.log(`${g.getPivotPositionForParent(this.state.pivot)}, ${this.state.position})`);
            assert(pointsEqual(g.getPivotPositionForParent(this.state.pivot), this.state.position))
          }}
        >
          <RectPart
            position={this.state.child_position_1}
            width={100}
            height={100}
            opacity={0.5}
            fillColor={'red'}
          />
          <RectPart
            position={this.state.child_position_2}
            width={100}
            height={100}
            opacity={0.5}
            fillColor={'green'}
          />
        </PartGroup>


        <Tool
          active={true}
          onMouseDown={(e) => {
            switch (this.state.count) {
              case 0:
                // PivotPartとPivotの両方を変更
                this.setState({
                  count: this.state.count + 1,
                  pivotPart: 1,
                  pivot: Pivot.RIGHT
                })
                break
              case 1:
                // TODO: PivotPartとPivotの両方を変更
                this.setState({
                  count: this.state.count + 1,
                  pivotPart: undefined
                })
                break
            }
          }}
        />
      </View>
    )
  }
}
