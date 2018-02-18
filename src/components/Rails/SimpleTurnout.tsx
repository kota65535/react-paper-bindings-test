import * as React from "react";
import {Rectangle} from "react-paper-bindings";
import Joint from "./parts/Joint";
import {Pivot} from "components/Rails/parts/primitives/PartBase";
import {connect} from "react-redux";
import {compose} from "recompose";
import {ArcDirection} from "components/Rails/parts/primitives/ArcPart";
import {
  RailBase,
  RailBaseDefaultProps,
  RailBaseProps, RailBaseState
} from "components/Rails/RailBase";
import * as _ from "lodash";
import SimpleTurnoutRailPart from "components/Rails/parts/SimpleTurnoutRailPart";


export interface SimpleTurnoutProps extends RailBaseProps {
  length: number
  radius: number
  centerAngle: number
}

export type SimpleTurnoutComposedProps = SimpleTurnoutProps


export class SimpleTurnout extends RailBase<SimpleTurnoutComposedProps, RailBaseState> {
  public static NUM_JOINTS = 3
  public static PIVOT_JOINT_CHANGING_STRIDE = 1

  public static defaultProps: RailBaseDefaultProps = {
    type: 'SimpleTurnout',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: new Array(SimpleTurnout.NUM_JOINTS).fill(false),
  }

  constructor(props: SimpleTurnoutComposedProps) {
    super(props)
    this.state = {
      jointPositions: new Array(SimpleTurnout.NUM_JOINTS).fill(props.position)
    }

    this.temporaryPivotJointIndex = this.props.pivotJointIndex
    this.joints = new Array(SimpleTurnout.NUM_JOINTS).fill(null)

  }

  render() {
    const {
      position, angle, length, radius, centerAngle, id, selected, pivotJointIndex, opacity,
      hasOpposingJoints
    } = this.props

    return (
      <React.Fragment>
        <SimpleTurnoutRailPart
          length={length}
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
          onFixed={this.onRailPartFixed}
          ref={(railPart) => this.railPart = railPart}
        />
        {_.range(SimpleTurnout.NUM_JOINTS).map(i => {
          return (
            <Joint
              angle={this.props.angle}
              position={this.state.jointPositions[i]}
              opacity={opacity}
              name={'Rail'}
              data={{
                railId: id,
                partType: 'Joint',
                partId: i
              }}
              hasOpposingJoint={hasOpposingJoints[i]}
              onFixed={this.onJointsFixed}
              ref={(joint) => this.joints[i] = joint}
            />
          )
        })}
      </React.Fragment>
    )
  }
}


