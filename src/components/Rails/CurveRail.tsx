import * as React from "react";
import {Rectangle} from "react-paper-bindings";
import CurveRailPart from "./RailParts/CurveRailPart";
import Joint from "./RailParts/Joint";
import {connect} from "react-redux";
import {ArcDirection} from "components/Rails/RailParts/Parts/ArcPart";
import {RailBase, RailBaseDefaultProps, RailBaseProps, RailBaseState} from "components/Rails/RailBase";
import * as _ from "lodash";


export interface CurveRailProps extends RailBaseProps {
  radius: number
  centerAngle: number
}

export type CurveRailComposedProps = CurveRailProps


export class CurveRail extends RailBase<CurveRailComposedProps, RailBaseState> {
  public static NUM_JOINTS = 2
  public static defaultProps: RailBaseDefaultProps = {
    type: 'CurveRail',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: new Array(CurveRail.NUM_JOINTS).fill(false),
    enableJoints: true
  }
  public static PIVOT_JOINT_CHANGING_STRIDE = 1

  constructor(props: CurveRailComposedProps) {
    super(props)
    this.state = {
      jointPositions: new Array(CurveRail.NUM_JOINTS).fill(props.position),
      jointAngles: new Array(CurveRail.NUM_JOINTS).fill(props.angle)
    }

    // カーブ系レールのジョイントに対して仮レールを設置する場合は向き(PivotJoint)を揃える
    this.temporaryPivotJointIndex = this.props.pivotJointIndex
    this.joints = new Array(CurveRail.NUM_JOINTS).fill(null)
  }

  render() {
    const {
      position, angle, radius, centerAngle, id, selected, pivotJointIndex, opacity,
      hasOpposingJoints
    } = this.props

    return (
      <React.Fragment>
        <CurveRailPart
          radius={radius}
          centerAngle={centerAngle}
          direction={ArcDirection.RIGHT}
          position={position}
          angle={angle}
          pivotJointIndex={pivotJointIndex}
          selected={selected}
          opacity={opacity}
          name={'Rail'}
          data={{
            railId: id,
            partType: 'RailPart',
            partId: 0
          }}
          ref={(railPart) => this.railPart = railPart}
        />
        {_.range(CurveRail.NUM_JOINTS).map(i => {
          return (
            <Joint
              angle={this.state.jointAngles[i]}
              position={this.state.jointPositions[i]}
              opacity={opacity}
              name={'Rail'}
              data={{
                railId: id,
                partType: 'Joint',
                partId: i
              }}
              detectionEnabled={this.props.enableJoints}
              hasOpposingJoint={hasOpposingJoints[i]}
              // onLeftClick={this.onJointLeftClick.bind(this, i)}
              // onRightClick={this.onJointRightClick.bind(this, i)}
              // onMouseMove={this.onJointMouseMove.bind(this, i)}
              // onMouseEnter={this.onJointMouseEnter.bind(this, i)}
              // onMouseLeave={this.onJointMouseLeave.bind(this, i)}
              ref={(joint) => this.joints[i] = joint}
            />
          )
        })}
      </React.Fragment>
    )
  }
}


