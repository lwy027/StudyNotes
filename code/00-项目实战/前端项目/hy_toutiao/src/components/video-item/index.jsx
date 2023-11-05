import React, { memo } from 'react'
import { getFormatCount } from '../../utils/format'

import { VideoItemWrapper } from './style'

const VideoItem = memo((props) => {
  const { itemInfo, index } = props

  return (
    <VideoItemWrapper href={itemInfo.display_url}>
      <div className='album'>
        <img src={itemInfo.middle_image.url} alt="" />
        <span className='rank'>{index + 1}</span>
      </div>
      <div className='info'>
        <div className='title'>{itemInfo.title}</div>
        <div className='like'>{getFormatCount(itemInfo.video_like_count)}点赞</div>
        <div className='desc'>
          <div className='playcount'>
            {getFormatCount(itemInfo.video_detail_info.video_watch_count)}次观看
          </div>
          <div className='username'>{itemInfo.user_info.name}</div>
        </div>
      </div>
    </VideoItemWrapper>
  )
})

export default VideoItem