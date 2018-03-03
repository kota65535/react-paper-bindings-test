import * as React from "react";
import {Rectangle} from "react-paper-bindings";
import {connect} from "react-redux";
import {RailBase, RailBaseDefaultProps, RailBaseProps, RailBaseState} from "components/Rails/RailBase";
import DoubleStraightRailPart from "components/Rails/RailParts/DoubleStraightRailPart";


export interface DoubleStraightRailProps extends RailBaseProps {
  length: number
}


export type DoubleStraightRailComposedProps = DoubleStraightRailProps


export class DoubleStraightRail extends RailBase<DoubleStraightRailComposedProps, RailBaseState> {

  public static NUM_JOINTS = 4
  public static defaultProps: RailBaseDefaultProps = {
    type: 'DoubleStraightRail',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: new Array(DoubleStraightRail.NUM_JOINTS).fill(false),
    enableJoints: true
  }
  public static PIVOT_JOINT_CHANGING_STRIDE = 1

  constructor(props: DoubleStraightRailComposedProps) {
    super(props)

    this.state = {
      jointPositions: new Array(DoubleStraightRail.NUM_JOINTS).fill(props.position),
      jointAngles: new Array(DoubleStraightRail.NUM_JOINTS).fill(props.angle)
    }
    this.temporaryPivotJointIndex = 0
    this.joints = new Array(DoubleStraightRail.NUM_JOINTS).fill(null)
  }


  render() {
    const {
      position, angle, length, id, selected, pivotJointIndex, opacity,
    } = this.props

    return (
      <React.Fragment>
        <DoubleStraightRailPart
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
        {this.createJointComponents()}
      </React.Fragment>
    )
  }
}
