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

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      pivot: 0,
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
          pivot={Pivot.LEFT}
          pivotPartIndex={this.state.pivot}
          position={this.state.g1_position}
          name={'G2'}
          // onFixed={(g) => {
          //   console.log(`G2: ${g.children[1].getPivotPositionForGlobal(Pivot.LEFT)}`)
          //   console.log(`G2: ${g.children[1].getPivotPositionForGlobal(Pivot.RIGHT)}`)
          //   this.g2 = g
          // }}
        >
          <CirclePart
            position={new Point(150, 200)}
            radius={50}
            name={'c1'}
            opacity={0.5}
            fillColor={'blue'}
          />
          <PartGroup
            position={this.state.g2_position}
            onFixed={(g) => {
              console.log(`G1: ${g.children[0].getPivotPositionForGlobal(Pivot.LEFT)}`)
              console.log(`G1: ${g.children[0].getPivotPositionForGlobal(Pivot.RIGHT)}`)
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
                  pivot: 1
                })
                break
              case 1:
                this.setState({
                  count: this.state.count + 1,
                  pivot: 2
                })
                break
              case 2:
                this.setState({
                  count: this.state.count + 1,
                  pivot: undefined
                })
                break
            }
          }}
        />

      </View>
    )
  }
}
