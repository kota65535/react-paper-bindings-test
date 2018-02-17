import * as React from "react";
import {Point} from "paper";
import {Path as PathComponent} from "react-paper-bindings";
import {default as PartBase, PartBaseProps, Pivot} from "components/Rails/parts/primitives/PartBase";

export enum ArcDirection {
  RIGHT,
  LEFT
}

export interface ArcPartProps extends PartBaseProps {
  width: number
  radius: number
  centerAngle: number
  direction: ArcDirection
}


export default class ArcPart extends PartBase<ArcPartProps, {}> {

  constructor (props: ArcPartProps) {
    super(props)
  }

  // ========== Public APIs ==========

  getCenterOfLeft(): Point {
    return this._path.segments[0].point
  }

  getCenterOfRight(): Point {
    // 90度ごとに右端のセグメントのインデックスがインクリメントされているらしい
    const correction = Math.floor((Math.abs(this.props.centerAngle) + 1) / 90)
    return this._path.segments[3 + correction].point
  }

  getPivotPoint() {

  }

  // ========== Private methods ==========

  render() {
    const {width, radius, centerAngle, direction, pivot,
      position, angle, fillColor, visible, opacity, selected, name, data,
      onFrame, onMouseDown, onMouseDrag, onMouseUp, onClick, onDoubleClick, onMouseMove, onMouseEnter, onMouseLeave} = this.props

    const [pathData, pivotPoint] = createArcPath(width, radius, centerAngle, direction, pivot)

    return <PathComponent
      pathData={pathData}
      pivot={pivotPoint}
      position={position}
      rotation={angle}
      fillColor={fillColor}
      visible={visible}
      opacity={opacity}
      selected={selected}
      name={name}
      data={data}
      onFrame={onFrame}
      onMouseDown={onMouseDown}
      onMouseDrag={onMouseDrag}
      onMouseUp={onMouseUp}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={(Path) => this._path = Path}
    />
  }
}

const createArcPath = (width: number, radius: number, centerAngle: number, direction: ArcDirection, pivot: Pivot) => {
  switch (direction) {
    case ArcDirection.RIGHT:
      return createArcPathRight(width, radius, centerAngle, pivot)
    case ArcDirection.LEFT:
      return createArcPathLeft(width, radius, centerAngle, pivot)
  }
}

// 右方向に曲がる円弧のパスデータを作成する
const createArcPathRight = (width: number, radius: number, centerAngle: number, pivot: Pivot) => {
  // 曲線の始点・終点の座標を計算
  const outerEndX = (radius + width/2) * Math.sin(centerAngle / 180 * Math.PI);
  const outerEndY = (radius + width/2) * (1 - Math.cos(centerAngle / 180 * Math.PI)) - width/2;
  const innerEndX = (radius - width/2) * Math.sin(centerAngle / 180 * Math.PI);
  const innerEndY = (radius - width/2) * (1 - Math.cos(centerAngle / 180 * Math.PI)) + width/2;

  // Pivotの座標を計算
  let pivotPoint
  switch (pivot) {
    case Pivot.RIGHT:
      pivotPoint = new Point((outerEndX + innerEndX) / 2, (outerEndY + innerEndY) / 2)
      break
    case Pivot.LEFT:
      // same as default
    default:
      pivotPoint =  new Point(0, 0)
  }

  // パスデータの作成
  const pathData = `M 0 0 L 0 ${-width/2}
  A ${radius + width/2} ${radius + width/2}, 0, 0, 1, ${outerEndX} ${outerEndY}
  L ${(outerEndX + innerEndX) / 2} ${(outerEndY + innerEndY) / 2} 
  L ${innerEndX} ${innerEndY} 
  A ${radius - width/2} ${radius - width/2} 0, 0, 0, 0 ${ width/2} Z`

  console.log(pathData)
  return [pathData, pivotPoint]
}

// 左方向に曲がる円弧のパスデータを作成する
const createArcPathLeft = (width: number, radius: number, centerAngle: number, pivot: Pivot) => {
  // 曲線の始点・終点の座標を計算
  const outerEndX = (radius + width/2) * Math.sin(centerAngle / 180 * Math.PI);
  const outerEndY = - (radius + width/2) * (1 - Math.cos(centerAngle / 180 * Math.PI)) + width/2;
  const innerEndX = (radius - width/2) * Math.sin(centerAngle / 180 * Math.PI);
  const innerEndY = - (radius - width/2) * (1 - Math.cos(centerAngle / 180 * Math.PI)) - width/2;

  // Pivotの座標を計算
  let pivotPoint
  switch (pivot) {
    case Pivot.RIGHT:
      pivotPoint = new Point((outerEndX + innerEndX) / 2, (outerEndY + innerEndY) / 2)
      break
    case Pivot.LEFT:
    // same as default
    default:
      pivotPoint =  new Point(0, 0)
  }

  // パスデータの作成
  const pathData = `M 0 0 L 0 ${width/2}
  A ${radius + width/2} ${radius + width/2}, 0, 0, 0, ${outerEndX} ${outerEndY}
  L ${(outerEndX + innerEndX) / 2} ${(outerEndY + innerEndY) / 2} 
  L ${innerEndX} ${innerEndY} 
  A ${radius - width/2} ${radius - width/2} 0, 0, 1, 0 ${-width/2} Z`
  console.log(pathData)
  return [pathData, pivotPoint]

}
