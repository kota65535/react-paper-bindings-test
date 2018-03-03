import * as React from "react";
import {Point} from "paper";
import {Rectangle} from "react-paper-bindings";
import Joint from "./RailParts/Joint";
import getLogger from "logging";
import {pointsEqual} from "components/Rails/utils";
import * as _ from "lodash";
import RailPartBase from "components/Rails/RailParts/RailPartBase";

const LOGGER = getLogger(__filename)


export interface RailBaseProps extends Partial<RailBaseDefaultProps> {
  position: Point
  angle: number
  id: number
  layerId: number    // このアイテムが所属するレイヤー
  name?: string
  onFixed?: (ref: any) => void

}

export interface RailBaseDefaultProps {
  type?: string    // アイテムの種類、すなわちコンポーネントクラス。この文字列がReactElementのタグ名として用いられる
  selected?: boolean
  pivotJointIndex?: number
  opacity?: number
  hasOpposingJoints?: boolean[]
  enableJoints: boolean
}

export interface RailBaseState {
  jointPositions: Point[]
  jointAngles: number[]
}

type RailBaseComposedProps = RailBaseProps


export abstract class RailBase<P extends RailBaseComposedProps, S extends RailBaseState> extends React.Component<P, S> {

  public static defaultProps: RailBaseDefaultProps = {
    type: 'RailBase',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: [],
    enableJoints: true
  }

  railPart: RailPartBase<any, any>
  joints: Joint[]
  temporaryPivotJointIndex: number

  constructor(props: P) {
    super(props)
    // 本当はここに書きたいがエラーになる。Typescriptが糞
    // this.state = {
    //   railPartsFixed: false
    // }

  }

  // TODO: これでOK?
  // shouldComponentUpdate() {
  //   return false
  // }

  componentDidUpdate() {
    this.setJointPositionsAndAngles()
  }


  componentDidMount() {
    this.setJointPositionsAndAngles()
  }

  createJointComponents() {
    const {id, opacity, hasOpposingJoints, enableJoints} = this.props
    const {jointPositions, jointAngles} = this.state

    return _.range(this.joints.length).map(i => {
      return (
        <Joint
          position={jointPositions[i]}
          angle={jointAngles[i]}
          opacity={opacity}
          name={'Rail'}
          data={{
            railId: id,
            partType: 'Joint',
            partId: i
          }}
          detectionEnabled={enableJoints}
          hasOpposingJoint={hasOpposingJoints[i]}
          // onLeftClick={this.onJointLeftClick.bind(this, i)}
          // onRightClick={this.onJointRightClick.bind(this, i)}
          // onMouseMove={this.onJointMouseMove.bind(this, i)}
          // onMouseEnter={this.onJointMouseEnter.bind(this, i)}
          // onMouseLeave={this.onJointMouseLeave.bind(this, i)}
          ref={(joint) => this.joints[i] = joint}
        />
      )
    })
  }

  // レールパーツの位置・角度に合わせてジョイントの位置・角度を変更する
  private setJointPositionsAndAngles() {
    // 注意: オブジェクトをStateにセットする場合はきちんとCloneすること
    const jointPositions = _.range(this.joints.length).map(i => _.clone(this.railPart.getGlobalJointPosition(i)))
    const jointAngles = _.range(this.joints.length).map(i => _.clone(this.railPart.getGlobalJointAngle(i)))

    _.range(this.joints.length).forEach(i => {
      LOGGER.debug(`[Rail][${this.props.name}] Joint${i} position: ${this.state.jointPositions[i]} -> ${jointPositions[i]}`)
      LOGGER.debug(`[Rail][${this.props.name}] Joint${i} angle: ${this.state.jointAngles[i]} -> ${jointAngles[i]}`)
    })

    // レールパーツから取得したジョイントの位置・角度が現在のものと異なれば再描画
    if (_.range(this.joints.length).every(i =>
        pointsEqual(this.state.jointPositions[i], jointPositions[i])
        && this.state.jointAngles[i] === jointAngles[i])) {
      // noop
    } else {
      this.setState({
        jointPositions,
        jointAngles
      })
    }
  }
}
