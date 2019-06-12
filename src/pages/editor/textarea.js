import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Textarea extends Component {
  render() {

    return (
      <textarea onChange={this.props.onChange} rows='8000'>123</textarea>
    )
  }

}
