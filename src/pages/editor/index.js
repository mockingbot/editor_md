import React, { Component } from 'react'
import './index.scss'
import Preview from './preview'
import ToolBar from './toolbar'

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
// import 'codemirror/theme/darcula.css';

export default class MdEditor extends Component {

  state = {
    mdData: localStorage.getItem('lastcode')
  }

  componentDidMount() {
    setInterval(() => {
      localStorage.setItem('lastcode', this.state.mdData)
    }, 10000)
  }

  render() {
    return (
      <div className='editor'>
        <ToolBar />
        <div className='textarea'>
          <CodeMirror
            ref="editor"
            value={this.state.mdData}
            height="200px"
            options={
              {
                highlightFormatting: true,
                // theme: 'eclipse',
                mode: 'markdown',
                autoCloseTags: true,
                lineNumbers: true,
                tabSize: 2,
                lineWrapping: true,
                readOnly: false,
                onKeyEvent: true,
              }
            }
            onChange={code => {
              this.setState({ mdData: code})
            }}
          />
        </div>

        <div className='preview' >
          <Preview mdData={this.state.mdData} />
        </div>
      </div>
    )
  }
}



