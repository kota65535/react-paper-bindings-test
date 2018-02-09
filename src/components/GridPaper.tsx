import * as React from 'react'

import {Layer, Line, Path, Raster, Tool, View} from 'react-paper-bindings'
import {Point} from 'paper';
import * as _ from "lodash";
import {connect} from "react-redux";

export interface GridPaperProps {
  width: number
  height: number
  gridSize: number
  matrix: any
}


export class GridPaper extends React.Component<GridPaperProps, {}> {

  view: View|any

  constructor(props: GridPaperProps) {
    super(props)
  }


  render() {
    // 縦のグリッドを生成
    let verticalLines = _.range(this.props.width / this.props.gridSize).map(i => {
      return (
        <Line
          from={new Point(this.props.gridSize * i, 0)}
          to={new Point(this.props.gridSize * i, this.props.height)}
          strokeColor={'red'}
        />)
    })
    // 横のグリッドを生成
    let horizontalLines = _.range(this.props.height / this.props.gridSize).map(i => {
      return (
        <Line
          from={new Point(0, this.props.gridSize * i)}
          to={new Point(this.props.width,this.props.gridSize * i)}
          strokeColor={'red'}
        />)
    })

    return (
        <View width={this.props.width}
              height={this.props.height}
              matrix={this.props.matrix}
              ref={(view) => this.view = view}
        >
          <Layer>
            {verticalLines}
            {horizontalLines}
          </Layer>
          {this.props.children}
        </View>
    )
  }
}
