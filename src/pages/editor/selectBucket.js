import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class SelectBucket extends Component {

  render() {

    return (
      <div className="selectBucket">
        <button className='default' onClick={()=> {
          this.props.onChange(
            process.env.REACT_APP_CN_UPLOADURL, process.env.REACT_APP_CN_BUCKET
          )
         }}>国内站</button>
        <button className='danger' onClick={()=> {
          this.props.onChange(
            process.env.REACT_APP_EN_UPLOADURL, process.env.REACT_APP_EN_BUCKET
          )
         }}>国际站</button>
        {}
      </div>
    )
  }

}
