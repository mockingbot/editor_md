import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Clipboard from 'react-clipboard.js';
import axios, { post } from 'axios';
import moment from 'moment';

export default class UploadVideo extends Component {

  state = {
    video: null,
    imageUrl: '视频封面图'
  }

  guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*10|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(10);
    });
  }

  uploadImg = async (e) => {
    const res = await this.upload(e)

    if (res) {
      let src = `${res.data.domain}/${res.data.key}`;
      this.setState({
        imageUrl: src
      })
      this.props.changeLoading(false);
    }
  }

  uploadVideo = async (e) => {
    const res = await this.upload(e)

    if (res) {
      let src = `${res.data.domain}/${res.data.key}`;
      this.setState({
        video: src
      })
      this.props.changeLoading(false);
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

    return res
  }

  render() {
    const { video, imageUrl } = this.state
    const vedioInfo = `<video controls preload="none" poster="${imageUrl}" style="width: 100%">\n<source src="${video}" type="video/mp4">\n</video>`

    return (
      <div className="uoload">
        <h3>上传视频</h3>
        <h5>视频封面图</h5>
        <input type='file' accept='image/*' onChange={this.uploadImg}/>
        <h5>视频</h5>
        <input type='file' accept='video/mp4' onChange={this.uploadVideo}/>

        {imageUrl && video && (
          <div>
            <h4>视频为</h4>
            <h5 style={{wordBreak: 'break-all'}}>{vedioInfo}</h5>
            <Clipboard data-clipboard-text={vedioInfo} onClick={()=>this.props.onClose()}>
              点击复制
            </Clipboard>
          </div>
        )}
        <button className='danger close' onClick={()=>this.props.onClose()}>取消</button>
      </div>
    )
  }

}
