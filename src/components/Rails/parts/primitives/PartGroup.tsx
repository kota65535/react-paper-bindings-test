import * as React from "react";
import {Point, Group} from "paper";
import {Path as PathComponent, Group as GroupComponent} from "react-paper-bindings";
import PartBase, {PartBaseProps, Pivot} from "components/Rails/parts/primitives/PartBase";


interface MultiPartProps extends PartBaseProps {
}

interface PartGroupState {
  group: Group
  pivotPoint: Point
}

export default class PartGroup extends PartBase<MultiPartProps, PartGroupState> {

  constructor (props: MultiPartProps) {
    super(props)
    this.state = {
      group: null,
      pivotPoint: null
    }
  }

  // ========== Public APIs ==========

  _group: Group
  _width: number
  _height: number

  get group() {
    return this.state.group
  }

  get position() {
    return this.state.group.position
  }

  get angle() {
    return this._angle
  }

  moveRelatively(difference: Point) {
    this.state.group.position = this.state.group.position.add(difference);
  }

  move(position: Point, pivot: Point = this.position): void {
    let difference = position.subtract(pivot);
    this.moveRelatively(difference);
  }

  rotateRelatively(difference: number, pivot: Point = this.position) {
    this._angle += difference
    this.group.rotate(difference);
  }

  rotate(angle: number, pivot: Point = this.position) {
    let relAngle = angle - this.angle
    if (relAngle !== 0) {
      this.rotateRelatively(relAngle);
    }
  }

  getPivotPoint() {
    const {pivot, position} = this.props
    // 角度0の時のバウンディングボックスのwidthとheightを保存しておく
    if (! this._width && !this._height) {
      this._width = this.state.group.bounds.width
      this._height = this.state.group.bounds.height
    }
    switch (pivot) {
      case Pivot.LEFT:
        return position.add(new Point(-this._width/2, 0))
      case Pivot.TOP:
        return position.add(new Point(0, -this._height/2))
      case Pivot.RIGHT:
        return position.add(new Point(this._width/2, 0))
      case Pivot.BOTTOM:
        return position.add(new Point(0, this._height/2))
      case Pivot.CENTER:
        return position
      default:
        throw Error(`Invalid pivot ${pivot} for ${this.constructor.name}`)
    }

  }

  render() {
    const {pivot, position, fillColor, visible, opacity, selected, name, data,
      onFrame, onMouseDown, onMouseDrag, onMouseUp, onClick, onDoubleClick, onMouseMove, onMouseEnter, onMouseLeave} = this.props
    let angle = this.props.angle

    let pivotPoint
    if (! this.state.group) {
      angle = 0
    } else if (! this.state.pivotPoint) {
      pivotPoint = this.getPivotPoint()
      this.setState({
        pivotPoint
      })
      angle = 0
    } else {
      pivotPoint = this.state.pivotPoint
    }
    console.log(pivotPoint)

    return (
      <GroupComponent
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
        ref={(group) => {
          if (! this.state.group) {
            this.setState({group})
          }
        }}
      >
        {this.props.children}
      </GroupComponent>
    )
  }
}


