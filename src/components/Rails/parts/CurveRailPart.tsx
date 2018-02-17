import * as React from "react";
import {Point} from "paper";
import {Rectangle} from "react-paper-bindings";
import RectPart from "./primitives/RectPart";
import DetectablePart from "./primitives/DetectablePart";
import ArcPart, {ArcDirection} from "./primitives/ArcPart";
import {RAIL_PART_DETECTION_OPACITY_RATE, RAIL_PART_FILL_COLORS, RAIL_PART_WIDTH} from "constants/parts";
import {Pivot} from "components/Rails/parts/primitives/PartBase";
import {RailPartInfo} from "components/Rails/parts/types";
import getLogger from "logging";

const LOGGER = getLogger(__filename)


interface Props extends Partial<DefaultProps> {
  radius: number
  centerAngle: number
  direction: ArcDirection
  name?: string
  data?: RailPartInfo
  onLeftClick?: (e: MouseEvent) => void
  onRightClick?: (e: MouseEvent) => void
}

interface DefaultProps {
  position?: Point
  angle?: number
  pivot?: Pivot
  detectionEnabled?: boolean
  selected?: boolean
  opacity?: number
  fillColors?: string[]
}

export type CurveRailPartProps = Props & DefaultProps;


export default class CurveRailPart extends React.Component<CurveRailPartProps, {}> {
  public static defaultProps: DefaultProps = {
    position: new Point(0, 0),
    angle: 0,
    detectionEnabled: false,
    pivot: Pivot.LEFT,
    selected: false,
    opacity: 1,
    fillColors: RAIL_PART_FILL_COLORS
  }

  detectablePart: DetectablePart

  constructor(props: CurveRailPartProps) {
    super(props)
  }

  // ========== Public APIs ==========

  get startPoint() {
    return (this.detectablePart.mainPart as RectPart).getCenterOfLeft()
  }

  get endPoint() {
    return (this.detectablePart.mainPart as RectPart).getCenterOfRight()
  }

  get startAngle() {
    return this.detectablePart.angle
  }

  get endAngle() {
    switch (this.props.direction) {
      case ArcDirection.RIGHT:
        return this.detectablePart.angle + this.props.centerAngle
      case ArcDirection.LEFT:
        return this.detectablePart.angle - this.props.centerAngle
    }
  }

  moveRelatively(difference: Point) {
    this.detectablePart.moveRelatively(difference)
  }

  move(position: Point, pivot: Point = this.startPoint): void {
    LOGGER.debug(`move ${this.detectablePart.position} ->  ${position}`)
    this.detectablePart.move(position, pivot)
  }

  rotateRelatively(difference: number, pivot: Point = this.startPoint) {
    this.detectablePart.rotateRelatively(difference, pivot);
  }

  rotate(angle: number, pivot: Point = this.startPoint) {
    LOGGER.debug(`rotate ${this.detectablePart.angle} ->  ${angle} @ ${pivot}`)
    this.detectablePart.rotate(angle, pivot);
  }

  // ========== Private methods ==========

  render() {
    const {radius, centerAngle, position, angle, direction, pivot, detectionEnabled, selected, fillColors, opacity,
      name, data, onLeftClick, onRightClick} = this.props
    return (
      <DetectablePart
        mainPart={
          <ArcPart
            position={position}
            angle={angle}
            direction={direction}
            radius={radius}
            centerAngle={centerAngle}
            width={RAIL_PART_WIDTH}
            pivot={pivot}
            selected={selected}
          />
        }
        detectionPart={
          <ArcPart
            position={position}
            angle={angle}
            direction={direction}
            radius={radius}
            centerAngle={centerAngle}
            width={RAIL_PART_WIDTH}
            selected={selected}
            opacity={opacity * RAIL_PART_DETECTION_OPACITY_RATE}
          />
        }
        fillColors={fillColors}
        detectionEnabled={detectionEnabled}
        name={name}
        data={data}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        ref={(part) => this.detectablePart = part}
      />
    )
  }
}