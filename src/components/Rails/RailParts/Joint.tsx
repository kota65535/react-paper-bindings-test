import * as React from "react";
import {Point} from "paper";
import {Rectangle} from "react-paper-bindings";
import DetectablePart from "./Parts/DetectablePart";
import CirclePart from "./Parts/CirclePart";
import {RailPartInfo} from "components/Rails/RailParts/types";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import {JOINT_DETECTION_OPACITY_RATE, JOINT_FILL_COLORS} from "constants/parts";
import TrianglePart from "components/Rails/RailParts/Parts/TrianglePart";
import getLogger from "logging";

const LOGGER = getLogger(__filename)

interface Props extends Partial<DefaultProps> {
  name?: string
  data?: RailPartInfo
  onMouseMove?: (e: MouseEvent) => void
  onLeftClick?: (e: MouseEvent) => void
  onRightClick?: (e: MouseEvent) => void
  onMouseEnter?: (e: MouseEvent) => void
  onMouseLeave?: (e: MouseEvent) => void
}

interface DefaultProps {
  position?: Point
  angle?: number
  pivot?: Pivot
  selected?: boolean
  opacity?: number
  fillColors?: string[]
  hasOpposingJoint?: boolean
  detectionEnabled?: boolean
}

export type JointProps = Props & DefaultProps;


export default class Joint extends React.Component<JointProps, {}> {
  public static defaultProps: DefaultProps = {
    position: new Point(0, 0),
    angle: 0,
    pivot: Pivot.CENTER,
    selected: false,
    opacity: 1,
    fillColors: JOINT_FILL_COLORS,
    hasOpposingJoint: false,
    detectionEnabled: true
  }
  static WIDTH = 8;
  static HEIGHT = 18;
  static HIT_RADIUS = 16;
  static FLOW_COLOR_1 = "royalblue";
  static FLOW_COLOR_2 = "greenyellow";
  static ANIMATION_MAX = 30
  static ANIMATION_MIN = 60

  detectablePart: DetectablePart

  constructor(props: JointProps) {
    super(props)
  }

  // ========== Public APIs ==========

  get position() {
    return this.detectablePart.position
  }

  get angle() {
    return this.detectablePart.angle
  }


  // ========== Private methods ==========

  render() {
    const {
      position, angle, detectionEnabled, hasOpposingJoint, pivot, selected, fillColors, opacity,
      name, data, onLeftClick, onRightClick, onMouseMove, onMouseEnter, onMouseLeave
    } = this.props

    return (
      <DetectablePart
        mainPart={
          <TrianglePart
            width={Joint.WIDTH}
            height={Joint.HEIGHT}
            opacity={opacity}
          />
        }
        detectionPart={
          <CirclePart
            radius={Joint.HIT_RADIUS}
            opacity={opacity * JOINT_DETECTION_OPACITY_RATE}
          />
        }
        position={position}
        angle={angle}
        pivot={pivot}
        fillColors={fillColors}
        detectionEnabled={detectionEnabled && !hasOpposingJoint}
        name={name}
        data={data}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        ref={(part) => this.detectablePart = part}
      />
    )
  }
}
