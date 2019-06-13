import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SelectBucket from './selectBucket'
import Help from './help'
import UploadPicture from './uploadPicture'
import UploadVideo from './uploadVideo'
import axios, { post } from 'axios';

export default class ToolBar extends Component {

  state = {
    showHelp: false,
    showUpload: false,
    showSelectBucket: localStorage.getItem('selectBucket') ? false : true,
    uploadurl: localStorage.getItem('uploadurl'),
    selectBucket: localStorage.getItem('selectBucket'),
    token: localStorage.getItem('token'),
    loading: false,
    showUploadVideo: false
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
    // let token = "p_Hevt947EGziYEtYlub2bkHu4hCVY0g_uZvmJ1b:RLCHEBiwYWvi7D97VYLyY7zEf7I=:eyJzY29wZSI6Im1iY24tc3RhdGljIiwicmV0dXJuQm9keSI6IntcImtleVwiOiAkKGtleSksIFwiaGFzaFwiOiAkKGV0YWcpLCBcImRvbWFpblwiOiBcImh0dHBzOi8vY2RuLm1vZGFvLmNjXCJ9IiwiZGVhZGxpbmUiOjE1NjA0NDU3NDQsInVwaG9zdHMiOlsiaHR0cDovL3VwLXoxLnFpbml1LmNvbSIsImh0dHA6Ly91cGxvYWQtejEucWluaXUuY29tIiwiLUggdXAtejEucWluaXUuY29tIGh0dHA6Ly8xMDYuMzguMjI3LjI4Il0sImdsb2JhbCI6ZmFsc2V9"
    // this.setState({
    //   token: token
    // })
    // localStorage.setItem('token', token)
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
      console.log(error)

      if (error.status == 403) {
        alert('请到 modao.cc 进行登录');
      }else {
        alert('获取上传 token 错误，请到 modao.cc 进行登录');
      }
    }
  }

  changeLoading = value => {
    this.setState({
      loading: value
    })
  }

  render() {
    const { showHelp, showUpload, showSelectBucket, selectBucket, uploadurl, token, loading, showUploadVideo } = this.state

    return (
      <div className='toolbar'>
        <button className='default' onClick={() => this.setState({showUpload: true})} >上传图片</button>
        <button className='default' onClick={() => this.setState({showUploadVideo: true})} >上传视频</button>
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

        {(showSelectBucket || showUpload || showUploadVideo) && (
          <div className='mask'>
            <div className='modal'>
              {showSelectBucket && <SelectBucket onChange={this.setUploadInfo}/>}
              {showUpload && <UploadPicture
                             selectBucket={selectBucket}
                             uploadurl={uploadurl}
                             token={token}
                             changeLoading={(value) => {this.changeLoading(value)}}
                             onClose={() => this.setState({showUpload: false})} />}
              {showUploadVideo && <UploadVideo
                             selectBucket={selectBucket}
                             uploadurl={uploadurl}
                             token={token}
                             changeLoading={(value) => {this.changeLoading(value)}}
                             onClose={() => this.setState({showUploadVideo: false})} />}
            </div>
          </div>
        )}

        {showHelp && (
          <div className='mask'>
            <div className='modal' style={{width: '800px', height: 'calc(100% - 200px)', overflow: 'auto'}}>
              {showHelp && <Help onClose={() => this.setState({showHelp: false})} />}
            </div>
          </div>
        )}

      </div>
    )
  }

}
