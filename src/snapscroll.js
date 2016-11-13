import React, {Component} from 'react'
import scrollToWithAnimation from 'scrollto-with-animation'

class SnapScroll extends Component {
  constructor (props) {
    super(props)
    this.scrolling = this.scrolling.bind(this)
    this.fixScroll = this.fixScroll.bind(this)
    this.scrollPosition = 0
    this.scrollSpeed = 0
    this.isFixing = false
    this.heights = []
  }
  componentDidMount () {
    this.refs.wrapper.addEventListener('scroll', this.scrolling)
    this.getHeights()
  }
  componentWillUnmount () {
    this.refs.wrapper.removeEventListener('scroll', this.scrolling)
  }
  componentDidUpdate () {
    this.getHeights()
  }
  render () {
    const {children, ...props} = this.props
    return (<div ref='wrapper' {...props}>{children}</div>)
  }
  getHeights () {
    const {children} = this.refs.wrapper
    let accumulateHeight = 0
    for (let i = 0; i < children.length; i++) {
      this.heights[i] = accumulateHeight
      accumulateHeight += children[i].offsetHeight
    }
  }
  scrolling () {
    if (this.isFixing) return
    const scrollPosition = this.refs.wrapper.scrollTop
    const diff = this.scrollPosition - scrollPosition
    const acceleration = analyseScroll(Math.abs(this.scrollSpeed), Math.abs(diff))

    if (acceleration >= 10) this.hasMomentum = true
    else if (this.hasMomentum) this.snapScroll(acceleration)
    else console.log('nothing')

    // update values
    this.scrollSpeed = diff
    this.scrollPosition = scrollPosition
  }
  snapScroll (acceleration) {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(this.fixScroll, 50)
  }
  fixScroll () {
    this.hasMomentum = false
    const nextPosition = calculateSnap(this.refs.wrapper.scrollPosition, this.heights)
    this.isFixing = true
    scrollToWithAnimation(
      this.refs.wrapper,
      'scrollTop',
      nextPosition,
      100,
      'easeOutExpo',
      () => {
        this.isFixing = false
        this.scrollPosition = nextPosition
        console.log('finish!')
      }
    )
    console.log('fix to', nextPosition)
  }
}

function analyseScroll (delta0, delta1) {
  const acceleration = Math.abs(delta0, delta1)
  console.log(acceleration)
  if (acceleration >= 10) console.log('momentum')
  if (acceleration < 10) console.log('constant')
  return acceleration
}

function calculateSnap (position, limits) {
  const targetIndex = limits.findIndex((topEdge) => position < topEdge)
  const top = limits[targetIndex - 1]
  const bottom = limits[targetIndex]
  const gap2top = Math.abs(top - position)
  const gap2bottom = Math.abs(bottom - position)
  if (gap2top < gap2bottom) return top
  else return bottom
}

// function calculateSnap (element, limits) {
//   const scrollPosition = element.scrollTop
//   const visibleEdge = element.offsetHeight + scrollPosition
//
//   const topEdgeIndex = limits.findIndex((position) => scrollPosition < position) - 1
//   const bottomEdgeIndex = limits.findIndex((position) => visibleEdge < position)
//
//   // scrolling the same element
//   if (topEdgeIndex === bottomEdgeIndex - 1) return scrollPosition
//
//   // check top edge nearness
//   const top = limits[topEdgeIndex - 1]
//   const bottom = limits[topEdgeIndex]
//   const gap2top = Math.abs(top - scrollPosition)
//   const gap2bottom = Math.abs(bottom - scrollPosition)
//
//   // check bottom edge nearness
//   const bottomToPrevious = limits[topEdgeIndex - 1]
//   const bottomToNext = limits[topEdgeIndex]
//   const gap2top = Math.abs(top - scrollPosition)
//   const gap2bottom = Math.abs(bottom - scrollPosition)
//
//   if (gap2top < gap2bottom) return top
//   else return bottom
// }

export default SnapScroll
