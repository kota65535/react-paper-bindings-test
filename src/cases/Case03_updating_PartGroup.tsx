import * as React from "react";
import RectPart from "components/Rails/RailParts/Parts/RectPart";
import {Point, Path} from "paper";
import {View, Tool} from "react-paper-bindings";
import {createGridLines} from "./common";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import PartGroup from "components/Rails/RailParts/Parts/PartGroup";


export default class Case03 extends React.Component<any, any> {

  g: any

  constructor(props) {
    super(props)

    this.state = {
      pivot: 0,
      position: new Point(200,200),
      child_position: new Point(300,200)
    }
    this.g = null
  }

  componentDidMount() {
    this.setState({
      position: new Point(200,400),
      child_position:  new Point(400,200)
    })
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

        /* グループとパーツの位置を更新するテスト
        本来はパーツの位置が変わるとBoudingBoxの中心も変更されるので

         */
        <PartGroup
          position={new Point(200, 300)}
          onFixed={(g) => {
            console.log(g.children[0].getPivotPositionForGlobal(Pivot.LEFT))
            console.log(g.children[0].getPivotPositionForGlobal(Pivot.RIGHT))
            this.g = g
            this.setState({
              pivot: 1
            })
          }}
        >
          <RectPart
            position={new Point(200, 200)}
            width={100}
            height={100}
            opacity={0.5}
            fillColor={'red'}
          />
          <RectPart
            position={this.state.child_position}
            width={100}
            height={100}
            opacity={0.5}
            fillColor={'green'}
          />
        </PartGroup>

        {/*<PartGroup*/}
          {/*position={this.state.position}*/}
          {/*onFixed={(g) => {*/}
            {/*console.log(g.children[0].getPivotPositionForGlobal(Pivot.LEFT))*/}
            {/*console.log(g.children[0].getPivotPositionForGlobal(Pivot.RIGHT))*/}
            {/*this.g = g*/}
            {/*this.setState({*/}
              {/*pivot: 1*/}
            {/*})*/}
          {/*}}*/}
        {/*>*/}
          {/*<RectPart*/}
            {/*position={new Point(500, 200)}*/}
            {/*width={100}*/}
            {/*height={100}*/}
            {/*opacity={0.5}*/}
            {/*fillColor={'red'}*/}
          {/*/>*/}
          {/*<RectPart*/}
            {/*position={this.state.child_position}*/}
            {/*width={100}*/}
            {/*height={100}*/}
            {/*opacity={0.5}*/}
            {/*fillColor={'green'}*/}
          {/*/>*/}
        {/*</PartGroup>*/}

        {/*<PartGroup*/}
        {/*position={new Point(100, 100)}*/}
        {/*>*/}
        {/*</PartGroup>*/}

        {/*<PartGroup*/}
        {/*position={this.state.position}*/}
        {/*onFixed={(g) => {*/}
        {/*this.g = g*/}
        {/*this.setState({*/}
        {/*position: new Point(400,100)*/}
        {/*})*/}
        {/*}}*/}
        {/*>*/}
        {/*<PartGroup*/}
        {/*position={new Point(200, 300)}*/}
        {/*// pivotPartIndex={this.state.pivot}*/}
        {/*onFixed={(g) => {*/}
        {/*console.log(g.children[0].getPivotPositionForGlobal(Pivot.LEFT))*/}
        {/*console.log(g.children[0].getPivotPositionForGlobal(Pivot.RIGHT))*/}
        {/*this.g = g*/}
        {/*this.setState({*/}
        {/*pivot: 1*/}
        {/*})*/}
        {/*}}*/}
        {/*>*/}
        {/*<RectPart*/}
        {/*position={new Point(200, 200)}*/}
        {/*width={100}*/}
        {/*height={100}*/}
        {/*opacity={0.5}*/}
        {/*fillColor={'red'}*/}
        {/*/>*/}
        {/*<RectPart*/}
        {/*position={new Point(300, 200)}*/}
        {/*width={100}*/}
        {/*height={100}*/}
        {/*opacity={0.5}*/}
        {/*fillColor={'green'}*/}
        {/*/>*/}
        {/*</PartGroup>*/}
        {/*<RectPart*/}
        {/*position={new Point(350,300)}*/}
        {/*width={100}*/}
        {/*height={100}*/}
        {/*opacity={0.5}*/}
        {/*fillColor={'blue'}*/}
        {/*/>*/}
        {/*</PartGroup>*/}

        {/*<PartGroup*/}
        {/*pivot={Pivot.LEFT}*/}
        {/*pivotPartIndex={0}*/}
        {/*position={new Point(200,200)}*/}
        {/*angle={30}*/}
        {/*>*/}
        {/*{paths}*/}
        {/*</PartGroup>*/}

        {/*<PartGroup*/}
        {/*pivot={Pivot.LEFT}*/}
        {/*pivotPartIndex={1}*/}
        {/*position={new Point(400,200)}*/}
        {/*angle={30}*/}
        {/*>*/}
        {/*{paths}*/}
        {/*</PartGroup>*/}

        {/*<PartGroup*/}
        {/*pivot={Pivot.LEFT}*/}
        {/*pivotPartIndex={2}*/}
        {/*position={new Point(200,400)}*/}
        {/*angle={30}*/}
        {/*>*/}
        {/*{paths}*/}
        {/*</PartGroup>*/}

        {/*<PartGroup*/}
        {/*pivot={Pivot.LEFT}*/}
        {/*pivotPartIndex={3}*/}
        {/*position={new Point(400,400)}*/}
        {/*angle={30}*/}
        {/*>*/}
        {/*{paths}*/}
        {/*</PartGroup>*/}

        <Tool
          active={true}
          onMouseDown={(e) => {
            this.forceUpdate()
          }}
        />
      </View>
    )
  }
}
