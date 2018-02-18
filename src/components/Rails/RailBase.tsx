import * as React from "react";
import {Point} from "paper";
import {Rectangle} from "react-paper-bindings";
import Joint from "./parts/Joint";
import getLogger from "logging";
import {pointsEqual} from "components/Rails/utils";
import {Pivot} from "components/Rails/parts/primitives/PartBase";
import * as _ from "lodash";

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
}

export interface RailBaseState {
  jointPositions: Point[]
}


type RailBaseComposedProps = RailBaseProps


export abstract class RailBase<P extends RailBaseComposedProps, S extends RailBaseState> extends React.Component<P, S> {

  public static defaultProps: RailBaseDefaultProps = {
    type: 'RailBase',
    selected: false,
    pivotJointIndex: 0,
    opacity: 1,
    hasOpposingJoints: []
  }

  public static RAIL_SPACE = 38

  railPart: any
  joints: Joint[]
  temporaryPivotJointIndex: number
  fixedJointsCount: number

  constructor(props: P) {
    super(props)
    // 本当はここに書きたいがエラーになる。Typescriptが糞
    // this.state = {
    //   railPartsFixed: false
    // }

    this.fixedJointsCount = 0
    this.onRailPartFixed = this.onRailPartFixed.bind(this)
    this.onJointsFixed = this.onJointsFixed.bind(this)
  }

  // TODO: これでOK?
  // shouldComponentUpdate() {
  //   return false
  // }

  // レールパーツの位置が確定後、
  // ジョイントの位置を設定する
  onRailPartFixed() {
    const jointPosititons =  _.range(this.joints.length).map(i => this.railPart.getJointPosition(i))
    this.setState({
      jointPositions: jointPosititons
    })
  }

  // レールパーツに次いで、全てのジョイントの位置が確定したらonFixedコールバックを呼んでやる
  onJointsFixed() {
    this.fixedJointsCount += 1
    if (this.fixedJointsCount === this.joints.length) {
      if (this.props.onFixed) {
        this.props.onFixed(this)
      }
    }
  }
}
