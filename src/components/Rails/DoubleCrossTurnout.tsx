import * as React from "react";
import {Rectangle} from "react-paper-bindings";
import Joint from "./RailParts/Joint";
import {connect} from "react-redux";
import {compose} from "recompose";
import {
  RailBase,
  RailBaseDefaultProps,
  RailBaseProps, RailBaseState
} from "components/Rails/RailBase";
import * as _ from "lodash";
import DoubleCrossTurnoutPart from "components/Rails/RailParts/DoubleCrossTurnoutRailPart";


export interface DoubleCrossTurnoutProps extends RailBaseProps {
  length: number
}


export type DoubleCrossTurnoutComposedProps = DoubleCrossTurnoutProps


export class DoubleCrossTurnout extends RailBase<DoubleCrossTurnoutComposedProps, RailBaseState> {

  public static NUM_JOINTS = 4
  public static PIVOT_JOINT_CHANGING_STRIDE = 2

  public static defaultProps: RailBaseDefaultProps = {
    type: 'DoubleCrossTurnout',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: new Array(DoubleCrossTurnout.NUM_JOINTS).fill(false),
    enableJoints: true
  }

  constructor(props: DoubleCrossTurnoutComposedProps) {
    super(props)

    this.state = {
      jointPositions: new Array(DoubleCrossTurnout.NUM_JOINTS).fill(props.position),
      jointAngles: new Array(DoubleCrossTurnout.NUM_JOINTS).fill(props.angle)
    }
    this.temporaryPivotJointIndex = 0
    this.joints = new Array(DoubleCrossTurnout.NUM_JOINTS).fill(null)
  }


  render() {
    const {
      position, angle, length, id, selected, pivotJointIndex, opacity,
      hasOpposingJoints
    } = this.props

    return (
      <React.Fragment>
        <DoubleCrossTurnoutPart
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
          ref={(railPart) => this.railPart = railPart}
        />
        {_.range(DoubleCrossTurnout.NUM_JOINTS).map(i => {
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

