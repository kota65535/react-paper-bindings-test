import * as React from "react";
import {Path, Point} from "paper";

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
  data?: any
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


export default abstract class PartBase<P extends PartBaseProps, S> extends React.Component<P, S> {
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
  // PaperJSのPathはデフォルトの挙動ではグローバルなrotationを保持しない
  // そのためこのような形で保存しておく必要がある
  _angle: number

  constructor(props: P) {
    super(props)
    this._angle = this.props.angle ? this.props.angle : 0
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

  componentDidMount() {
    console.log(`mounted ${this.props.name}: position=${this.position} pivot=${this.path.pivot}`)
  }

  componentWillReceiveProps(nextProps: PartBaseProps) {
    // Angleを更新
    this._angle += (nextProps.angle - this.props.angle)
  }

  /**
   * 指定のPivotのAngleを返す
   * PivotはLEFTとRIGHTくらいしか想定していない。実質ArcPart用
   * @param {Pivot} pivot
   */
  abstract getPivotAngle(pivot: Pivot): number

  /**
   * このパーツのParentの座標系における指定のPivotの位置を返す。
   * 基本的には getLocalPivotPosition の結果に localToParent() すれば良いはず
   * @param {Pivot} pivot
   */
  abstract getPivotPositionForParent(pivot: Pivot): Point

  /**
   * このパーツのローカル座標系における指定のPivotの位置を返す。
   * @param {Pivot} pivot
   */
  protected abstract getLocalPivotPosition(pivot: Pivot): Point

  // shouldComponentUpdate(nextProps) {
  //   if (this.props.position.x === nextProps.position.x && this.props.position.y === nextProps.position.y) {
  //     return false
  //   }
  //   if (this.props.angle === nextProps.angle) {
  //     return false
  //   }
  //   return true
  // }

  // moveRelatively(difference: Point) {
  //   this._path.position = this._path.position.add(difference);
  // }
  //
  // move(position: Point, pivot: Point = this.position): void {
  //   let difference = position.subtract(pivot);
  //   this.moveRelatively(difference);
  // }
  //
  // rotateRelatively(difference: number, pivot: Point = this.position) {
  //   this._angle += difference
  //   this.path.rotate(difference, pivot);
  // }
  //
  // rotate(angle: number, pivot: Point = this.position) {
  //   let relAngle = angle - this.angle
  //   this.rotateRelatively(relAngle, pivot);
  // }
}

