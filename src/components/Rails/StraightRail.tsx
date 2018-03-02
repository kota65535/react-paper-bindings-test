import * as React from "react";
import {Point} from "paper";
import {Rectangle} from "react-paper-bindings";
import StraightRailPart from "./RailParts/StraightRailPart";
import Joint from "./RailParts/Joint";
import {Pivot} from "components/Rails/RailParts/Parts/PartBase";
import {connect} from "react-redux";
import {compose} from "recompose";
import {
  RailBase,
  RailBaseDefaultProps,
  RailBaseProps, RailBaseState
} from "components/Rails/RailBase";
import * as _ from "lodash";


export interface StraightRailProps extends RailBaseProps {
  length: number
}


export type StraightRailComposedProps = StraightRailProps


export class StraightRail extends RailBase<StraightRailComposedProps, RailBaseState> {

  public static NUM_JOINTS = 2
  public static PIVOT_JOINT_CHANGING_STRIDE = 1


  public static defaultProps: RailBaseDefaultProps = {
    type: 'StraightRail',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: new Array(StraightRail.NUM_JOINTS).fill(false),
    enableJoints: true
  }

  constructor(props: StraightRailComposedProps) {
    super(props)

    this.state = {
      jointPositions: new Array(StraightRail.NUM_JOINTS).fill(props.position),
      jointAngles: new Array(StraightRail.NUM_JOINTS).fill(props.angle)
    }
    this.temporaryPivotJointIndex = 0
    this.joints = new Array(StraightRail.NUM_JOINTS).fill(null)
  }


  render() {
    const {
      position, angle, length, id, selected, pivotJointIndex, opacity,
      hasOpposingJoints, enableJoints
    } = this.props

    return (
      <React.Fragment>
        <StraightRailPart
          length={length}
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
          // onFixed={this.onRailPartFixed}
          ref={(railPart) => this.railPart = railPart}
        />
        {_.range(StraightRail.NUM_JOINTS).map(i => {
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
