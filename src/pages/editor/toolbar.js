import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SelectBucket from './selectBucket'
import Help from './help'
import UploadPicture from './uploadPicture'
import axios, { post } from 'axios';

export default class ToolBar extends Component {

  state = {
    showHelp: false,
    showUpload: false,
    showSelectBucket: localStorage.getItem('selectBucket') ? false : true,
    uploadurl: localStorage.getItem('uploadurl'),
    selectBucket: localStorage.getItem('selectBucket'),
    token: localStorage.getItem('token'),
    loading: false
  }

  componentDidMount() {
    if (!this.state.showSelectBucket) {
      this.getToken()
    }
  }

  setUploadInfo = (uploadurl, selectBucket)=> {
    localStorage.setItem('uploadurl', uploadurl)
    localStorage.setItem('selectBucket', selectBucket)
    
    this.setState({
      uploadurl, 
      selectBucket,
      showSelectBucket: false,
    })

    setTimeout(() => {
      this.getToken()
    }, 1);
  }

  getToken = async () => {
    this.changeLoading(true)
    try {
      const res = await axios.get(`/api/v2/qiniu/uptoken?bucket=${this.state.selectBucket}`)
      if (res.data) {
        this.setState({
          token: res.data.token
        })
      }
      localStorage.setItem('token', res.data.token)
      this.changeLoading(false)
    } catch (error) {
      if (error.status == 403) {
        alert('请到 modao.cc 进行登录');
      }else {
        alert('获取上传 token 错误');
      }
    }
  } 

  changeLoading = value => {
    this.setState({
      loading: value
    })
  }

  render() {
    const { showHelp, showUpload, showSelectBucket, selectBucket, uploadurl, token, loading } = this.state

    return (
      <div className='toolbar'>
        <button className='default' onClick={() => this.setState({showUpload: true})} >上传图片</button>
        <button className={selectBucket === process.env.REACT_APP_EN_BUCKET ? 'danger' : 'default'} onClick={()=>this.setState({showSelectBucket: true})}>
          {selectBucket === process.env.REACT_APP_EN_BUCKET ? '国际站' : '国内站'}
        </button>
        <button className='default' onClick={() => this.setState({showHelp: true})} >帮助</button>

        {
          loading && (
            <div className='loading'>
              <div className='text'>loading...</div>
            </div>
          )
        }

        {(showHelp || showSelectBucket || showUpload) && (
          <div className='mask'>
            <div className='modal'>
              {showHelp && <Help onClose={() => this.setState({showHelp: false})} />}
              {showSelectBucket && <SelectBucket onChange={this.setUploadInfo}/>}
              {showUpload && <UploadPicture
                             selectBucket={selectBucket}
                             uploadurl={uploadurl}
                             token={token}
                             changeLoading={(value) => {this.changeLoading(value)}}
                             onClose={() => this.setState({showUpload: false})} />}
            </div>
          </div>
        )}

      </div>
    )
  }

}
