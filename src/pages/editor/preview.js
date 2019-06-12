import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

export default class Preview extends Component {
  static propTypes = {
    mdData: PropTypes.string
  }

  setElementRef = ref => (this.$elem = ref)

  imgRenderer = props => {
    const reg = /(\d*)\*\d*/gi

    return (
      <a href={props.src} rel='noopener noreferrer' target='_blank'>
        {props.alt && reg.test(props.alt) ? (
          <img
            src={props.src}
            alt={props.alt}
            style={{ maxWidth: props.alt.split('*')[0] / 2 }}
          />
        ) : (
          <img src={props.src} alt={props.alt} />
        )}
      </a>
    )
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.mdData === this.props.mdData) {
      return false
    }

    return true
  }

  render() {
    const { mdData } = this.props

    return (
      <ReactMarkdown
        source={mdData}
        escapeHtml={false}
        renderers={{ image: this.imgRenderer }}
        className='mb-postContent'
      />
    )
  }
}
