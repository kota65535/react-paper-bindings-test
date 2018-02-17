import * as React from "react";
import {ReactElement} from "react";
import {Group} from "react-paper-bindings";
import {Point} from "paper";
import PartBase, {PartBaseProps} from "components/Rails/parts/primitives/PartBase";
import PartGroup from "components/Rails/parts/primitives/PartGroup";


export interface DetectablePartProps extends PartBaseProps {
  mainPart: ReactElement<PartBase<PartBaseProps, {}>>         // 本体のコンポーネント
  detectionPart: ReactElement<PartBase<PartBaseProps, {}>>    //  当たり判定のコンポーネント
  fillColors: string[]    // DetectionState ごとの本体、当たり判定の色
  onLeftClick?: (e: MouseEvent) => void
  onRightClick?: (e: MouseEvent) => void
  detectionEnabled: boolean
  pivotPartIndex?: number
  onFixed?: () => void
}

export interface DetectablePartState {
  detectionState: DetectionState
  detectionPartVisible: boolean
}

/**
 * 当たり判定による検出状態。
 */
export enum DetectionState {
  DISABLED = 0,
  BEFORE_DETECT,  // 検出前
  DETECTING,          // 検出中（カーソルが当たっている）
  AFTER_DETECT        // 検出後（クリックなどにより選択された）
}


export default class DetectablePart extends React.Component<DetectablePartProps, DetectablePartState> {

  _mainPart: PartBase<PartBaseProps, {}>
  _detectionPart: PartBase<PartBaseProps, {}>

  constructor (props: DetectablePartProps) {
    super(props)
    if (this.props.detectionEnabled) {
      this.state = {
        detectionState: DetectionState.BEFORE_DETECT,
        detectionPartVisible: true
      }
    } else {
      this.state = {
        detectionState: DetectionState.DISABLED,
        detectionPartVisible: false
      }
    }
    this.onMouseEnter.bind(this)
    this.onMouseLeave.bind(this)
    this.onClick.bind(this)
  }

  // ========== Public APIs ==========

  get mainPart() {
    return this._mainPart
  }

  get detectionPart() {
    return this._detectionPart
  }

  get position() {
    return this._mainPart.position
  }

  get angle() {
    return this._mainPart.angle
  }

  resetDetectionState() {
    this.setState({
        detectionState: DetectionState.BEFORE_DETECT
    })
  }

  moveRelatively(difference: Point) {
    this.mainPart.moveRelatively(difference)
    this.detectionPart.moveRelatively(difference)
  }

  move(position: Point, anchor: Point = this.mainPart.position): void {
    this.mainPart.move(position, anchor)
    this.detectionPart.move(position, anchor)
  }

  rotateRelatively(difference: number, pivot: Point = this.position) {
    this.mainPart.rotateRelatively(difference, pivot);
    this.detectionPart.rotateRelatively(difference, pivot);
  }

  rotate(angle: number, pivot: Point = this.position) {
    this.mainPart.rotate(angle, pivot);
    this.detectionPart.rotate(angle, pivot);
  }

  // ========== Private methods ==========

  // detectionEnabledが OFF -> ON になった場合は状態をリセットする
  componentWillReceiveProps(nextProps: DetectablePartProps) {
    if (! this.props.detectionEnabled && nextProps.detectionEnabled) {
      this.setState({
        detectionState: DetectionState.BEFORE_DETECT,
        detectionPartVisible: true
      })
    }
  }

  // componentDidMount() {
  //   this.fixDetectionPartPosition()
  //   // this.rotate(30, new Point(0,0))
  // }
  //
  // componentDidUpdate() {
  //   this.fixDetectionPartPosition()
  //   // this.rotate(30, new Point(0,0))
  // }

  // 本体と当たり判定の中心位置を合わせたいが、本体の位置が確定した後でないとそれができない。
  // そのため両インスタンスを直接参照して位置を変更する
  // fixDetectionPartPosition() {
  //   this._detectionPart.path.position = this._mainPart.path.position
  // }

  onMouseEnter = (e: MouseEvent) => {
    if (this.props.detectionEnabled && this.state.detectionState == DetectionState.BEFORE_DETECT) {
      this.setState({
        detectionState: DetectionState.DETECTING,
        detectionPartVisible: true
      })
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e)
    }
  }

  onMouseLeave = (e: MouseEvent) => {
    if (this.props.detectionEnabled && this.state.detectionState == DetectionState.DETECTING) {
      this.setState({
        detectionState: DetectionState.BEFORE_DETECT,
        detectionPartVisible: true
      })
    }
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e)
    }
  }

  onClick = (e: MouseEvent|any) => {
    // TODO: 左クリックと右クリックでイベントを分ける
    switch (e.event.button) {
      case 0:
        this.setState({
          detectionState: DetectionState.AFTER_DETECT,
          detectionPartVisible: false
        })
        if (this.props.onLeftClick) {
          this.props.onLeftClick(e)
        }
        break
      case 2:
        if (this.props.onRightClick) {
          this.props.onRightClick(e)
        }
        break
    }
  }

  // MainPartに追加するProps。既に指定されていたら上書き
  additionalMainPartProps() {
    let props: any = {}
    props.name = this.props.name
    props.data = this.props.data
    props.ref = (_mainPart) => this._mainPart = _mainPart
    return props
  }

  // DetectionPartに追加するProps。既に指定されていたら上書き
  additionalDetectionPartProps() {
    let props: any = {}
    props.visible = this.props.detectionEnabled ? this.state.detectionPartVisible : false
    props.name = this.props.name
    props.data = this.props.data
    props.onMouseEnter = this.onMouseEnter
    props.onMouseLeave = this.onMouseLeave
    props.onClick = this.onClick
    props.onMouseMove = this.props.onMouseMove
    props.ref = (_detectionPart) => this._detectionPart = _detectionPart
    return props
  }

  render() {
    const {position, angle, pivot, pivotPartIndex, fillColors, onFixed, mainPart, detectionPart} = this.props

    const addedMainPartProps = this.additionalMainPartProps()
    const addedDetectionPartProps = this.additionalDetectionPartProps()

    let clonedMainPart = React.cloneElement(mainPart, Object.assign({}, mainPart.props, addedMainPartProps))
    let clonedDetectionPart = React.cloneElement(detectionPart, Object.assign({}, detectionPart.props, addedDetectionPartProps))

    return [
      <PartGroup
        position={position}
        angle={angle}
        pivot={pivot}
        pivotPartIndex={pivotPartIndex}
        fillColor={fillColors[this.state.detectionState]}
        onFixed={onFixed}
      >
        {clonedMainPart}
        {clonedDetectionPart}
      </PartGroup>
    ]
  }
}
