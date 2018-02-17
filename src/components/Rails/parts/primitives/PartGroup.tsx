import * as React from "react";
import {Point, Group} from "paper";
import {Path as PathComponent, Group as GroupComponent} from "react-paper-bindings";
import PartBase, {PartBaseProps, Pivot} from "components/Rails/parts/primitives/PartBase";


interface MultiPartProps extends PartBaseProps {
}


export default class PartGroup extends PartBase<MultiPartProps, {}> {

  constructor (props: MultiPartProps) {
    super(props)
  }

  _group: Group

  // ========== Public APIs ==========

  get group() {
    return this._group
  }

  get position() {
    return this._group.position
  }

  get angle() {
    return this._angle
  }

  moveRelatively(difference: Point) {
    this._group.position = this._group.position.add(difference);
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

  componentDidUpdate() {
    // this.rotate(45)
    console.log(this.group.position)
  }

  componentDidMount() {
    // this.rotate(45)
    console.log(this.group.position)
  }


  render() {
    const {position, angle, fillColor, visible, opacity, selected, name, data,
      onFrame, onMouseDown, onMouseDrag, onMouseUp, onClick, onDoubleClick, onMouseMove, onMouseEnter, onMouseLeave} = this.props
    return (
      <GroupComponent
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
        ref={(c) => this._group = c}
      >
        {this.props.children}
      </GroupComponent>
    )
  }
}


