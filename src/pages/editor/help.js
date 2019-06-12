import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Help extends Component {

  render() {

    return (
      <div className="help">
        <table className='table' cellSpacing="0">
          <tbody>
            <tr><td>关键词</td><td>[keywords]: 关键词1,关键词2,关键词3#<br/>英文逗号，以#结尾</td></tr>
            <tr><td>h1 - h6</td><td>1-6 个#  示例： #  ##</td></tr>
            <tr><td>加粗</td><td>**内容**</td></tr>
            <tr><td>斜体</td><td>*内容*</td></tr>
            <tr><td>换行</td><td>&lt;br/&gt;</td></tr>
            <tr><td>斜体加粗</td><td>***内容***</td></tr>
            <tr><td>删除线</td><td>~~内容~~</td></tr>
            <tr><td>引用</td><td>>内容</td></tr>
            <tr><td>分割线</td><td>----</td></tr>
            <tr><td>图片</td><td>![](url), 请使用上传图片功能</td></tr>
            <tr>
              <td>图片居中</td>
              <td>
                 &lt;center&gt; <br/>
                  ![](url), 上传图片功能获取的地址 <br/>
                  &lt;/center&gt; <br/>
              </td>
            </tr>
            <tr>
              <td>视频</td>
              <td>
                <pre>
                  &lt;video controls preload="none" poster="视频封面图 URL" width="100%"&gt; <br/>
                  &lt;source src=" 视频地址 url" type="video/mp4"&gt; <br/>
                  &lt;/video&gt; <br/>
                </pre>
              </td>
            </tr>
            <tr><td>超链接</td><td>[百度](http://baidu.com)</td></tr>
            <tr><td>无序列表</td><td>- 列目 1 <br/> - 列目 2 </td></tr>
            <tr><td>有序列表</td><td> 1. 列目 1 <br/> 2. 列目 2 </td></tr>
            <tr><td>表格</td><td> 表头|表头|表头 <br/>---|:--:|---:<br/>内容|内容|内容<br/>内容|内容|内容 </td></tr>
          </tbody>
        </table>
         <button className='danger close' onClick={()=>this.props.onClose()}>取消</button>
      </div>
    )
  }

}
