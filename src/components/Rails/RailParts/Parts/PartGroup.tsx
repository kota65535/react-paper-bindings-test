import * as React from "react";
import {Point} from "paper";
import {Group as GroupComponent} from "react-paper-bindings";
import PartBase, {PartBaseDefaultProps, PartBaseProps, Pivot} from "components/Rails/RailParts/Parts/PartBase";


interface PartGroupProps extends PartBaseProps {
  pivotPartIndex?: number
  onFixed?: (instance: any) => void
}

interface PartGroupState {
  pivotPoint: Point
}

export default class PartGroup extends PartBase<PartGroupProps, PartGroupState> {
  public static defaultProps: PartBaseDefaultProps = {
    position: new Point(0, 0),
    angle: 0,
    pivot: Pivot.CENTER,
    fillColor: undefined,
    visible: true,
    opacity: 1,
    selected: false,
  }
  _isFixed: boolean

  constructor(props: PartGroupProps) {
    super(props)
    this.state = {
      pivotPoint: null
    }
    this._children = this.props.children ? new Array((this.props.children as any[]).length) : []
    this._isFixed = false
  }

  _children: any[]

  // ========== Public APIs ==========

  get children() {
    return this._children
  }

  //
  // get position() {
  //   return this._group.position
  // }

  get group() {
    return this._path
  }

  componentDidUpdate() {
    // PivotPart指定時は、最初の componentDidUpdate が呼ばれた時点で位置が確定する
    if (!this._isFixed && this.state.pivotPoint) {
      this._isFixed = true
      if (this.props.onFixed) {
        this.props.onFixed(this)
      }
    }

    //     }
    //   } else {
    //     // Pivotリセットを行った直後の状態。Pivotを再計算する。
    //     this.setState({
    //       pivotPoint: this.getLocalPivotPosition(this.props.pivot)
    //     })
    //   }
    // }
    // console.log(`${this.props.name} updated: position=${this.group.position} pivot=${this.group.pivot}`)
    // const pivotPoint = this.getLocalPivotPosition(this.props.pivot)
    // if (this.state.pivotPoint && this.state.pivotPoint !== pivotPoint) {
    //   this.setState({
    //     pivotPoint: this.getLocalPivotPosition(this.props.pivot)
    //   })
    // }
    if (this.props.pivotPartIndex !== undefined) {
      // PivotPartの指定がある場合、ここでPivot位置を確定させて再度Renderする
      let pivotPoint = this.getInternalPivotPosition(this.props.pivot)
      // 親のGroupがいる場合、render時にこのGroupの位置を利用したい場合がある
      // そのためここでpivot, positionを実質設定してしまう
      // TODO: より上手い方法が無いか考える
      this.group.pivot = pivotPoint
      this.group.position = this.props.position
    }
    else {
      // PivotPartの指定が無い場合、ここで位置を確定する。理由は上記と同様
      this.group.position = this.props.position
      if (this.props.pivot !== undefined) {
        let pivotPoint = this.getInternalPivotPosition(this.props.pivot)
        this.group.pivot = pivotPoint
        this.group.position = this.props.position
      } else {
        // PivotPartの指定が無い場合、ここで位置を確定する。理由は上記と同様
        this.group.position = this.props.position
      }
    }
  }

  componentWillReceiveProps(nextProps: PartGroupProps) {
    // if (
    //   // PivotPartの指定が変更された場合
    //   this.props.pivotPartIndex && this.props.pivotPartIndex !== nextProps.pivotPartIndex
    //     // Pivotの指定が変更された場合
    //   || this.props.pivot !== nextProps.pivot
    // ) {
    //   this._isFixed = false
    // }
  }

