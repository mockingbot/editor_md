import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Help extends Component {

  render() {

    return (
      <div className="help">
         <button className='danger close' onClick={()=>this.props.onClose()}>取消</button>
      </div>
    )
  }

}
