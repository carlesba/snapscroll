import React, { Component } from 'react'
import './App.css'
import SnapScroll from './snapscroll'

const colors = ['red', 'green', 'yellow', 'blue']
const heights = ['100px', '200px', '1000px', '400px']
const getColor = (i) => colors[i % 4]
const getHeights = (i) => heights[i % 4]
const Block = ({color, index, height}) =>
  <div className='block-' style={{backgroundColor: color, height}}>Block: {index}</div>

// class Block extends Component {
//   render () {
//     return (
//       <div className='block' style={{backgroundColor: this.props.color}}>Block</div>
//     )
//   }
// }

class App extends Component {
  render () {
    const {blocks} = this.props
    return (
      <SnapScroll className='App'>
        {blocks.map((b, i) => <Block key={i} index={i} color={getColor(i)} height={getHeights(i)} />)}
      </SnapScroll>
    )
  }
}

export default App
