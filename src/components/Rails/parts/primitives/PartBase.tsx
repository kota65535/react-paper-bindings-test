import * as React from "react";
import {Path, Point} from "paper";
import Item = paper.Item;

export enum Pivot {
  CENTER = 'Center',
  LEFT = 'Left',
  TOP = 'Top',
  RIGHT = 'Right',
  BOTTOM = 'Bottom',
}

export interface PartBaseProps extends Partial<PartBaseDefaultProps> {
  position?: Point
  angle?: number
  pivot?: Pivot
  fillColor?: string
  visible?: boolean
  opacity?: number
  selected?: boolean
  name?: string
  data?: object
  onFrame?: any
  onMouseDown?: any
  onMouseDrag?: any
  onMouseUp?: any
  onClick?: any
  onDoubleClick?: any
  onMouseMove?: any
  onMouseEnter?: any
  onMouseLeave?: any
}

export interface PartBaseDefaultProps {
  position?: Point
  angle?: number
  pivot?: Pivot
  fillColor?: string
  visible?: boolean
  opacity?: number
  selected?: boolean
}


export default class PartBase<P extends PartBaseProps, S> extends React.Component<P, S> {
  public static defaultProps: PartBaseDefaultProps = {
    position: new Point(0, 0),
    angle: 0,
    pivot: Pivot.CENTER,
    fillColor: 'black',
    visible: true,
    opacity: 1,
    selected: false,
  }

  _path: Path
  _angle: number

  constructor (props: P) {
    super(props)
    this._angle = this.props.angle
  }

  // ========== Public APIs ==========

  get path() {
    return this._path
  }

  get position() {
    return this._path.position
  }

  get angle() {
    return this._angle
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.position.x === nextProps.position.x && this.props.position.y === nextProps.position.y) {
      return false
    }
    if (this.props.angle === nextProps.angle) {
      return false
    }
    return true
  }

  moveRelatively(difference: Point) {
    this._path.position = this._path.position.add(difference);
  }

  move(position: Point, pivot: Point = this.position): void {
    let difference = position.subtract(pivot);
    this.moveRelatively(difference);
  }

  rotateRelatively(difference: number, pivot: Point = this.position) {
    this._angle += difference
    this.path.rotate(difference, pivot);
  }

  rotate(angle: number, pivot: Point = this.position) {
    let relAngle = angle - this.angle
    this.rotateRelatively(relAngle, pivot);
  }
}

