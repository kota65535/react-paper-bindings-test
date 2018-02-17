import * as React from "react";
import {Point} from "paper";
import {Path as PathComponent} from "react-paper-bindings";
import PartBase, {PartBaseProps, Pivot} from "components/Rails/parts/primitives/PartBase";
import {Path} from "paper";


interface RectPartProps extends PartBaseProps {
  width: number
  height: number
}


export default class RectPart extends PartBase<RectPartProps, {}> {

  constructor (props: RectPartProps) {
    super(props)

  }

  // ========== Public APIs ==========
  getPivotPosition(pivot: Pivot) {
    switch (pivot) {
      case Pivot.LEFT:
        return this._path.segments[0].point
      case Pivot.TOP:
        return this._path.curves[1].getLocationAt(this._path.curves[1].length/2).point;
      case Pivot.RIGHT:
        return this._path.segments[3].point
      case Pivot.BOTTOM:
        return this._path.curves[4].getLocationAt(this._path.curves[4].length/2).point;
      case Pivot.CENTER:
        return this.path.position
      default:
        throw Error(`Invalid pivot ${pivot} for ${this.constructor.name}`)
    }
  }


  getPivotPoint(pivot: Pivot) {
    const {width, height} = this.props
    switch (pivot) {
      case Pivot.LEFT:
        return new Point(0, 0)
      case Pivot.TOP:
        return new Point(width/2, -height/2)
      case Pivot.RIGHT:
        return new Point(width, 0)
      case Pivot.BOTTOM:
        return new Point(width/2, height/2)
      case Pivot.CENTER:
        return new Point(width/2, 0)
      default:
        throw Error(`Invalid pivot ${pivot} for ${this.constructor.name}`)
    }
  }

  render() {
    const {width, height,
      position, angle, fillColor, visible, opacity, selected, name, data,
      onFrame, onMouseDown, onMouseDrag, onMouseUp, onClick, onDoubleClick, onMouseMove, onMouseEnter, onMouseLeave} = this.props

    const pivot = this.getPivotPoint(this.props.pivot)

    return <PathComponent
      pathData={createRectPath(width, height)}
      pivot={pivot}     // pivot parameter MUST proceed to position
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


function createRectPath(width: number, height: number) {
  let pathData = `M 0 0 L 0 ${-height/2} ${width} ${-height/2} L ${width}} 0 L ${width} ${height/2} L 0 ${height/2} Z`
  return pathData
}