  componentDidMount() {
    // マウントされたらrefでGroupオブジェクトが取れているので、Pivotを計算して再描画する
    // let pivotPoint = this.getLocalPivotPosition(this.props.pivot)

    // console.log(`${this.props.name} mounted. Group: position=${this.group.position} pivot=${this.group.pivot}`)
    // console.log(`${this.props.name} calc pivot: pivotIndex=${this.props.pivotPartIndex}, pivot=${pivotPoint}`)

    if (this.props.pivotPartIndex !== undefined) {
      // PivotPartの指定がある場合、ここでPivot位置を確定させて再度Renderする
      let pivotPoint = this.getInternalPivotPosition(this.props.pivot)
      this.setState({
        pivotPoint: pivotPoint
      })
      // 親のGroupがいる場合、render時にこのGroupの位置を利用したい場合がある
      // そのためここでpivot, positionを実質設定してしまう
      // TODO: より上手い方法が無いか考える
      this.group.pivot = pivotPoint
      this.group.position = this.props.position
    }
    else {
      if (this.props.pivot !== undefined) {
        let pivotPoint = this.getInternalPivotPosition(this.props.pivot)
        this.setState({
          pivotPoint: pivotPoint
        })
        this.group.pivot = pivotPoint
        this.group.position = this.props.position
      } else {
        // PivotPartの指定が無い場合、ここで位置を確定する。理由は上記と同様
        this.group.position = this.props.position
      }
    }

    this._isFixed = true
    if (this.props.onFixed) {
      this.props.onFixed(this)
    }
  }

  // getPivotPositionForGlobal(pivot: Pivot) {
  //   //TODO: impl
  //   return new Point(0, 0)
  // }

  render() {
    const {
      pivot, fillColor, visible, opacity, selected, name, data,
      onFrame, onMouseDown, onMouseDrag, onMouseUp, onClick, onDoubleClick, onMouseMove, onMouseEnter, onMouseLeave
    } = this.props

    // 子要素のメソッドを呼び出す必要があるので、refをそれらのpropsに追加する
    // TODO: childrenが空の時のエラー処理
    const children = React.Children.map(this.props.children, (child: any, i) => {
      // 動的に子要素を削除された場合、nullが入ってくるので対処する
      if (child) {
        return React.cloneElement(child as any, {
          ...child.props,
          ref: (node) => {
            this._children[i] = node
          }
        })
      }
      return null
    })

    // 最初のrenderが呼ばれた時点ではまだ子が描画されていないので、Pivotの位置を確定できない
    // 一方 componentDidMount, componentDidUpdate では既に子が描画済みなので、そこでPivotをStateにセットして再描画する
    let pivotPoint, position, angle
    if (this.props.pivotPartIndex !== undefined && this.state.pivotPoint) {
      pivotPoint = this.getInternalPivotPosition(this.props.pivot)
      // pivotPoint = this.state.pivotPoint
    }
    position = this.props.position
    angle = this.props.angle

    // console.log(`${name} rendering : position=${position}, pivot=${pivotPoint}`)

    return (
      <GroupComponent
        pivot={pivotPoint}
        position={position}
        rotation={angle}
        fillColor={fillColor}
        visible={visible}
        opacity={opacity}
        selected={selected}
        name={name}
        data={data}
        onFrame={onFrame}
        onMouseDown={onMouseDown}
        onMouseDrag={onMouseDrag}
        onMouseUp={onMouseUp}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        // refには一瞬だけ引数にnullが入ってくることがある。(https://github.com/facebook/react/issues/4533)
        // 直後に再度呼ばれて本物が入ってくるが、あまり凝ったことはせずにシンプルに保つべき
        ref={(group) => this._path = group}
      >
        {children}
      </GroupComponent>
    )
  }

  protected getInternalPivotPosition(pivot: Pivot) {
    // PivotPartIndexが指定されていたら、指定のパーツのPivotを使用する
    // そうでなければBoundingBoxのPivotを使用する
    if (this.props.pivotPartIndex !== undefined) {
      return this._children[this.props.pivotPartIndex].getPosition(pivot)
    } else {
      return this.getPivotPositionFromBounds(pivot)
    }
  }

  protected getPivotPositionFromBounds(pivot: Pivot) {
    switch (pivot) {
      case Pivot.LEFT:
        return this.group.parentToLocal(this.group.bounds.leftCenter)
      case Pivot.TOP:
        return this.group.parentToLocal(this.group.bounds.topCenter)
      case Pivot.RIGHT:
        return this.group.parentToLocal(this.group.bounds.rightCenter)
      case Pivot.BOTTOM:
        return this.group.parentToLocal(this.group.bounds.bottomCenter)
      case Pivot.CENTER:
      default:
        return this.group.parentToLocal(this.group.bounds.center)
    }
  }
}


