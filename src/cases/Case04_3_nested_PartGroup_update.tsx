import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point} from "paper";
import {View, Tool} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";
import CirclePart from "../components/Rails/RailParts/Parts/CirclePart";
import ArcPart, {ArcDirection} from "../components/Rails/RailParts/Parts/ArcPart";
import * as assert from "assert";
import {pointsEqual} from "../components/Rails/utils";

export default class Case04 extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      pivotPart: 0,
      g1_position: new Point(200,200),
      g2_position: new Point(250,200),
      c1_position: new Point(200,100),
      c2_position: new Point(300,100),
      c3_position: new Point(350,200),
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
      Pivot指定なし＋PivotPart指定ありのパターン
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


        <PartGroup
          pivotPartIndex={this.state.pivotPart}
          position={this.state.g1_position}
          name={'G1'}
          onFixed={(g) => {
            // 位置が確定していることを確認
            console.log(`${g.getPivotPositionForParent(undefined)}, ${this.state.g1_position})`);
            assert(pointsEqual(g.getPivotPositionForParent(undefined), this.state.g1_position))
          }}
        >
          <CirclePart
            position={new Point(150, 200)}
            radius={50}
            name={'c1'}
            opacity={0.5}
            fillColor={'blue'}
          />
          <PartGroup
            pivotPartIndex={this.state.pivotPart}
            // pivotPartIndex={0}
            position={this.state.g2_position}
            onFixed={(g) => {
              // 位置が確定していることを確認
              console.log(`${g.getPivotPositionForParent(undefined)}, ${this.state.g2_position})`);
              assert(pointsEqual(g.getPivotPositionForParent(undefined), this.state.g2_position))
            }}
          >
            <RectPart
              position={this.state.c1_position}
              width={100}
              height={100}
              opacity={0.5}
              fillColor={'red'}
            />
            <RectPart
              position={this.state.c2_position}
              width={100}
              height={100}
              opacity={0.5}
              fillColor={'green'}
            />
          </PartGroup>
          <CirclePart
            position={this.state.c3_position}
            radius={50}
            name={'c1'}
            opacity={0.5}
            fillColor={'blue'}
          />
        </PartGroup>

        <Tool
          active={true}
          onMouseDown={(e) => {
            switch (this.state.count) {
              case 0:
                // Groupの位置を変更
                this.setState({
                  count: this.state.count + 1,
                  pivotPart: 1
                })
                break
              case 1:
                this.setState({
                  count: this.state.count + 1,
                  // pivotPart: 2
                })
                break
              case 2:
                this.setState({
                  count: this.state.count + 1,
                  pivotPart: undefined
                })
                break
              case 3:
                this.setState({
                  count: this.state.count + 1,
                  pivotPart: 0
                })
                break
            }
          }}
        />

      </View>
    )
  }
}
