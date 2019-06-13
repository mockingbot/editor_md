import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Clipboard from 'react-clipboard.js';
import axios, { post } from 'axios';
import moment from 'moment';

export default class UploadPicture extends Component {

  state = {
    imageUrl: null,
  }

  guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*10|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(10);
    });
  }

  paste = e => {
    let items = (e.clipboardData && e.clipboardData.items) || [];
    let file = null;

    if (items && items.length) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
                file = items[i].getAsFile();
                break;
            }
        }
    }

    if (file) {
      this.upload({
        target: {
          files: [file]
        }
      })
    }
  }

  upload = async (e) => {
    const {selectBucket, uploadurl} = this.props

    const formData = new FormData();
    formData.append('file', e.target.files[0])
    formData.append('token', this.props.token)
    formData.append('key', `md/${moment(new Date()).format("YYYYMMDD")}/${this.guid().substr(0, 10)}_${e.target.files[0].name}`)

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    let res = null
    this.props.changeLoading(true);

    try {
      res = await post(uploadurl, formData, config)
    } catch (error) {
      alert('上传出错了');
      this.props.changeLoading(false);
    }

    if (res) {
      let img = new Image();
      img.src = `${res.data.domain}/${res.data.key}`;
      img.onload = () => {
        const alt = img.naturalWidth + '*' +  img.naturalHeight
        this.setState({
          imageUrl: `<center>\n\n![${alt}](${img.src})\n\n</center>`
        })
        this.props.changeLoading(false);
      }
    }


  }

  render() {
    const { imageUrl } = this.state

    return (
      <div className="uoload">
        <h3>ctrl + v 上传或点击上传</h3>
        <textarea placeholder="在此处 ctrl + v" rows="3" cols="80" onPaste={this.paste}></textarea><br/><br/>
        <input type='file' onChange={this.upload}></input>

        {imageUrl && (
          <div>
            <h4>图片地址为</h4>
            <h5 style={{wordBreak: 'break-all'}}>{imageUrl}</h5>
            <Clipboard data-clipboard-text={imageUrl} onClick={()=>this.props.onClose()}>
              点击复制
            </Clipboard>
          </div>
        )}
        <button className='danger close' onClick={()=>this.props.onClose()}>取消</button>
      </div>
    )
  }

}
