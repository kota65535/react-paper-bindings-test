import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point, Path} from "paper";
import {View, Tool} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";


export default class Case03 extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      pivot: 0,
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
          GroupのPivot指定なし=BoundingBoxの中心がPivotとなるテストパターン
          子の位置が変更された場合、Pivotも追従して変更される
         */

        <PartGroup
          position={this.state.position}
          onFixed={(g) => {
            console.log(g.children[0].getPivotPositionForGlobal(Pivot.LEFT))
            console.log(g.children[0].getPivotPositionForGlobal(Pivot.RIGHT))
            // this.setState({
            //   pivot: 1
            // })
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
                // Groupの位置を変更
                this.setState({
                  count: this.state.count + 1,
                  position: new Point(300, 200),
                })
                break
              case 1:
                // 子の位置とGroupの位置を変更
                // 本当はGroupのBoundsが変化するはずなのだが、何故かcomponentDidUpdate が呼ばれた時点で変わっていない・・・。
                // TODO: 調査する
                this.setState({
                  count: this.state.count + 1,
                  position: new Point(300,300),
                  child_position_2: new Point(500,100)
                })
                break
            }
          }}
        />
      </View>
    )
  }
}
