import * as React from "react";
import {Point} from "paper";
import {Rectangle} from "react-paper-bindings";
import DoubleStraightRailPart from "./parts/DoubleStraightRailPart";
import Joint from "./parts/Joint";
import {Pivot} from "components/Rails/parts/primitives/PartBase";
import {connect} from "react-redux";
import {compose} from "recompose";
import {
  RailBase,
  RailBaseDefaultProps,
  RailBaseProps, RailBaseState
} from "components/Rails/RailBase";
import * as _ from "lodash";
import DoubleDoubleStraightRailPart from "components/Rails/parts/DoubleStraightRailPart";


export interface DoubleStraightRailProps extends RailBaseProps {
  length: number
}


export type DoubleStraightRailComposedProps = DoubleStraightRailProps


export class DoubleStraightRail extends RailBase<DoubleStraightRailComposedProps, RailBaseState> {

  public static NUM_JOINTS = 4
  public static PIVOT_JOINT_CHANGING_STRIDE = 1

  public static defaultProps: RailBaseDefaultProps = {
    type: 'DoubleDoubleStraightRail',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: new Array(DoubleStraightRail.NUM_JOINTS).fill(false)
  }

  constructor(props: DoubleStraightRailComposedProps) {
    super(props)

    this.state = {
      jointPositions: new Array(DoubleStraightRail.NUM_JOINTS).fill(props.position)
    }
    this.temporaryPivotJointIndex = 0
    this.joints = new Array(DoubleStraightRail.NUM_JOINTS).fill(null)
  }


  render() {
    const {
      position, angle, length, id, selected, pivotJointIndex, opacity,
      hasOpposingJoints
    } = this.props

    return (
      <React.Fragment>
        <DoubleDoubleStraightRailPart
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
          onFixed={this.onRailPartFixed}
          ref={(railPart) => this.railPart = railPart}
        />
        {_.range(DoubleStraightRail.NUM_JOINTS).map(i => {
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


